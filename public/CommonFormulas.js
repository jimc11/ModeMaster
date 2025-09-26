
export const commonFormulas = {

    'allNumberedEncodedNotes' : [ 'c3','c%233','d3','d%233','e3','f3','f%233','g3','g%233','a3','a%233','b3', 'c4','c%234','d4','d%234','e4','f4','f%234','g4','g%234','a4','a%234','b4', 'c5','c%235','d5','d%235','e5','f5','f%235','g5','g%235','a5','a%235','b5', ],
    'allNumberedNotes' : [ 'c3','c#3','d3','d#3','e3','f3','f#3','g3','g#3','a3','a#3','b3', 'c4','c#4','d4','d#4','e4','f4','f#4','g4','g#4','a4','a#4','b4', 'c5','c#5','d5','d#5','e5','f5','f#5','g5','g#5','a5','a#5','b5', ],

    'notes' : [ 'c','c#','d','d#','e','f','f#','g','g#','a','a#','b', 'c','c#','d','d#','e','f','f#','g','g#','a','a#','b' ],

    'modeSteps' : [
        [0, 2, 4, 5, 7, 9, 11],  // Ionian 0
        [0, 2, 3, 5, 7, 9, 10],  // Dorian 1
        [0, 1, 3, 5, 7, 8, 10],  // Phrygian 2 
        [0, 2, 4, 6, 7, 9, 11],  // Lydian 3
        [0, 2, 4, 5, 7, 9, 10],  // Mixolydian 4
        [0, 2, 3, 5, 7, 8, 10],  // Aeolian 5
        [0, 1, 3, 5, 6, 8, 10]   // Locrian 6
    ],

    'modeChords' : [
        ['major','minor','minor','major','major','minor','diminished',], // Ionian 0
        ['minor','minor','major','major','minor','diminished','major',], // Dorian 1
        ['minor','major','major','minor','diminished','major','minor',], // Phrygian 2
        ['major','major','minor','diminished','major','minor','minor',], // Lydian 3
        ['major','minor','diminished','major','minor','minor','major',], // Mixolydian 4
        ['minor','diminished','major','minor','minor','major','major',], // Aoelian 5
        ['diminished','major','minor','minor','major','major','minor',], // Locrian 6
    ],

    // --- CHORDS ---
    // Major
    'major' : [0, 4 ,7],// 1-3-5
    'major_flat6' : [0, 4, 7, 8], // R 3 5 ♭6
    'major6' : [0, 4, 7, 9], // R 3 5 6
    'Δ7' : [0, 4, 7, 10], // R 3 5 ♭7
    'major7' : [0, 4, 7, 11], // R 3 5 7
    'Δ7add6' : [0, 4, 7, 9, 10], // R 3 5 6 ♭7
    'Δ7flat5' : [0, 4, 6, 10], // R 3 ♭5 ♭7
    'maj7flat5' : [0, 4, 6, 11], // R 3 ♭5 7
    'Δ9' : [0, 4, 7, 10, 14], // R 3 5 ♭7 9
    'major9' : [0, 4, 7, 11, 14], // R 3 5 7 9
    'Δ7flat9' : [0, 4, 7, 10, 13], // R 3 5 ♭7 ♭9
    'Δ7sharp9' : [0, 4, 7, 10, 15], // R 3 5 ♭7 ♯9
    'major_flat9' : [0, 4, 7, 11, 13], // R 3 5 7 ♭9
    'major_sharp9' : [0, 4, 7, 11, 15], // R 3 5 7 ♯9
    '6add9' : [0, 4, 7, 9, 14], // R 3 5 6 9
    'Δ11' : [0, 4, 7, 10, 14, 17], // R 3 5 ♭7 9 11
    'Δ7sharp11' : [0, 4, 7, 10, 14, 18], // R 3 5 ♭7 9 ♯11
    'major11' : [0, 4, 7, 11, 14, 17], // R 3 5 7 9 11
    'major_sharp11' : [0, 4, 7, 11, 14, 18], // R 3 5 7 9 ♯11
    'Δ13' : [0, 4, 7, 10, 14, 17, 21], // R 3 5 ♭7 9 11 13
    'Δ13sharp11' : [0, 4, 7, 10, 14, 18, 21], // R 3 5 ♭7 9 ♯11 13
    'major13' : [0, 4, 7, 11, 14, 17, 21],// R 3 5 7 9 11 13
    'major13sharp11' : [0, 4, 7, 11, 14, 18, 21], // R 3 5 7 9 ♯11 13

    //minor
    'minor' : [0, 3, 7], // 1-♭3-5
    'minor6' : [0, 3, 7, 9], // R ♭3 5 6
    'minor_flat6' : [0, 3, 7, 8], // R ♭3 5 ♭6
    'minor7' : [0, 3, 7, 10], // R ♭3 5 ♭7
    'minor_major7' : [0, 3, 7, 11], // R ♭3 5 7
    'minor7flat9' : [0, 3, 7, 10, 13], // R ♭3 5 ♭7 ♭9
    'minor9' : [0, 3, 7, 10, 14], // R ♭3 5 ♭7 9
    'minor_major_flat9' : [0, 3, 7, 11, 13], // R ♭3 5 7 ♭9
    'minor_major9' : [0, 3, 7, 11, 14], // R ♭3 5 7 9
    'minor6add9' : [0, 3, 7, 9, 14], // R ♭3 5 6 9
    'minor11' : [0, 3, 7, 10, 14, 17], // R ♭3 5 ♭7 9 11
    'minor7sharp11' : [0, 3, 7, 10, 14, 18], // R ♭3 5 ♭7 9 ♯11
    'minor_major11' : [0, 3, 7, 11, 14, 17], // R ♭3 5 7 9 11
    'minor_major_sharp11' : [0, 3, 7, 11, 14, 18], // R ♭3 5 7 9 ♯11
    'minor13' : [0, 3, 7, 10, 14, 17, 21],// R ♭3 5 ♭7 9 11 13
    'minor13sharp11' : [0, 3, 7, 10, 14, 18, 21], // R ♭3 5 ♭7 9 ♯11 13
    'minor_major13' : [0, 3, 7, 11, 14, 17, 21], // R ♭3 5 7 9 11 13
    'minor_major13sharp11' : [0, 3, 7, 11, 14, 18, 21], // R ♭3 5 7 9 ♯11 13

    //Augmented
    'augmented' : [0, 4, 8], // R 3 ♯5
    'Δ7sharp5' : [0, 4, 8, 10], // R 3 ♯5 ♭7
    'maj7sharp5' : [0, 4, 8, 11], // R 3 ♯5 7

    //Diminished
    'diminished' : [0, 3, 6], // R ♭3 ♭5
    'diminished7' : [0, 3, 6, 9], // R ♭3 ♭5 ♭♭7
    'half_diminished7' : [0, 3, 6, 10], // R ♭3 ♭5 ♭7

    //suspended
    'sus2' : [0, 2, 7], // 1-2-5
    'sus4' : [0, 2, 5], // 1-4-5
    'sus2sus4' : [0, 2, 5, 7], // 1-2-4-5
    'Δ7sus2' : [0, 2, 7, 10], // R 2 5 ♭7
    'Δ7sus4' : [0, 5, 7, 10], // R 4 5 ♭7
    'maj7sus2' : [0, 2, 7, 11], // R 2 5 7
    'maj7sus4' : [0, 5, 7, 11], // R 4 5 7

   




}