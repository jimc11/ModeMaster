export class Formula {

    constructor(halfSteps) { //this.halfsteps is an array like [0,4,7] that shows how many half steps each note in a chord is away from the root note
        this.halfSteps = halfSteps;

    }

    // adds a note to the chord
    addNotes(note) { // note must be a single number.  
        this.halfSteps.push(note)
    }

    // subtracts a note from the chord
    subtractNotes(note) { 
        this.halfSteps.pop(note)
    }
    modifyNotes(sharpsOrFlats) { //sharpsOrFlats is an array of positive or negative numbers that we add to the this.halfsteps
        this.halfSteps += sharpsOrFlats
    }

    getHalfSteps(){
        return halfSteps
    }

}