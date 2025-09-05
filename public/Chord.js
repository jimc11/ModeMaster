// let sounds = {
//         '1': [new Audio('sounds/'+enumeratedEncodedChords[0][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[0][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[0][2]+'.wav'),],
//         '2': [new Audio('sounds/'+enumeratedEncodedChords[1][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[1][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[1][2]+'.wav'),],
//         '3': [new Audio('sounds/'+enumeratedEncodedChords[2][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[2][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[2][2]+'.wav'),],
//         '4': [new Audio('sounds/'+enumeratedEncodedChords[3][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[3][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[3][2]+'.wav'),],
//         '5': [new Audio('sounds/'+enumeratedEncodedChords[4][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[4][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[4][2]+'.wav'),],
//         '6': [new Audio('sounds/'+enumeratedEncodedChords[5][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[5][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[5][2]+'.wav'),],
//         '7': [new Audio('sounds/'+enumeratedEncodedChords[6][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[6][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[6][2]+'.wav'),],
        
//         'q': [new Audio('sounds/'+enumeratedEncodedChords[7][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[7][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[7][2]+'.wav'),],
//         'w': [new Audio('sounds/'+enumeratedEncodedChords[8][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[8][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[8][2]+'.wav'),],
//         'e': [new Audio('sounds/'+enumeratedEncodedChords[9][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[9][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[9][2]+'.wav'),],
//         'r': [new Audio('sounds/'+enumeratedEncodedChords[10][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[10][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[10][2]+'.wav'),],
//         't': [new Audio('sounds/'+enumeratedEncodedChords[11][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[11][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[11][2]+'.wav'),],
//         'y': [new Audio('sounds/'+enumeratedEncodedChords[12][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[12][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[12][2]+'.wav'),],
//         'u': [new Audio('sounds/'+enumeratedEncodedChords[13][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[13][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[13][2]+'.wav'),],
        
//         'a': [new Audio('sounds/'+enumeratedEncodedChords[14][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[14][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[14][2]+'.wav'),],
//         's': [new Audio('sounds/'+enumeratedEncodedChords[15][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[15][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[15][2]+'.wav'),],
//         'd': [new Audio('sounds/'+enumeratedEncodedChords[16][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[16][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[16][2]+'.wav'),],
//         'f': [new Audio('sounds/'+enumeratedEncodedChords[17][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[17][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[17][2]+'.wav'),],
//         'g': [new Audio('sounds/'+enumeratedEncodedChords[18][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[18][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[18][2]+'.wav'),],
//         'h': [new Audio('sounds/'+enumeratedEncodedChords[19][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[19][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[19][2]+'.wav'),],
//         'j': [new Audio('sounds/'+enumeratedEncodedChords[20][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[20][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[20][2]+'.wav'),],
//     };

const enumeratedEncodedNotes = [ 'c3','c%233','d3','d%233','e3','f3','f%233','g3','g%233','a3','a%233','b3', 'c4','c%234','d4','d%234','e4','f4','f%234','g4','g%234','a4','a%234','b4', 'c5','c%235','d5','d%235','e5','f5','f%235','g5','g%235','a5','a%235','b5', ];

import { Formula } from './Formula.js';
import { SoundFiles } from './SoundFiles.js';


export class Chord {

    // notes should be an array of 2+ strings ('C','E','G')
    // name is the actual name of the chord (F#m, C7, Bm9, ...)
    // halfSteps is an array of integers (major = 1-3-5 = [0,4,7] )

    constructor(chordName, formula, rootNote, startingOctave, enumeratedEncodedNotes) {

        this.rootNote = rootNote;
        this.startingOctave = startingOctave;
        this.chordName = chordName;
        this.formula = new Formula(formula);
        this.enumeratedEncodedNotes = enumeratedEncodedNotes;


        this.SoundFiles = new SoundFiles(); // how the hell is this gonna work?

        //alternate
        this.arrayOfAudioObjects = []

        function computeAudioObjects(){
            this.arrayOfAudioObjects.push(new Audio('sounds/'+enumeratedEncoded ??? [?]+'.wav'))
        }

        // how to compute the sound files for this chord?

        // take the first 1-2 chars of name
        // find the first instance of it appearing in notes
        // add hlafsteps to it
        // enumerate it,
        // enocde it,
        // thats it?   
    }

    addNotes(note) {
        this.formula.addNotes(note)
    }
    subtractNotes(note){
        this.formula.subtractNotes(note)
    }

    modifyNotes(notes){
        this.formula.modifyNotes(notes)
    }

    getFormula(){
        return this.formula.getHalfSteps()
    }

    // enumerate(){

    // }
    // encode(){

    // }

    getEnumeratedEncodedNotes(){
        return this.enumeratedEncodedNotes       
    }

}

