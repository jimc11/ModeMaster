import { Chord } from './Chord.js';
//import { Formula } from './Formula.js';
//import { SoundFiles } from './SoundFiles.js';

//window.generate = generate

// number of half steps away each diatonic note is from the root node of each mode

document.getElementById("generateButton").addEventListener("click", generate);


function getModeSteps(){
    const modeSteps = [
        [0, 2, 4, 5, 7, 9, 11],  // Ionian 0
        [0, 2, 3, 5, 7, 9, 10],  // Dorian 1
        [0, 1, 3, 5, 7, 8, 10],  // Phrygian 2 
        [0, 2, 4, 6, 7, 9, 11],  // Lydian 3
        [0, 2, 4, 5, 7, 9, 10],  // Mixolydian 4
        [0, 2, 3, 5, 7, 8, 10],  // Aeolian 5
        [0, 1, 3, 5, 6, 8, 10]   // Locrian 6
    ];

    return modeSteps;
}

function getMajorFormula(){
    const major = [0, 4 ,7]; // 1-3-5
    return major    
}
function getMinorFormula(){
const minor = [0, 3, 7]; // 1-♭3-5
    return minor    
}
function getDiminishedFormula(){
const diminished = [0, 3, 6]; // 1-♭3-♭5
    return diminished    
}

let sounds = {}


// ----- MAIN FUNCTION -----
function generate() {
    console.log("------generate()------")

    // user input for the mode (returns a nubmer 1-7)
    let mode = document.getElementById('modeSelect').value;

    // user input for the root note (a, a#, b, c ...)
    let key = document.getElementById('keyInput').value;

    let wordMode = ''
    switch (mode) {
        case '1':
            wordMode = 'Ionian'
            break
        case '2':
            wordMode = 'Dorian'
            break;
        case '3':
            wordMode = 'Phrygian'
            break;
        case '4':
            wordMode = 'Lydian'
            break;
        case '5':
            wordMode = 'Mixolydian'
            break;
        case '6':
            wordMode = 'Aeolian'
            break;
        case '7':
            wordMode = 'Locrian'
            break;
        default:
            break;
    }

    let message = `<br> You selected: ${key.toUpperCase()} ${wordMode} 🎵 <br>`;
    messageArea.innerHTML = message;
    
    let modeNotes = generateDiatonicNotes(mode, keyInput.value);
    let modeChords = generateDiatonicChords(modeNotes);

    notesArea.innerHTML = "<br> The diatonic notes are: " + modeNotes.map(note => `<span style="margin-right: 10px">${note.toUpperCase()}</span>`).join('');    
    //chordArea.innerHTML = `<br> The diatonic chords are:  ${renderChordsTable(modeChords)}`;

    parallelArea.innerHTML = `<br> The diatonic chords of the parallel modes are: ${renderParalellModes(key)}`;
   
    onModeChange(modeChords)
    renderSounds(mode, modeChords)
}

// takes the 'notes' array and splits it.  now, the first element of the array is 
// splitValue and the rest of the array is the chromatic scale.
function splitListAtValue(inputList, splitValue) {
    let result = [];
    let currentSublist = [];

    for (let item of inputList) {
        if (item === splitValue) {
            if (currentSublist.length > 0) {
                result.push([...currentSublist]);
            }
            currentSublist = [];
        } else {
            currentSublist.push(item);
        }
    }

    if (currentSublist.length > 0) {
        result.push([...currentSublist]);
    }
    return result;
}

function splitListAtValue2(arr, value) {
  const index = arr.indexOf(value);

  // If value not found, just return the original array unchanged
  if (index === -1) {
    return arr.slice();
  }

  // Split into two parts
  const firstPart = arr.slice(0, index);
  const secondPart = arr.slice(index);

  // Append first part to the end of the second
  return secondPart.concat(firstPart);
}


// returns the diatonic notes of the mode that the user selected
function generateDiatonicNotes(modeNumber, tonic) {

    // the chromatic scale
    const notes = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'];
    
    let recenteredNotes = [tonic];

    let split = splitListAtValue(notes, tonic);
    if (split.length > 1) {
        recenteredNotes.push(...split[1]);
    }
    if (split.length > 0) {
        recenteredNotes.push(...split[0]);
    }

    let ms = getModeSteps()
    let stepPattern = ms[modeNumber - 1];
    let modeReturned = [];


    for (let i = 0; i < 7; i++) {

        modeReturned.push(recenteredNotes[stepPattern[i]]); 
    }
    return modeReturned;
}



// returns the diatonic chords of the mode that the user selected
// the return type is a 7x3 array, with each of the 7 arrays being an 
// array of 3 chars (the chars are the triads)
function generateDiatonicChords(inputMode) {
   
    let chords = [];

    for (let i = 0; i < 7; i++) {
        let chord = [];
        for (let j = 0; j < 3; j++) {
            chord.push(inputMode[(i + j * 2) % 7]);
        }
        chords.push(chord);
    }

    return chords;
}

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false; // Arrays of different lengths cannot be equal
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false; // Elements at the same index are different
    }
  }
  return true; // All elements match
}


function chordIdentifier(chordToBeDetermined) {

    let notess = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'];

    // splitListAtValue doesn't appear to be working here.  is it actually working at other places?
    let notesRecentered = splitListAtValue2(notess, chordToBeDetermined[0])

    let indexroot = notesRecentered.indexOf(chordToBeDetermined[0]); // should always be zero
    let indexMiddle = notesRecentered.indexOf(chordToBeDetermined[1]); 
    let indexLast = notesRecentered.indexOf(chordToBeDetermined[2]); 

    let halfsteps = [indexroot, indexMiddle, indexLast]


    let IsMinor = areArraysEqual(halfsteps, getMinorFormula() )
    let IsMajor = areArraysEqual(halfsteps, getMajorFormula() )
    let IsDiminished = areArraysEqual(halfsteps, getDiminishedFormula() )

    let returnMe

    if (IsMinor){
        returnMe = 'minor';
    } else if (IsMajor) {
        returnMe = 'major';
    } else if (IsDiminished) {
        returnMe = 'diminished';
    }

    return returnMe
}

function renderParalellModes(userTonic){

    // 7 modes, 7 chords, 3 notes
    let parallelModes = computeParalelModes(userTonic) // computeParalelModes() should return an 7x7x3 array

    return renderMultiChordsTable(parallelModes)
}

function renderMultiChordsTable(chordsOfAllModes){
    // TODO: This
    let tableHtml = '<table border="1" cellspacing="0" cellpadding="5">';

    // First row: 'Mode' and numbers 1–7
    tableHtml += "<tr>";
    tableHtml += '<th>Mode</th>'; 
    for (let i = 1; i <= 7; i++) {
        tableHtml += `<th>${i}</th>`;
    }
    tableHtml += "</tr>";

    const modeToNum = ['Ionian (Major)','Dorian','Phrygian','Lydian', 'Mixolydian','Aeolian (Minor)','Locrian']
    

    let currentMode= 'Ionian'
    for (let row = 0; row < 7; row++) {
        
        tableHtml += "<tr"

        if (document.getElementById('modeSelect').value -1 == row ){
            tableHtml += " style=\"background-color: #ffeaa6;\""
        } else {
            tableHtml += " style=\"background-color: white;\""
        }

        tableHtml += ">";
        tableHtml += `<th>${modeToNum[row]}</th>`; // TODO: this should be the mode of the 
        for (let col = 0; col < 7; col++) {
            tableHtml += `<th> ${chordsOfAllModes[row][col][0].toUpperCase()} ${chordIdentifier(chordsOfAllModes[row][col])}</th>`
        }
        tableHtml += "</tr>";
    }

  tableHtml += "</table>";
  return tableHtml;
}

function computeParalelModes(userTonic){
    
    // we want to generate all modes of userTonic
    //userMode is just a number

    let allModeNotes = []
    for (let i=0; i<7;i++){
        allModeNotes[i] = generateDiatonicNotes(i+1, userTonic); // returns 7x7 array
    }
    
    let modeChords = []

    for (let i=0; i<7;i++){
        modeChords[i] = generateDiatonicChords(allModeNotes[i]); 
    } 

    return modeChords// must be 7x7x3 array
}

function renderChordsTable(modeChords) {
    let tableHtml = '<table border="1" cellspacing="0" cellpadding="5">';

    // First row: 'Mode' and numbers 1–7
    tableHtml += "<tr>";
    tableHtml += '<th>Position</th>'; 
    for (let i = 1; i <= 7; i++) {
        tableHtml += `<th>${i}</th>`;
    }
    tableHtml += "</tr>";
    
    tableHtml += '<th>Chord</th>'; 
    for (let col = 0; col < 7; col++) {
        tableHtml += `<th> ${modeChords[col][0].toUpperCase()} ${chordIdentifier(modeChords[col])}</th>`
    }
    // Next rows: chords (7 total, 3 notes per column)
    tableHtml += "<tr>";
    tableHtml += '<th>Notes in that chord</th>'; 
    for (let col = 0; col < 7; col++) {
      tableHtml += `<td>${modeChords[col]}</td>`;
    }


  tableHtml += "</table>";
  return tableHtml;
}

// Example usage:
//document.getElementById("chordsArea").innerHTML = renderChordsTable(modeChords);
function renderSounds (mode, newChords){
    console.log('----renderSounds()----')

    const chordEls = document.querySelectorAll('#keyboard .chord'); // returns nodeArray of all text in the chord class 
    sounds = {}
    const referenceNotes = [ 'c3','c#3','d3','d#3','e3','f3','f#3','g3','g#3','a3','a#3','b3', 'c4','c#4','d4','d#4','e4','f4','f#4','g4','g#4','a4','a#4','b4', 'c5','c#5','d5','d#5','e5','f5','f#5','g5','g#5','a5','a#5','b5', ];

    // this may be vestigial but I'm too scared to remove it
    modeSelect = Number(document.getElementById('modeSelect').value)-1

    let ms = getModeSteps()
    let currentModeSteps = ms[modeSelect] // half steps from root for current user selected mode
    let referenceNotesIndex = 0

    // finds the index of the root note of the scale
    for (let i = 0; i< referenceNotes.length; i++){
        if (referenceNotes[i].slice(0, -1) == newChords[0][0]){
            referenceNotesIndex = i
            break
        }
            
    }
    //console.log('referenceNotesIndex: ' + referenceNotesIndex)

    // scale we will build out
    let currentEnumeratedModeNotes = []
    for (let i = 0 ; i < 7; i++){
        currentEnumeratedModeNotes[i] = referenceNotes[referenceNotesIndex + currentModeSteps[i]]
    }

    // add currentEnumeratedModeNotes onto currentEnumeratedModeNotes, but make it an octave higher
    currentEnumeratedModeNotes = currentEnumeratedModeNotes.concat(currentEnumeratedModeNotes)

    for (let i in currentEnumeratedModeNotes){
        if (i>6){
            //add 1 to the last digit...
            currentEnumeratedModeNotes[i] = currentEnumeratedModeNotes[i].replace(/\d+$/,match => parseInt(match) + 1);
        }
    }


    let enumeratedChords = []; // this is a 2d array
    let enumeratedChord = [] // 1D array to be pushed to enumeratedEncodedChords when filled with 3 notes

    // c,d,e,f,g,a,b, c,d,e,f,g,a,b
    // now we must build the 7 triads from currentEnumeratedModeNotes
    for (let i = 0 ; i < 7; i++){
        enumeratedChord = [currentEnumeratedModeNotes[i], currentEnumeratedModeNotes[i+2], currentEnumeratedModeNotes[i+4]]
        enumeratedChords.push(enumeratedChord)
    }

    // for (let i = 0 ; i < 7; i++){
    //     console.log('enumeratedChords['+i+']: ' + enumeratedChords[i])
    // }
    
    // now we build row 2 (and 3?)
    for (let i = 7; i < 21; i++){
        for (let j = 0; j< referenceNotes.length; j++){
            
            if (chordEls[i].textContent.includes('#')){
                if (referenceNotes[j].slice(0, -1) == chordEls[i].textContent.slice(0,2).toLowerCase()){
                    referenceNotesIndex = j 
                    break
                }
            }else {
                if (referenceNotes[j].slice(0, -1) == chordEls[i].textContent.slice(0,1).toLowerCase()){
                    referenceNotesIndex = j
                    break
                }
            }    
        }

        
        //console.log('referenceNotesIndex: ' + referenceNotesIndex)

        // chordEls[0]: B 
        // chordEls[1]: C# 
        // chordEls[2]: D#m 
        // chordEls[3]: Fdim
        // chordEls[4]: F# 

        //const referenceNotes = [ 'c3','c#3','d3','d#3','e3','f3','f#3','g3','g#3','a3','a#3','b3', 'c4','c#4','d4','d#4','e4','f4','f#4','g4','g#4','a4','a#4','b4', 'c5','c#5','d5','d#5','e5','f5','f#5','g5','g#5','a5','a#5','b5', ];
        // const major = [0, 4 ,7];
        // const minor = [0, 3, 7];
        // const diminished = [0, 3, 6];
        
        // is the sound rendered before chordels is updated?

        

        let diminishedTemp = getDiminishedFormula()
        let minorTemp = getMinorFormula()
        let majorTemp = getMajorFormula()

        if (chordEls[i].textContent.includes('dim')){
            enumeratedChord = [referenceNotes[referenceNotesIndex] ,                     //  USER SHOULD HAVE ABILITY TO + OR - AN OCTAVE 
                               referenceNotes[referenceNotesIndex + diminishedTemp[1]], 
                               referenceNotes[referenceNotesIndex + diminishedTemp[2]]]                        
        } else {
            if (chordEls[i].textContent.includes('m')) {
                console.log('chordEls['+i+'].textContent:'  + chordEls[i].textContent)
                enumeratedChord = [referenceNotes[referenceNotesIndex], 
                                   referenceNotes[referenceNotesIndex +minorTemp[1]], 
                                   referenceNotes[referenceNotesIndex +minorTemp[2]]]
                console.log('enumeratedChord:'  + enumeratedChord)

            } else { // it must be a major
                enumeratedChord = [referenceNotes[referenceNotesIndex], 
                                   referenceNotes[referenceNotesIndex + majorTemp[1]], 
                                   referenceNotes[referenceNotesIndex + majorTemp[2]]]
            }
        }
        enumeratedChords.push(enumeratedChord)
    }

    for (let k=0;k<enumeratedChords.length; k++){
       console.log("{{{" + k + ': '+ enumeratedChords[k])
    }
    let enumeratedEncodedChords = enumeratedChords.map(chord =>
        chord.map(note => note.replace("#", "%23")) );
    
    for (let k=0;k<enumeratedEncodedChords.length; k++){
       console.log("---" + k + ': '+ enumeratedEncodedChords[k])
    }

    sounds = {
        '1': [new Audio('sounds/'+enumeratedEncodedChords[0][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[0][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[0][2]+'.wav'),],
        '2': [new Audio('sounds/'+enumeratedEncodedChords[1][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[1][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[1][2]+'.wav'),],
        '3': [new Audio('sounds/'+enumeratedEncodedChords[2][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[2][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[2][2]+'.wav'),],
        '4': [new Audio('sounds/'+enumeratedEncodedChords[3][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[3][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[3][2]+'.wav'),],
        '5': [new Audio('sounds/'+enumeratedEncodedChords[4][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[4][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[4][2]+'.wav'),],
        '6': [new Audio('sounds/'+enumeratedEncodedChords[5][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[5][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[5][2]+'.wav'),],
        '7': [new Audio('sounds/'+enumeratedEncodedChords[6][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[6][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[6][2]+'.wav'),],
        
        'q': [new Audio('sounds/'+enumeratedEncodedChords[7][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[7][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[7][2]+'.wav'),],
        'w': [new Audio('sounds/'+enumeratedEncodedChords[8][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[8][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[8][2]+'.wav'),],
        'e': [new Audio('sounds/'+enumeratedEncodedChords[9][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[9][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[9][2]+'.wav'),],
        'r': [new Audio('sounds/'+enumeratedEncodedChords[10][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[10][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[10][2]+'.wav'),],
        't': [new Audio('sounds/'+enumeratedEncodedChords[11][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[11][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[11][2]+'.wav'),],
        'y': [new Audio('sounds/'+enumeratedEncodedChords[12][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[12][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[12][2]+'.wav'),],
        'u': [new Audio('sounds/'+enumeratedEncodedChords[13][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[13][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[13][2]+'.wav'),],
        
        'a': [new Audio('sounds/'+enumeratedEncodedChords[14][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[14][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[14][2]+'.wav'),],
        's': [new Audio('sounds/'+enumeratedEncodedChords[15][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[15][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[15][2]+'.wav'),],
        'd': [new Audio('sounds/'+enumeratedEncodedChords[16][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[16][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[16][2]+'.wav'),],
        'f': [new Audio('sounds/'+enumeratedEncodedChords[17][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[17][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[17][2]+'.wav'),],
        'g': [new Audio('sounds/'+enumeratedEncodedChords[18][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[18][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[18][2]+'.wav'),],
        'h': [new Audio('sounds/'+enumeratedEncodedChords[19][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[19][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[19][2]+'.wav'),],
        'j': [new Audio('sounds/'+enumeratedEncodedChords[20][0]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[20][1]+'.wav'),new Audio('sounds/'+enumeratedEncodedChords[20][2]+'.wav'),],
    }

}


document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
        
    // let soundFiles = modifySounds()

    console.log('---- eventListener(keydown) ----')

    if (sounds[key]) {
        sounds[key].forEach(audio => {
            //create a fresh Audio instance so it can overlap
            const clone = audio.cloneNode();
            console.log("Played file:", decodeURIComponent(clone.src.split("/").pop()));
            clone.play();
        });
    }
});

function updateKeyboard(buttonsNewChords) {
    const chordEls = document.querySelectorAll('#keyboard .chord'); // returns nodeArray of all text in the chord class 
    let chordsChords= []    

    let types= []
    // buttonsNewChords is 7x3 array
    buttonsNewChords.forEach((chordNotes, i) => {

        if (chordEls[i]) {
        
            for (let i = 0 ; i < chordNotes.length-3; i++){
                chordsChords.push(chordIdentifier(chordNotes[i],chordNotes[i+1],chordNotes[i+2]))
            }
            let chordType = chordIdentifier(chordNotes);
            // display root note + chord type
            if(chordType == 'diminished') {
                chordType = 'dim'
            } else if(chordType == 'major') {
                chordType = ' '
            } else if(chordType == 'minor') {
                chordType = 'm'
            }
            types.push(chordType)

            chordEls[i].textContent = chordNotes[0].toUpperCase() + " " + chordType;
        }

    });

    // here is where I want to update the remaining 14 buttons
    for (let i = 0; i<7; i++){ // this used to be i<14.  
        if (types[i] == ' '){
            chordEls[i+7].textContent = buttonsNewChords[i][0].toUpperCase() + "m"
            chordEls[i+14].textContent = buttonsNewChords[i][0].toUpperCase() + "dim"
        } else if (types[i] == 'm'){
            chordEls[i+7].textContent = buttonsNewChords[i][0].toUpperCase() + "dim"
            chordEls[i+14].textContent = buttonsNewChords[i][0].toUpperCase() + " "
        } else {
            chordEls[i+7].textContent = buttonsNewChords[i][0].toUpperCase() + " "
            chordEls[i+14].textContent = buttonsNewChords[i][0].toUpperCase() + "m"
        }
    }
}

// Call this whenever the user selects a new root/mode
function onModeChange(newChords) {
    //modeChords = newChords;
    updateKeyboard(newChords);
}


// TODO:

// 1. Fix octave issues with rows 2-3
// 2.should I make a 'Chord' class?  That way I can dynamically add/remove notes without hardcoding?
// ^ this may come in handy with octave issue and extended structs issue
// 3. be able to modify the chords on screen and chords played
// 4.when keyboard button is pressed, the button on the screen highlights
// 5. It would be cool to have it that when you click on a note, a keyboard pops up and highlights the notes being played
// then the user can click/unclick notes to bind that chord to that keypress
// 

// What would it take for this to actually make money?  How would I advertise?  Would people actually use it?
// we either need to make this a desktop app or a DAW or something.  the performance on laptops is likely bad



// how about mobile?
