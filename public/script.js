
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

const major = [0, 4 ,7];
const minor = [0, 3, 7];
const diminished =   [0, 3, 6];

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
function generateDiatonicNotes(modeNumberHTMLobject, tonicHTMLobject) {
    modeNumber= modeNumberHTMLobject.value
    tonic= tonicHTMLobject.value
    let recenteredNotes = [tonic];

    let split = splitListAtValue(notes, tonic);
    console.log('---split: ' + split)
    if (split.length > 1) {
        recenteredNotes.push(...split[1]);
    }
    if (split.length > 0) {
        recenteredNotes.push(...split[0]);
    }
    console.log('---split: ' + split)
    //console.log("modeNumber: " + modeNumber)
    //console.log("modeSteps: " + modeSteps[modeNumber-1])
    let stepPattern = modeSteps[modeNumber - 1];
    let modeReturned = [];

    for (let i = 0; i < 7; i++) {
        //console.log("stepPattern: " + stepPattern[i])
        modeReturned.push(recenteredNotes[stepPattern[i]]);
    }
    console.log('---modeReturned: ' +modeReturned)
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

function generate() {

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
    
    let modeNotes = generateDiatonicNotes(modeSelect, keyInput);
    let modeChords = generateDiatonicChords(modeNotes);

    notesArea.innerHTML = "<br> The diatonic notes are: " + modeNotes.map(note => `<span style="margin-right: 10px">${note.toUpperCase()}</span>`).join('');    
    chordArea.innerHTML = `<br> The diatonic chords are:  ${renderChordsTable(modeChords)}`;

    chordArea.innerHTML = `<br> The diatonic chords of the parallel modes are: ${renderParalellModes(key)}`;
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

    console.log('chordToBeDetermined[0] : ' + chordToBeDetermined[0])
    console.log('notesRecentered : ' + notesRecentered)

    let indexroot = notesRecentered.indexOf(chordToBeDetermined[0]); // should always be zero
    let indexMiddle = notesRecentered.indexOf(chordToBeDetermined[1]); 
    let indexLast = notesRecentered.indexOf(chordToBeDetermined[2]); 

    let halfsteps = [indexroot, indexMiddle, indexLast]

    console.log('halfsteps : ' + halfsteps)

    let IsMinor = areArraysEqual(halfsteps, minor )
    let IsMajor = areArraysEqual(halfsteps, major )
    let IsDiminished = areArraysEqual(halfsteps, diminished )

    console.log('IsMinor : ' + IsMinor)
    console.log('IsMajor : ' + IsMajor)
    console.log('IsDiminished : ' + IsDiminished)

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

    // computeParalelModes() should return an 6x7x3 array
    // 6 modes, 7 chords, 3 notes
    parallelModes = computeParalelModes(userTonic)

    for (let i =0; i<7; i++){
        renderChordsTable(parallelModes[i])
    }

    
}

function computeParalelModes(userMode,userTonic){
    
    
    let modeNotes = generateDiatonicNotes(userMode, userTonic);
    let modeChords = generateDiatonicChords(modeNotes);

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

const sounds = {

  '1': new Audio('sounds/c4.wav'),

  '3': new Audio('sounds/d4.wav'),

  '5': new Audio('sounds/e4.wav'),
  '6': new Audio('sounds/f4.wav'),

  '8': new Audio('sounds/g4.wav'),

  '10': new Audio('sounds/a4.wav'),

  '12': new Audio('sounds/b4.wav'),
  '13': new Audio('sounds/c5.wav'),
  '14': new Audio(''),
  '15': new Audio(''),
  '16': new Audio(''),
  '17': new Audio(''),
  '18': new Audio(''),
  '19': new Audio(''),
  '20': new Audio(''),
  '21': new Audio(''),
  '22': new Audio(''),
  '23': new Audio(''),
  '24': new Audio(''),
  '25': new Audio(''),
  '26': new Audio(''),
  '27': new Audio(''),
  '28': new Audio(''),
  '29': new Audio(''),
  '30': new Audio(''),
  '31': new Audio('')
};



const currentScale= {}


const diatonicChords = {

   // how to make a single button press activate multiple files? (hmm)
   // how to make the file names dynamic? (easy)

  '1': 'umm',
};


document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();






  if (sounds[key]) {
    sounds[key].currentTime = 0; // reset if pressed quickly
    sounds[key].play();
    //console.log(`Played sound for key: ${key}`);
  }
});


