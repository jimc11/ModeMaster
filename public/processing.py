print("---start---")

notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']

modeSteps = [
    [0, 2, 4, 5, 7, 9, 11],  # Ionian 0
    [0, 2, 3, 5, 7, 9, 10],  # Dorian 1
    [0, 1, 3, 5, 7, 8, 10],  # Phrygian 2 
    [0, 2, 4, 6, 7, 9, 11],  # Lydian 3
    [0, 2, 4, 5, 7, 9, 10],  # Mixolydian 4
    [0, 2, 3, 5, 7, 8, 10],  # Aeolian 5
    [0, 1, 3, 5, 6, 8, 10]   # Locrian 6
]

def split_list_at_value(input_list, split_value):
    result = []
    current_sublist = []
    for item in input_list:
        if item == split_value:
            if current_sublist:  # Add the accumulated sublist if not empty
                result.append(current_sublist)
            current_sublist = []  # Reset for the next sublist
        else:
            current_sublist.append(item)
    if current_sublist:  # Add the last sublist if it's not empty
        result.append(current_sublist)
    return result

def generate_parallel_mode(modeNumber, tonic):
    # Function body (indented code)
    recenteredNotes = [tonic]
    
    for counter, letter in enumerate(split_list_at_value(notes, tonic)[1]): 
        recenteredNotes.append(letter)
    
    for counter, letter in enumerate(split_list_at_value(notes, tonic)[0]): 
        recenteredNotes.append(letter)
    
    #print("recenteredNotes" , recenteredNotes)
    
    stepPattern = modeSteps[modeNumber-1]
    #print("stepPattern" , stepPattern)

    modeReturned = []

    for i in range(7):  
        modeReturned.append(recenteredNotes[stepPattern[i]])
    
    #print("modeReturned" , modeReturned)
    # Perform operations
    return modeReturned  # Optional: return a value

def generateDiatonicChords(input_mode):
    chords = [[],[],[],[],[],[]]()
    for i in range(7): for j in range(3): 
    #print('index:' , (i+j*2) % 7 ) 
    # #print('value:', input_mode[(i+j*2) % 7]) 
    chords[i].append(input_mode[(i+j*2) % 7]) 
    
    return chords 
# ----- MAIN ----- 
mode = generate_parallel_mode(3, 'C') 
chords = generateDiatonicChords(mode) 
print(mode) 
print(chords) 
print("---end---")