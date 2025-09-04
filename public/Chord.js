//     // base chords?
// const major = [0, 4 ,7]; // 1-3-5
// const minor = [0, 3, 7]; // 1-♭3-5
// const diminished = [0, 3, 6]; // 1-♭3-♭5
// const sus2 =   [0, 2, 7]; // 1-2-5
// const sus4 =   [0, 2, 5]; // 1-4-5
// const sus2sus4 =   [0, 2, 5, 7]; // 1-2-4-5

// // modifiers
// const add6 = [0, 4, 7, 9] // 1-3-5-6 (aka X6)
// const add9 = [0, 4, 7, 14]  // 1-3-5-9
// const add11 = [0, 4, 7, 17] // 1-3-5-11
// const add13 = [0, 4, 7, 21] // 1-3-5-13

// const madd6 = [0, 3, 7, 9] // 1-3-5-6 (aka X6)
// const madd9 = [0, 3, 7, 14]  // 1-3-5-9
// const madd11 = [0, 3, 7, 17] // 1-3-5-11
// const madd13 = [0, 3, 7, 21] // 1-3-5-13

// // dominant family
// const X7 = [0, 4, 7, 10] // 1-3-5-♭7
// const X9 = [0, 4, 7, 10, 14] // 1-3-5-♭7
// const X11 = [0, 4, 7, 10, 14, 17] // 1-3-5-♭7
// const X13 = [0, 4, 7, 10, 14, 17, 21] // 1-3-5-♭7

// // majX
// const maj7 = [0, 4, 7, 11] // 1-3-5-7 aka  C△ aka C dominant 7
// const maj9 = [0, 4, 7, 11, 14] // 1-3-5-b7-9
// const maj11 = [0, 4, 7, 11, 14, 17] // 1-3-5-b7-9-11
// const maj13 = [0, 4, 7, 11, 14, 17, 21] // 1-3-5-b7-9-11-13

// // mX
// const m7 = [0, 3, 7, 10] // 1-♭3-5-♭7
// const m9 = [0, 3, 7, 10, 14] // 1-♭3-5-♭7-9
// const m11 = [0, 3, 7, 10, 14, 17] // 1-♭3-5-♭7-9-11
// const m13 = [0, 3, 7, 10, 14, 17, 21] // 1-♭3-5-♭7-9-13

// // minor major 7
// const minormajor7 = [0, 3, 7, 11] // 1-♭3-5-7
    

// const notes = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'];

    
export class Chord {

    // notes should be an array of 2+ strings ('C','E','G')
    // name is the actual name of the chord (F#m, C7, Bm9, ...)
    // halfSteps is an array of integers (major = 1-3-5 = [0,4,7] )

    constructor(notes, name, halfSteps,enumeratedEncodedNotes) {
        this.notes = notes;
        this.name = name;
        this.halfSteps = halfSteps;
        this.enumeratedEncodedNotes = enumeratedEncodedNotes;

        // take the first 1-2 chars of name
        // find the first instance of it appearing in notes
        // add hlafsteps to it
        // enumerate it,
        // enocde it,
        // thats it?

        
    }

    addNotes(note) {
        this.notes.push(note)
    }
    // subtractNotes(){

    // }

    // enumerate(){

    // }
    // encode(){

    // }

    getEnumeratedEncodedNotes(){
        return this.enumeratedEncodedNotes       
    }

}

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