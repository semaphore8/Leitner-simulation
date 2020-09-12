import settings from './settings.js'

class Leitner {
    constructor() {
        this.newCardsCount = settings.cardsCount;
        this.firstDeckCardsCount = 0;
        this.secondDeckCardsCount = 0;
        this.thirdDeckCardsCount = 0;
        this.learnedCardsCount = 0;
        this.currentDay = 0;
    }

    renderCurrentDay() {
        let results = document.createElement('div');
        wrapper.innerHTML = `<b>${this.currentDay} day:</b> ${this.newCardsCount} -> ${this.firstDeckCardsCount} -> ${this.secondDeckCardsCount} -> ${this.thirdDeckCardsCount} -> ${this.learnedCardsCount}`;
        document.body.append(results);
    }

    simulateCurrentDay() {
        let newCardsCountResult;
        let firstDeckCardsCountResult;
        let secondDeckCardsCountResult;
        let thirdDeckCardsCountResult;
        let learnedCardsCountResult;

        let cardsFromEachDeck = Math.round(settings.cardsADay / 4);
        
        let tdCardsToReview;
        let sdCardsToReview;
        let fdCardsToReview;
        let newCardsToReview;

        if (currentDay % settings.thirdDeckReviewInterval === 0) {
            tdCardsToReview = this.thirdDeckCardsCount < cardsFromEachDeck ? this.thirdDeckCardsCount : cardsFromEachDeck;
        } else {
            tdCardsToReview = 0;
        }

        if (currentDay % settings.secondDeckReviewInterval === 0) {
            sdCardsToReview = this.secondDeckCardsCount < cardsFromEachDeck ? this.secondDeckCardsCount : cardsFromEachDeck;
        } else {
            scCardsToReview = 0;
        }  
        if (currentDay % settings.firstDeckReviewInterval === 0) {
            fdCardsToReview = this.firstDeckCardsCount < cardsFromEachDeck ? this.firstDeckCardsCount : cardsFromEachDeck;  
        } else {
            fdCardsToReview = 0;
        }

        newCardsToReview = settings.cardsADay - fdCardsToReview - sdCardsToReview - tdCardsToReview;
        
        newCardsCountResult = this.newCardsCount - Math.round(newCardsToReview * (1 - settings.errorsRate)) + 

        function getSuccededCount(cardsCount) {
            return Math.round(cardsCount * (1 - settings.errorsRate))
        }
    }

    carryCardsToReviewToday() {
        if (this.thirdDeckCardsCount !== 0) 
    }
}

class Group {
    constructor(name, cardsCount) {
        this.name = name;
        this.cardsCount = cardsCount;
    }

    get name() {
        return this.name;
    }

    get cardsCount() {
        return this.cardsCount;
    }

    set cardsCount(value) {
        this.cardsCount = value;
    }
}

class ReviewableGroup extends Group {
    constructor(name, cardsCount) {
        super(name, cardsCount);

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