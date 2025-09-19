//     // base chords?
export const commonFormulas = {

    'allNumberedEncodedNotes' : [ 'c3','c%233','d3','d%233','e3','f3','f%233','g3','g%233','a3','a%233','b3', 'c4','c%234','d4','d%234','e4','f4','f%234','g4','g%234','a4','a%234','b4', 'c5','c%235','d5','d%235','e5','f5','f%235','g5','g%235','a5','a%235','b5', ],

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


    'major' : [0, 4 ,7],// 1-3-5
    'minor' : [0, 3, 7], // 1-♭3-5
    'diminished' : [0, 3, 6], // 1-♭3-♭5
    'sus2' :   [0, 2, 7], // 1-2-5
    'sus4' :   [0, 2, 5], // 1-4-5
    'sus2sus4' :   [0, 2, 5, 7], // 1-2-4-5

    // modifiers
    'add6' : [0, 4, 7, 9], // 1-3-5-6 (aka X6)
    'add9' : [0, 4, 7, 14],  // 1-3-5-9
    'add11' : [0, 4, 7, 17], // 1-3-5-11
    'add13' : [0, 4, 7, 21], // 1-3-5-13

    'madd6' : [0, 3, 7, 9], // 1-3-5-6 (aka X6)
    'madd9' : [0, 3, 7, 14],  // 1-3-5-9
    'madd11' : [0, 3, 7, 17], // 1-3-5-11
    'madd13' : [0, 3, 7, 21], // 1-3-5-13

    // dominant family
    'X7' : [0, 4, 7, 10], // 1-3-5-♭7
    'X9' : [0, 4, 7, 10, 14], // 1-3-5-♭7
    'X11' : [0, 4, 7, 10, 14, 17], // 1-3-5-♭7
    'X13' : [0, 4, 7, 10, 14, 17, 21], // 1-3-5-♭7

    // majX
    'maj7' : [0, 4, 7, 11], // 1-3-5-7 aka  C△ aka C dominant 7
    'maj9' : [0, 4, 7, 11, 14], // 1-3-5-b7-9
    'maj11' : [0, 4, 7, 11, 14, 17], // 1-3-5-b7-9-11
    'maj13' : [0, 4, 7, 11, 14, 17, 21], // 1-3-5-b7-9-11-13

    // mX
    'm7' : [0, 3, 7, 10], // 1-♭3-5-♭7
    'm9' : [0, 3, 7, 10, 14], // 1-♭3-5-♭7-9
    'm11' : [0, 3, 7, 10, 14, 17], // 1-♭3-5-♭7-9-11
    'm13' : [0, 3, 7, 10, 14, 17, 21], // 1-♭3-5-♭7-9-13

    // minor major 7
    'minormajor7' : [0, 3, 7, 11] // 1-♭3-5-7
}