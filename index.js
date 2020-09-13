import settings from './settings.js'

class Leitner {
    constructor(settings, newGroup, firstGroup, secondGroup, thirdGroup, learnedGroup) {
        this.newGroup = newGroup;
        this.firstGroup = firstGroup;
        this.secondGroup = secondGroup;
        this.thirdGroup = thirdGroup;
        this.learnedGroup = learnedGroup;
        this.settings = settings;        
        this.currentDay = 0;
        this.cardsFromEachGroup = Math.floor(settings.cardsADay / 4);
    }

    render() {
        let results = document.createElement('div');
        results.innerHTML = `<b>${this.currentDay} day:</b> ${this.newGroup.cardsCount} -> ${this.firstGroup.cardsCount} -> ${this.secondGroup.cardsCount} -> ${this.thirdGroup.cardsCount} -> ${this.learnedGroup.cardsCount}`;
        document.body.append(results);
    }

    simulate() {
        while (this.learnedGroup.cardsCount !== this.settings.cardsCount) {
            console.log(this.learnedGroup.cardsCount, this.settings.cardsCount);
            debugger;
            this.simulateOneDay();
            this.render();
        }
    }

    simulateOneDay() {
        // defining updates object - calculating passed/failed cards count:
        let updates = {
            [this.newGroup.name]: {},
            [this.firstGroup.name]: {},
            [this.secondGroup.name]: {},
            [this.thirdGroup.name]: {},
            [this.learnedGroup.name]: {},
        };

        function defineUpdates(group) {
            if (this.currentDay % group.reviewInterval === 0) {
                updates[group.name].count = group.cardsCount < this.cardsFromEachGroup ? group.cardsCount : this.cardsFromEachGroup;
                updates[group.name].passed = Math.floor(updates[group.name].count * (1 - this.settings.errorsRate));
                updates[group.name].failed = updates[group.name].count - updates[group.name].passed;
            } else {
                updates[group.name].count = 0;
                updates[group.name].passed = 0;
                updates[group.name].failed = 0;
            }
        }

        defineUpdates.call(this, this.thirdGroup);
        defineUpdates.call(this, this.secondGroup);
        defineUpdates.call(this, this.firstGroup);
        updates[this.newGroup.name].count = this.settings.cardsADay - updates[this.thirdGroup.name].count - updates[this.secondGroup.name].count - updates[this.firstGroup.name].count;

        updates[this.newGroup.name].passed = Math.floor(updates[this.newGroup.name].count * (1 - this.settings.errorsRate));

        updates[this.newGroup.name].failed = updates[this.newGroup.name].count - updates[this.newGroup.name].passed;

        // applying updates:
        //  new cards:
        this.newGroup.cardsCount -= updates[this.newGroup.name].passed;
        this.firstGroup.cardsCount += updates[this.newGroup.name].passed;
        //  first group cards:
        this.firstGroup.cardsCount -= updates[this.firstGroup.name].passed;
        this.secondGroup.cardsCount += updates[this.firstGroup.name].passed;
        this.firstGroup.cardsCount -= updates[this.firstGroup.name].failed;
        this.newGroup.cardsCount += updates[this.firstGroup.name].failed;
        //  second group cards:
        this.secondGroup.cardsCount -= updates[this.secondGroup.name].passed;
        this.thirdGroup.cardsCount += updates[this.secondGroup.name].passed;
        this.secondGroup.cardsCount -= updates[this.secondGroup.name].failed;
        this.firstGroup.cardsCount += updates[this.secondGroup.name].failed;
        //  third group cards:
        this.thirdGroup.cardsCount -= updates[this.thirdGroup.name].passed;
        this.learnedGroup.cardsCount += updates[this.thirdGroup.name].passed;
        this.thirdGroup.cardsCount -= updates[this.thirdGroup.name].failed;
        this.secondGroup.cardsCount += updates[this.thirdGroup.name].failed;

        this.currentDay++;

    }

}

class Group {
    constructor(name, cardsCount) {
        this.name = name;
        this.cardsCount = cardsCount;
    }
}

class ReviewableGroup extends Group {
    constructor(name, cardsCount, reviewInterval) {
        super(name, cardsCount);
        this.reviewInterval = reviewInterval;
    }
}

function renderSettings() {
    let simulation = document.createElement('div');
    let settingsDiv = document.createElement('div');
    
    for (let [key, value] of Object.entries(settings)) {
        settingsDiv.innerHTML += `${key}: <b>${value}</b>; `;
    }
    simulation.append(settingsDiv);
    document.body.append(simulation);
}

renderSettings();

let ng = new ReviewableGroup('new', settings.cardsCount, 1);
let fg = new ReviewableGroup('first', 0, settings.firstDeckReviewInterval);
let sg = new ReviewableGroup('second', 0, settings.secondDeckReviewInterval);
let tg = new ReviewableGroup('third', 0, settings.thirdDeckReviewInterval);
let lg = new Group('learned', 0);

let leitner = new Leitner(settings, ng, fg, sg, tg, lg);

leitner.simulate();