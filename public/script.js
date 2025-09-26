import { Chord } from './Chord.js';
import {commonFormulas} from './CommonFormulas.js'

document.getElementById("generateButton").addEventListener("click", generate);

let sounds 
let chordStates = {}; // array of 21 objects with info gathered from user input on HTML

//default chords upon first visit
onModeChange(generateDiatonicChords(generateDiatonicNotes(1,'c')))
renderSounds(1, generateDiatonicChords(generateDiatonicNotes(1,'c')))

// ----- Context Menu Code  ----

 // I want chordstates to look like this: chordstates = { root: 'c', name: 'dom7flat5' }
//const chordStates = {};

// Cache DOM elements
const menu = document.getElementById("gearMenu");
const overlay = document.getElementById("popupOverlay");

// Attach event listeners to keys
document.querySelectorAll(".key.modifiable").forEach(key => {
  key.addEventListener("click", (e) => {
    const keyIndex = key.dataset.keyIndex;
    openMenu(e.pageX, e.pageY, keyIndex);
  });
});

// Open and position the menu
function openMenu(x, y, keyIndex) {
  menu.style.display = "block"; // show first so width/height are real
  overlay.style.display = "block";

  const menuRect = menu.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = x;
  let top = y;

  // clamp to right edge
  if (x + menuRect.width > viewportWidth) {
    left = viewportWidth - menuRect.width - 5;
  }
  // clamp to bottom edge
  if (y + menuRect.height > viewportHeight) {
    top = viewportHeight - menuRect.height - 5;
  }

  menu.style.left = `${Math.max(0, left)}px`;
  menu.style.top = `${Math.max(0, top)}px`;

  loadChordState(keyIndex);
  bindInputs(keyIndex);

  // adjust submenus too
  adjustSubmenus(menu);
}

// Load saved state for a key
function loadChordState(keyIndex) {
  const savedState = chordStates[keyIndex] || {};

  // Reset inputs before applying state
  menu.querySelectorAll("input").forEach(input => {
    input.checked = false;
  });

  Object.entries(savedState).forEach(([id, checked]) => {
    const input = menu.querySelector(`#${CSS.escape(id)}`);
    if (input) input.checked = checked;
  });
}
menu.querySelectorAll("li").forEach(li => {
  li.addEventListener("mouseenter", () => adjustSubmenus(menu));
});
// Bind input listeners once per open
function bindInputs(keyIndex) {
  menu.querySelectorAll("input").forEach(input => {
    input.onchange = () => {
      if (!chordStates[keyIndex]) chordStates[keyIndex] = {};
      chordStates[keyIndex][input.id] = input.checked;
    };
  });
}

// Close menu when clicking outside
overlay.addEventListener("click", closeMenu);
function closeMenu() {
  menu.style.display = "none";
  overlay.style.display = "none";
}
function adjustSubmenus(menu) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  menu.querySelectorAll(".submenu").forEach(sub => {
    sub.classList.remove("reverse"); // reset
    sub.style.top = ""; // reset

    const rect = sub.getBoundingClientRect();

    // Flip horizontally if overflowing right
    if (rect.right > viewportWidth) {
      sub.classList.add("reverse");
    }
    if (sub.parentElement.closest(".submenu")?.classList.contains("reverse")) {
      sub.classList.add("reverse");
    }

    // Nudge vertically using absolute position
    let topOffset = 0;
    const subHeight = rect.height;
    const parentRect = sub.parentElement.getBoundingClientRect();
    const spaceBelow = viewportHeight - parentRect.bottom;

    if (subHeight > spaceBelow) {
      topOffset = spaceBelow - subHeight - 5; // push up
    }

    sub.style.top = `${topOffset}px`;
  });
}
// ----- Context Menu Code End ----



// ----- 'Main' Function -----
function generate() {
    console.log("------generate()------")
    //setupModifierPopup();

    // user input for the mode (returns a nubmer 1-7)
    let mode = document.getElementById('modeSelect').value;

    // user input for the root note (a, a#, b, c ...)
    let key = document.getElementById('keyInput').value;
    let wordMode = ['', 'Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'][mode];

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

// ----- Helper Functions -----

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

    let ms = commonFormulas['modeSteps']
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


    let IsMinor = areArraysEqual(halfsteps, commonFormulas['minor'] )
    let IsMajor = areArraysEqual(halfsteps, commonFormulas['major'])
    let IsDiminished = areArraysEqual(halfsteps, commonFormulas['diminished'] )

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

// ----- End Helper Functions -----

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

function renderSounds (){
    console.log('----renderSounds()----')

    modeSelect = Number(document.getElementById('modeSelect').value)-1

    let diminishedTemp = commonFormulas['diminished']
    let minorTemp = commonFormulas['minor']
    let majorTemp = commonFormulas['major']
    
    let chords = [] 
    let currentModeChordPattern = commonFormulas['modeChords'][modeSelect] // ['major','minor','minor','major','major','minor','diminished']
    
    let notesOfCurrentMode = commonFormulas.modeSteps[modeSelect]    
    let startingPosition = commonFormulas.notes.indexOf(keyInput.value)

    console.log( chordStates)
    //so, it looks like this:
// Object { 1: { g: true }, 2: { f: true, major: true, "d#": true } }
// and before user has input, it looks like this: 
// Object {  }
// so, do we want to populate chordStates with hardcoding? no
// but we do want to prepopulate it with whatever is on the HTML.  In fact, we always want to 
// pull directly from HTML.  The radio menu will adjust the HTML, JS grabs from HTML and stores,  then sounds render from js logic
READ THIS ^^^^^

    // --- add functionality where chords[i] reads the property of the user selected shit
    // -- fuck, this may be tricky.
    // -- should this come after these 3 rows are populated?  No, need to change current code
    // honestly, we first need a way to get the context menu working and storing data.
    
    // for now, user just selects a chord.  no modding the chords.  give them a list of popular ones.

    // I think what we have to do is have these 3 rows read directly from html.  We can probably use this code, just changed slightly.  the swithc maybe shouldn't be based on currentModeChordPattern, but instead on the actual HTML
    //


    const chordEls = document.querySelectorAll('#keyboard .chord'); // returns nodeArray of all text in the chord class 
    //hordEls[i].textContent

    // Populate row 1 of keyboard (pre user input)
    for(let i = 0; i< 7; i++){

        // this is reading directly from the HTML, which isn't exactly a  bad thing.
        // but this doesn't scale to the other extended structures...
        // how can we make that work?

        if (chordEls[i].textContent.includes('dim')) {
            chords.push(new Chord(diminishedTemp,commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(0,-1),commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(-1))) //keyInput.value may cause issues
        } else if (chordEls[i].textContent.includes('m')) {
            chords.push(new Chord (minorTemp,commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(0,-1),commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(-1))) //keyInput.value may cause issues
        } else {
            chords.push(new Chord (majorTemp,commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(0,-1),commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(-1))) //keyInput.value may cause issues
        }

        // switch (currentModeChordPattern[i]) {
        //     case 'major':
        //         chords.push(new Chord (majorTemp,commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(0,-1),commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(-1))) //keyInput.value may cause issues
        //         break
        //     case 'minor':
        //         chords.push(new Chord (minorTemp,commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(0,-1),commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(-1))) //keyInput.value may cause issues
        //         break
        //     case 'diminished':
        //         chords.push(new Chord(diminishedTemp,commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(0,-1),commonFormulas.allNumberedNotes[startingPosition + notesOfCurrentMode[i]].slice(-1))) //keyInput.value may cause issues
        //         break
        // }

    }

    // Row 2 (pre user input)
    for(let i = 7; i< 14; i++){
        switch (currentModeChordPattern[i%7]) {
            case 'major':
                chords.push(new Chord(minorTemp,chords[i%7].rootNote, chords[i%7].startingOctave)) //keyInput.value may cause issues
                break
            case 'minor':
                chords.push(new Chord (diminishedTemp,chords[i%7].rootNote,chords[i%7].startingOctave)) //keyInput.value may cause issues
                break
            case 'diminished':
                chords.push(new Chord (majorTemp,chords[i%7].rootNote,chords[i%7].startingOctave)) //keyInput.value may cause issues
                break
        }
    }

    // Row 3 (pre user input)
    for(let i = 14; i< 21; i++){
        // console.log('===x===')
        // console.log("chords["+i+"%7].rootNote: " + chords[i%7].rootNote)
        switch (currentModeChordPattern[i%7]) {
            case 'major':
                chords.push(new Chord(diminishedTemp,chords[i%7].rootNote, chords[i%7].startingOctave)) //keyInput.value may cause issues
                break
            case 'minor':
                chords.push(new Chord (majorTemp,chords[i%7].rootNote,chords[i%7].startingOctave)) //keyInput.value may cause issues
                break
            case 'diminished':
                chords.push(new Chord (minorTemp,chords[i%7].rootNote,chords[i%7].startingOctave)) //keyInput.value may cause issues
                break
        }
    }


    // ---- All this is probably pointless lol ----
    // const chordEls = document.querySelectorAll('#keyboard .chord'); // returns nodeArray of all text in the chord class 
   0 //chordEls[i].textContent
    // sounds = {}
    // const referenceNotes = [ 'c3','c#3','d3','d#3','e3','f3','f#3','g3','g#3','a3','a#3','b3', 'c4','c#4','d4','d#4','e4','f4','f#4','g4','g#4','a4','a#4','b4', 'c5','c#5','d5','d#5','e5','f5','f#5','g5','g#5','a5','a#5','b5', ];

    // modeSelect = Number(document.getElementById('modeSelect').value)-1

    // let ms = getModeSteps()
    // let currentModeSteps = ms[modeSelect] // half steps from root for current user selected mode
    // let referenceNotesIndex = 0


    // // finds the index of the root note of the scale
    // for (let i = 0; i< referenceNotes.length; i++){
    //     if (referenceNotes[i].slice(0, -1) == newChords[0][0]){
    //         referenceNotesIndex = i
    //         break
    //     }
            
    // }
    // //console.log('referenceNotesIndex: ' + referenceNotesIndex)

    // // scale we will build out
    // let currentEnumeratedModeNotes = []
    // for (let i = 0 ; i < 7; i++){
    //     currentEnumeratedModeNotes[i] = referenceNotes[referenceNotesIndex + currentModeSteps[i]]
    // }

    // // add currentEnumeratedModeNotes onto currentEnumeratedModeNotes, but make it an octave higher
    // currentEnumeratedModeNotes = currentEnumeratedModeNotes.concat(currentEnumeratedModeNotes)

    // for (let i in currentEnumeratedModeNotes){
    //     if (i>6){
    //         //add 1 to the last digit...
    //         currentEnumeratedModeNotes[i] = currentEnumeratedModeNotes[i].replace(/\d+$/,match => parseInt(match) + 1);
    //     }
    // }

    // let enumeratedChords = []; // this is a 2d array
    // let enumeratedChord = [] // 1D array to be pushed to enumeratedEncodedChords when filled with 3 notes

    // // c,d,e,f,g,a,b, c,d,e,f,g,a,b
    // // now we must build the 7 triads from currentEnumeratedModeNotes
    // for (let i = 0 ; i < 7; i++){
    //     enumeratedChord = [currentEnumeratedModeNotes[i], currentEnumeratedModeNotes[i+2], currentEnumeratedModeNotes[i+4]]
    //     enumeratedChords.push(enumeratedChord)
    // }
    // // --- row 1 complete ---

    // // enumeratedChords[i] = [c3,e3,g3] ...

    // // for (let i = 0 ; i < 7; i++){
    // //     console.log('enumeratedChords['+i+']: ' + enumeratedChords[i])
    // // }
    
    // // now we build row 2 (and 3?)
    // for (let i = 7; i < 21; i++){
    //     for (let j = 0; j< referenceNotes.length; j++){
            
    //         if (chordEls[i].textContent.includes('#')){
    //             if (referenceNotes[j].slice(0, -1) == chordEls[i].textContent.slice(0,2).toLowerCase()){
    //                 referenceNotesIndex = j 
    //                 break
    //             }
    //         }else {
    //             if (referenceNotes[j].slice(0, -1) == chordEls[i].textContent.slice(0,1).toLowerCase()){
    //                 referenceNotesIndex = j
    //                 break
    //             }
    //         }    
    //     }

        

    //     if (chordEls[i].textContent.includes('dim')){
    //         enumeratedChord = [referenceNotes[referenceNotesIndex] ,                     //  USER SHOULD HAVE ABILITY TO + OR - AN OCTAVE 
    //                            referenceNotes[referenceNotesIndex + diminishedTemp[1]], 
    //                            referenceNotes[referenceNotesIndex + diminishedTemp[2]]]                        
    //     } else {
    //         if (chordEls[i].textContent.includes('m')) {
    //             console.log('chordEls['+i+'].textContent:'  + chordEls[i].textContent)
    //             enumeratedChord = [referenceNotes[referenceNotesIndex], 
    //                                referenceNotes[referenceNotesIndex +minorTemp[1]], 
    //                                referenceNotes[referenceNotesIndex +minorTemp[2]]]
    //             console.log('enumeratedChord:'  + enumeratedChord)

    //         } else { // it must be a major
    //             enumeratedChord = [referenceNotes[referenceNotesIndex], 
    //                                referenceNotes[referenceNotesIndex + majorTemp[1]], 
    //                                referenceNotes[referenceNotesIndex + majorTemp[2]]]
    //         }
    //     }
    //     enumeratedChords.push(enumeratedChord)
    // }

    // for (let k=0;k<enumeratedChords.length; k++){
    //    console.log("{{{" + k + ': '+ enumeratedChords[k])
    // }
    // let enumeratedEncodedChords = enumeratedChords.map(chord =>
    //     chord.map(note => note.replace("#", "%23")) );
    
    // for (let k=0;k<enumeratedEncodedChords.length; k++){
    //    console.log("---" + k + ': '+ enumeratedEncodedChords[k])
    // }

    sounds = {
        '1': chords[0].getArrayOfAudioObjects(),
        '2': chords[1].getArrayOfAudioObjects(),
        '3': chords[2].getArrayOfAudioObjects(),
        '4': chords[3].getArrayOfAudioObjects(),
        '5': chords[4].getArrayOfAudioObjects(),
        '6': chords[5].getArrayOfAudioObjects(),
        '7': chords[6].getArrayOfAudioObjects(),

        'q': chords[7].getArrayOfAudioObjects(),
        'w': chords[8].getArrayOfAudioObjects(),
        'e': chords[9].getArrayOfAudioObjects(),
        'r': chords[10].getArrayOfAudioObjects(),
        't': chords[11].getArrayOfAudioObjects(),
        'y': chords[12].getArrayOfAudioObjects(),
        'u': chords[13].getArrayOfAudioObjects(),

        'a': chords[14].getArrayOfAudioObjects(),
        's': chords[15].getArrayOfAudioObjects(),
        'd': chords[16].getArrayOfAudioObjects(),
        'f': chords[17].getArrayOfAudioObjects(),
        'g': chords[18].getArrayOfAudioObjects(),
        'h': chords[19].getArrayOfAudioObjects(),
        'j': chords[20].getArrayOfAudioObjects()
    }

}

// ----- Keyboard Stuff -----
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

// We will need to update this!  This will need to display the new user selected chords
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
