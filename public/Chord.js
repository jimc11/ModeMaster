import {commonFormulas} from './CommonFormulas.js'


export class Chord {

    // formula is an array of integers (major = 1-3-5 = [0,4,7] )
    // rootnote is just the first non-numbered, non-encoded note that is lowercase only
    // startingOctave is just 3, 4, or 5 AS A STRING
    constructor(formula, rootNote, startingOctave) {

        this.formula = formula;
        this.rootNote = rootNote;
        this.startingOctave = startingOctave;

        this.numberedEncodedNotes = computeNumberedEncodedNotes(formula, rootNote, startingOctave)

        this.arrayOfAudioObjects = []
        //this.arrayOfAudioObjects = ['sounds/'+rootNote.replace("#", "%23") + startingOctave +'.wav'] //we will then push more audio objects here //        this.arrayOfAudioObjects = [new Audio('sounds/'+rootNote.replace("#", "%23") + startingOctave +'.wav')] //we will then push more audio objects here
        this.arrayOfAudioObjects = this.setArrayOfAudioObjects()
    
    }

    // how are we gonna do inversions?  negative index? -> problem if people want to do Cmaj/E on octave 3...
    addNotes(note) {
        console.log('--addNotes--')
        this.formula.push(note)
        //console.log('this.formula: ' + this.formula)
        this.numberedEncodedNotes = computeNumberedEncodedNotes(this.formula, this.rootNote, this.startingOctave)
        this.setArrayOfAudioObjects()
    }
    subtractNotes(note){
        console.log('--subtractNotes--')

        this.formula.pop(note)
        this.numberedEncodedNotes = computeNumberedEncodedNotes(this.formula, this.rootNote, this.startingOctave)
        this.setArrayOfAudioObjects()
    }

    modifyNotes(notes){
        console.log('--modifyNotes--')

        for (let i = 0; i < this.formula.length; i++)
            this.formula[i] += (notes[i])

        //console.log('this.formula: ' + this.formula)

        this.numberedEncodedNotes = computeNumberedEncodedNotes(this.formula, this.rootNote, this.startingOctave)
        this.setArrayOfAudioObjects()
    }

    getFormula(){
        return this.formula.getHalfSteps()
    }

    setArrayOfAudioObjects(){
        console.log('--setArrayOfAudioObjects--')
        this.arrayOfAudioObjects = []
        // console.log('arrayOfAudioObjects: ' + this.arrayOfAudioObjects)
        // console.log('this.numberedEncodedNotes: ' + this.numberedEncodedNotes)
        let tempString = ''
        for(let i = 0; i < this.numberedEncodedNotes.length; i++){
            tempString = String('sounds/'+this.numberedEncodedNotes[i]+'.wav')
            //console.log('tempString: ' + tempString)
            this.arrayOfAudioObjects.push(tempString) //            this.arrayOfAudioObjects.push(new Audio('sounds/'+numberedEncodedNote+'.wav'))
        }
        return this.arrayOfAudioObjects
    }

    // finished product that populates eventlistener
    getArrayOfAudioObjects(){
        return this.arrayOfAudioObjects       
    }

}


function computeNumberedEncodedNotes(formula, rootNote, startingOctave){
    console.log('--computeNumberedEncodedNotes--')

    let rootNoteIndex = (commonFormulas['allNumberedEncodedNotes'].indexOf((rootNote.replace("#", "%23")+startingOctave).toString()))
    //console.log('rootNoteIndex: ' + rootNoteIndex) 

    let numberedNotes = enumerate(formula, rootNoteIndex)
    //console.log('numberedNotes2: ' + numberedNotes) 

    let numberedEncodedNotes = encode(numberedNotes)

    return numberedEncodedNotes;
}

function enumerate(formula, rootNoteIndex){
    console.log('--enumerate--')
    let numberedNotes = []
    // console.log('rootNoteIndex2 : ' + rootNoteIndex) // 

    // console.log('commonFormulas[\'allNumberedEncodedNotes\'][rootNoteIndex+formula[i]]: ')
    // console.log( commonFormulas['allNumberedEncodedNotes'][Number(rootNoteIndex)]) // huh?

    for (let i=0; i<formula.length; i++){
        numberedNotes.push(commonFormulas['allNumberedEncodedNotes'][rootNoteIndex+formula[i]]) 
        // console.log('rootNoteIndex: ' + rootNoteIndex) 
        // console.log('formula[i]: ' + formula[i]) 
        // console.log('numberedNotes[i]: ' + numberedNotes[i]) 
    }
        
    //console.log('numberedNotes1: ' + numberedNotes) 
    return numberedNotes;
}

function encode(numberedNotes){
    console.log('--encode--')
    //console.log('numberedNotes3: ' + numberedNotes) 

    for (let i = 0 ; i<numberedNotes.length; i++){
        numberedNotes[i]
        if (numberedNotes[i].includes('#')){
            numberedNotes[i].replace("#", "%23")
        }
    }
    return numberedNotes
}

function main(){

    console.log('-----Test0-----')

    let formula = [0,4,7]
    let rootNote= 'c#'
    let startingOctave= '4' 
    let myChord = new Chord(formula, rootNote, startingOctave )
    
    console.log('-----Test1-----')

    myChord.addNotes(11)

    console.log('numberedEncodedNotes: ' + myChord.numberedEncodedNotes)
    console.log('arrayOfAudioObjects: ' + myChord.getArrayOfAudioObjects())

    console.log('-----Test2-----')

    myChord.subtractNotes(11)
    myChord.subtractNotes(4)

    console.log('numberedEncodedNotes: ' + myChord.numberedEncodedNotes)
    console.log('arrayOfAudioObjects: ' + myChord.getArrayOfAudioObjects())

    console.log('-----Test3-----')
    
    myChord.modifyNotes([1,-1])

    console.log('numberedEncodedNotes: ' + myChord.numberedEncodedNotes)
    console.log('arrayOfAudioObjects: ' + myChord.getArrayOfAudioObjects())

    console.log('-----Test4-----')

    myChord.modifyNotes([2,-3,])

    console.log('numberedEncodedNotes: ' + myChord.numberedEncodedNotes)
    console.log('arrayOfAudioObjects: ' + myChord.getArrayOfAudioObjects())


    console.log('-----Test5-----')
    
    myChord.modifyNotes([2,-3,1]) // this should crash unless I implement something for it.

    console.log('numberedEncodedNotes: ' + myChord.numberedEncodedNotes)
    console.log('arrayOfAudioObjects: ' + myChord.getArrayOfAudioObjects())
}
//main()

// TODO: 
// 1. do we need extended structures past octave 5?  EG we don't need to worry about chords with root note >5 right?  that just wont happen...?
// 2. how are we gonna do inversions?  do we need to download more sounds for the under octave 3 range?