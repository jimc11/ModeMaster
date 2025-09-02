
let keyMap={};

// the chromatic scale
const notes = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'];

// number of half steps away each diatonic note is from the root node of each mode
const modeSteps = [
    [0, 2, 4, 5, 7, 9, 11],  // Ionian 0
    [0, 2, 3, 5, 7, 9, 10],  // Dorian 1
    [0, 1, 3, 5, 7, 8, 10],  // Phrygian 2 
    [0, 2, 4, 6, 7, 9, 11],  // Lydian 3
    [0, 2, 4, 5, 7, 9, 10],  // Mixolydian 4
    [0, 2, 3, 5, 7, 8, 10],  // Aeolian 5
    [0, 1, 3, 5, 6, 8, 10]   // Locrian 6
];

// there's base chords, and modifiers...

// base chords?
const major = [0, 4 ,7]; // 1-3-5
const minor = [0, 3, 7]; // 1-♭3-5
const diminished = [0, 3, 6]; // 1-♭3-♭5
const sus2 =   [0, 2, 7]; // 1-2-5
const sus4 =   [0, 2, 5]; // 1-4-5
const sus2sus4 =   [0, 2, 5, 7]; // 1-2-4-5

// modifiers
const add6 = [0, 4, 7, 9] // 1-3-5-6 (aka X6)
const add9 = [0, 4, 7, 14]  // 1-3-5-9
const add11 = [0, 4, 7, 17] // 1-3-5-11
const add13 = [0, 4, 7, 21] // 1-3-5-13

// dominant family
const X7 = [0, 4, 7, 10] // 1-3-5-♭7
const X9 = [0, 4, 7, 10, 14] // 1-3-5-♭7
const X11 = [0, 4, 7, 10, 14, 17] // 1-3-5-♭7
const X13 = [0, 4, 7, 10, 14, 17, 21] // 1-3-5-♭7

// majX
const maj7 = [0, 4, 7, 11] // 1-3-5-7 aka  C△ aka C dominant 7
const maj9 = [0, 4, 7, 11, 14] // 1-3-5-b7-9
const maj11 = [0, 4, 7, 11, 14, 17] // 1-3-5-b7-9-11
const maj13 = [0, 4, 7, 11, 14, 17, 21] // 1-3-5-b7-9-11-13

// mX
const m7 = [0, 3, 7, 10] // 1-♭3-5-♭7
const m9 = [0, 3, 7, 10, 14] // 1-♭3-5-♭7-9
const m11 = [0, 3, 7, 10, 14, 17] // 1-♭3-5-♭7-9-11
const m13 = [0, 3, 7, 10, 14, 17, 21] // 1-♭3-5-♭7-9-13

// minor major 7
const minormajor7 = [0, 3, 7, 11] // 1-♭3-5-7

// TODO: How are we going to implement inversions?
// TODO: how to handle m13#11?  can we just modify the 11?  same with maj7b5 etc




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
    let recenteredNotes = [tonic];

    let split = splitListAtValue(notes, tonic);
    //console.log('---split: ' + split)
    if (split.length > 1) {
        recenteredNotes.push(...split[1]);
    }
    if (split.length > 0) {
        recenteredNotes.push(...split[0]);
    }
    //console.log('---split: ' + split)
   // console.log("modeNumber: " + modeNumber) // modeNumber jsut fails now
   // console.log("modeSteps: " + modeSteps[modeNumber-1])
    let stepPattern = modeSteps[modeNumber - 1];
    let modeReturned = [];
   // console.log("modeNumber: " + modeNumber) // fails when changing mode
   // console.log("modeSteps[modeNumber - 1]: " + modeSteps[modeNumber - 1]) // fails when changing mode

    for (let i = 0; i < 7; i++) {
        //console.log("i: " + i)
       // console.log("stepPattern: " + stepPattern[i])
        modeReturned.push(recenteredNotes[stepPattern[i]]); 
    }
    //console.log('---modeReturned: ' +modeReturned)
    return modeReturned;
}



// returns the diatonic chords of the mode that the user selected
// the return type is a 7x3 array, with each of the 7 arrays being an 
// array of 3 chars (the chars are the triads)
function generateDiatonicChords(inputMode) {
   
    let chords = [];

    //console.log("inputMode: " + inputMode)
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

    //console.log('splitListAtValue[1,2,3,4,5,6], 4 : ' + splitListAtValue(['1','2','3','4','5','6'], '4' ))

    //console.log('chordToBeDetermined[0] : ' + chordToBeDetermined[0])
    //console.log('notesRecentered : ' + notesRecentered)

    let indexroot = notesRecentered.indexOf(chordToBeDetermined[0]); // should always be zero
    let indexMiddle = notesRecentered.indexOf(chordToBeDetermined[1]); 
    let indexLast = notesRecentered.indexOf(chordToBeDetermined[2]); 

    let halfsteps = [indexroot, indexMiddle, indexLast]

   // console.log('halfsteps : ' + halfsteps)

    let IsMinor = areArraysEqual(halfsteps, minor )
    let IsMajor = areArraysEqual(halfsteps, major )
    let IsDiminished = areArraysEqual(halfsteps, diminished )

    //console.log('IsMinor : ' + IsMinor)
    //console.log('IsMajor : ' + IsMajor)
    //console.log('IsDiminished : ' + IsDiminished)

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

    // computeParalelModes() should return an 7x7x3 array
    // 7 modes, 7 chords, 3 notes
    
    
    let parallelModes = computeParalelModes(userTonic)

    //for (let i=0; i<7;i++){
    //    console.log('parallelModes[i]: '+ parallelModes[i]) 
    //} 

    // confirmed working up to here
    return renderMultiChordsTable(parallelModes)
}

function renderMultiChordsTable(chordsOfAllModes){
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

        //console.log ("modeSelect.value - 1: " + modeSelect.value-1)
        //console.log ("row: " + row)

        if (document.getElementById('modeSelect').value -1 == row ){
            tableHtml += " style=\"background-color: #ffeaa6;\""
        } else {
            tableHtml += " style=\"background-color: white;\""
        }

        tableHtml += ">";
        tableHtml += `<th>${modeToNum[row]}</th>`;
        for (let col = 0; col < 7; col++) {
            tableHtml += `<th> ${chordsOfAllModes[row][col][0].toUpperCase()} ${chordIdentifier(chordsOfAllModes[row][col])}</th>`
        }
        tableHtml += "</tr>";
    }

    // tableHtml += "<tr>";

    // tableHtml += '<th>Notes in that chord</th>'; 
    // for (let col = 0; col < 7; col++) {
      
    //   //console.log('[index]: ' + index)
    //   //console.log('chordsOfAllModes[index]: ' + chordsOfAllModes[index])
    //   tableHtml += `<td>${chordsOfAllModes[col]}</td>`;
    // }


  tableHtml += "</table>";
  return tableHtml;
}

function computeParalelModes(userTonic){
    
    // we want to generate all modes of userTonic
    //userMode is just a number

    let allModeNotes = []
    //console.log('here: ')
    //console.log('userTonic: ' + userTonic)
    for (let i=0; i<7;i++){
        allModeNotes[i] = generateDiatonicNotes(i+1, userTonic); // returns 7x7 array
    }
    //console.log('allModeNotes: '+ allModeNotes)
    
    let modeChords = []

    
//    console.log('---test1---')
    for (let i=0; i<7;i++){
        modeChords[i] = generateDiatonicChords(allModeNotes[i]); 
  //      console.log('---test2---')
    } 
    // console.log('---test3---')
    // for (let i=0; i<7;i++){
    //     console.log('modeChords[i]: '+ modeChords[i]) 
    // } 
    // confirmed working up to this line
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
      
      //console.log('[index]: ' + index)
      //console.log('modeChords[index]: ' + modeChords[index])
      tableHtml += `<td>${modeChords[col]}</td>`;
    }


  tableHtml += "</table>";
  return tableHtml;
}



// Example usage:
//document.getElementById("chordsArea").innerHTML = renderChordsTable(modeChords);

function renderSounds (mode, newChords){

    // this grabs before update.. CONFIRMED.
    // How to grab after update?
    const chordEls = document.querySelectorAll('#keyboard .chord'); // returns nodeArray of all text in the chord class 

    for (let i = 0; i<chordEls.length; i++)
        console.log('chordEls['+i+']: ' + chordEls[i].textContent)
    
    sounds = {}

    const referenceNotes = [ 'c3','c#3','d3','d#3','e3','f3','f#3','g3','g#3','a3','a#3','b3', 'c4','c#4','d4','d#4','e4','f4','f#4','g4','g#4','a4','a#4','b4', 'c5','c#5','d5','d#5','e5','f5','f#5','g5','g#5','a5','a#5','b5', ];

    let currentModeSteps = modeSteps[mode-1] // half steps from root for current user selected mode
    let referenceNotesIndex = 0

    // finds the index of the root note of the scale
    for (let i = 0; i< referenceNotes.length; i++){

        if (referenceNotes[i].slice(0, -1) == newChords[0][0]){
            referenceNotesIndex = i
            break
        }
    }
    
    // scale we will build out
    let currentEnumeratedModeNotes = []
    //let enumeratedChromaticNotes = []
    for (let i = 0 ; i < 7; i++){
        currentEnumeratedModeNotes[i] = referenceNotes[referenceNotesIndex + currentModeSteps[i]]
        //console.log('currentModeSteps[i]' + currentModeSteps[i])
    }

    // add currentEnumeratedModeNotes onto currentEnumeratedModeNotes, but make it an octave higher
    currentEnumeratedModeNotes = currentEnumeratedModeNotes.concat(currentEnumeratedModeNotes)
    //console.log('1currentEnumeratedModeNotes: ' + currentEnumeratedModeNotes)

    for (i in currentEnumeratedModeNotes){
        if (i>6){
            //add 1 to the last digit...
            currentEnumeratedModeNotes[i] = currentEnumeratedModeNotes[i].replace(/\d+$/,match => parseInt(match) + 1);
        }
    }

    //console.log('currentEnumeratedModeNotes: ' + currentEnumeratedModeNotes)

    let enumeratedChords = []; // this is a 2d array 7x3
    let enumeratedChord = [] // 1D array to be pushed to enumeratedEncodedChords when filled with 3 notes

    // currentEnumeratedModeNotes=  c,d,e,f,g,a,b, c,d,e,f,g,a,b
    // now we must build the 7 triads from currentEnumeratedModeNotes
    // this builds row 1
    for (let i = 0 ; i < 8; i++){
        enumeratedChord = [currentEnumeratedModeNotes[i], currentEnumeratedModeNotes[i+2], currentEnumeratedModeNotes[i+4]]
        enumeratedChords.push(enumeratedChord)
    }

    //console.log('2currentEnumeratedModeNotes: ' + currentEnumeratedModeNotes)
    
    // now we build row 2 (and 3?)

    modeSelect = Number(document.getElementById('modeSelect').value)-1
    //modeSelect -= 1
    
    // !@#$@%$^$%^* I think this needs to be 8, but it was halfway working at 7...
    for (let i = 7 ; i < 21; i++){ // 

        for (let j = 0; j< referenceNotes.length; j++){
            
            if (referenceNotes[j].slice(0, -1) == chordEls[i].textContent.slice(0,1).toLowerCase()){
                //  console.log('*****')
                //  console.log(
                //      "left:", referenceNotes[j].slice(0, -1),
                //      "right:", chordEls[i].textContent.slice(0,1).toLowerCase(),
                //      "equal?:", referenceNotes[j].slice(0, -1) == chordEls[i].textContent.slice(0,1).toLowerCase()
                //      ); 

                referenceNotesIndex = j
                console.log('i: ' + i)

                console.log('referenceNotesIndex: ' + referenceNotesIndex)

                break
            }
                
        }

        //const referenceNotes = [ 'c3','c#3','d3','d#3','e3','f3','f#3','g3','g#3','a3','a#3','b3', 'c4','c#4','d4','d#4','e4','f4','f#4','g4','g#4','a4','a#4','b4', 'c5','c#5','d5','d#5','e5','f5','f#5','g5','g#5','a5','a#5','b5', ];
        // const major = [0, 4 ,7];
        // const minor = [0, 3, 7];
        // const diminished = [0, 3, 6];

        //console.log("referenceNotesIndex: " + referenceNotesIndex)
        // I believe this is the heart of the issue
        //    CHORDELS doesn't seem to be grabbing the correct data...
        
        console.log('*****')
        console.log('chordEls['+i+']: ' + chordEls[i].textContent)
        // is the sound rendered before chordels is updated?
        if (chordEls[i].textContent.slice(2,5)  == 'dim'){
            console.log('i: '+i)
            console.log('x')
            enumeratedChord = [referenceNotes[referenceNotesIndex] ,                     //  USER SHOULD HAVE ABILITY TO + OR - AN OCTAVE 
                               referenceNotes[referenceNotesIndex + diminished[1]], 
                               referenceNotes[referenceNotesIndex + diminished[2]]]                        
        } else {
            if (chordEls[i].textContent.slice(2,4) == 'm') {
                console.log('i: '+i)
                console.log('y')
                enumeratedChord = [referenceNotes[referenceNotesIndex], 
                                   referenceNotes[referenceNotesIndex +minor[1]], 
                                   referenceNotes[referenceNotesIndex +minor[2]]]
            } else { // it must be a major
                console.log('i: '+i)
                console.log('y:')
                enumeratedChord = [referenceNotes[referenceNotesIndex], 
                                   referenceNotes[referenceNotesIndex + major[1]], 
                                   referenceNotes[referenceNotesIndex + major[2]]]
            }
        }
        console.log("enumeratedChord: " + enumeratedChord)       
        enumeratedChords.push(enumeratedChord)
    }

    let enumeratedEncodedChords = enumeratedChords.map(chord =>
        chord.map(note => note.replace("#", "%23")) );
    
    for (let k=0;k<enumeratedEncodedChords.length; k++){
       console.log("---" + k)
       console.log(enumeratedEncodedChords[k])
       // console.log(")")
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
    };
}

let sounds = {
    '1': [new Audio('sounds/c4.wav'),new Audio('sounds/e4.wav'),new Audio('sounds/g4.wav'),],
    '2': [new Audio('sounds/d4.wav'),new Audio('sounds/f4.wav'),new Audio('sounds/a4.wav'),],
    '3': [new Audio('sounds/e4.wav'),new Audio('sounds/g4.wav'),new Audio('sounds/b4.wav'),],
    '4': [new Audio('sounds/f4.wav'),new Audio('sounds/a4.wav'),new Audio('sounds/c5.wav'),], 
    '5': [new Audio('sounds/g4.wav'),new Audio('sounds/b4.wav'),new Audio('sounds/d5.wav'),],
    '6': [new Audio('sounds/a4.wav'),new Audio('sounds/c5.wav'),new Audio('sounds/e5.wav'),],
    '7': [new Audio('sounds/b4.wav'),new Audio('sounds/d5.wav'),new Audio('sounds/f5.wav'),],
};


document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
        console.log('--------')

if (sounds[key]) {
    sounds[key].forEach(audio => {
        //create a fresh Audio instance so it can overlap
        //console.log("sounds[key].toString(): "+ sounds[key].toString())
        const clone = audio.cloneNode();
        //console.log("clone:  "+ clone)
        console.log("Played file:", decodeURIComponent(clone.src.split("/").pop()));
        clone.play();
    });
  }
});


// ----- MAIN FUNCTION -----
function generate() {
    console.log("------generate()------")
    // user input for the mode (returns a nubmer 1-7)
    let mode = document.getElementById('modeSelect').value;
   // console.log("mode: " + mode)
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
    

    //console.log("modeSelect.value1: " + modeSelect.value) // fails on round 2

    let modeNotes = generateDiatonicNotes(mode, keyInput.value);
    let modeChords = generateDiatonicChords(modeNotes);

    notesArea.innerHTML = "<br> The diatonic notes are: " + modeNotes.map(note => `<span style="margin-right: 10px">${note.toUpperCase()}</span>`).join('');    
    //chordArea.innerHTML = `<br> The diatonic chords are:  ${renderChordsTable(modeChords)}`;

    parallelArea.innerHTML = `<br> The diatonic chords of the parallel modes are: ${renderParalellModes(key)}`;
   

    //console.log('modeChords: ' + modeChords)
    onModeChange(modeChords)
    renderSounds(mode, modeChords)
}

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
            //console.log('types[i]===: ' + types)

            chordEls[i].textContent = chordNotes[0].toUpperCase() + " " + chordType;
        }

    });

    // here is where I want to update the remaining 14 buttons
    //console.log("buttonsNewChords: " + buttonsNewChords)
    for (let i = 0; i<7; i++){ // this used to be i<14.  not sure why I had it like that.  seems okay now that its i<7

        // if 1 is major
        // then 2 is minor
        // and 3 is diminished

        // if 1 is minor
        // then 2 is diminished
        // and 3 is major

        // if 1 is diminished
        // then 2 is major
        // 3 is minor

        // console.log('i: ' + i) // fails when i=7...
        // console.log('buttonsNewChords[i][0]: ' + buttonsNewChords[i][0])
        if (types[i] == ' '){
            chordEls[i+7].textContent = buttonsNewChords[i][0].toUpperCase() + "m"
            chordEls[i+14].textContent = buttonsNewChords[i][0].toUpperCase() + "dim"
        } else if (types[i] == 'm'){
            // console.log('658: ')
            // console.log('i: '+i)
            chordEls[i+7].textContent = buttonsNewChords[i][0].toUpperCase() + "dim"
            chordEls[i+14].textContent = buttonsNewChords[i][0].toUpperCase() + " "
        } else {
            // console.log('Here: ')
            // console.log('buttonsNewChords[i][0]: ' + buttonsNewChords[i][0]) // 
            chordEls[i+7].textContent = buttonsNewChords[i][0].toUpperCase() + " "

            chordEls[i+14].textContent = buttonsNewChords[i][0].toUpperCase() + "m"
        }
        // console.log('i : ' + i)
        // console.log('types[i]: ' + types[i])
        // console.log('chordEls[i+7].textContent : ' + chordEls[i+7].textContent)
        // console.log('chordEls[i+14].textContent : ' + chordEls[i+14].textContent)
        
    }
    
}


function onModeChange(newChords) {
    updateKeyboard(newChords);
}


// TODO:

// 1. Fix issue where program crashes when mode is changed
// ^ seems fixed.  document.getElementById('modeSelect').value was causing issues?  I probably implemented it incorrectly
// 2. Fix issue where kbrd rows 2 and 3 are not playing the correct chord(outside of Ionian modes)
// ^ is that actually what is going on?
// 3. be able to modify the chords on screen and chords played
// 4.when keyboard button is pressed, the button on the screen highlights