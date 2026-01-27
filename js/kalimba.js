
// saveToLocalStorage saves the value to localStorage under the given key
function saveToLocalStorage(key, value) {
    window.localStorage && window.localStorage.setItem(key, value);
}

// loadFromLocalStorage returns the value of the key from localStorage, or default_value if not found
function loadFromLocalStorage(key, default_value) {
    return window.localStorage && null !== window.localStorage.getItem(key) ? window.localStorage.getItem(key) : default_value;
}

// saveJSONToLocalStorage saves the value object to localStorage under the given key in JSON format
function saveJSONToLocalStorage(key, value) {
    if (window.localStorage) {
        try {
            const serializedValue = JSON.stringify(value);
            window.localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }
}

// loadJSONFromLocalStorage returns the JSON-parsed value of the key from localStorage, or default_value if not found
function loadJSONFromLocalStorage(key, default_value) {
    if (window.localStorage) {
        const serializedValue = window.localStorage.getItem(key);
        if (serializedValue !== null) {
            try {
                return JSON.parse(serializedValue);
            } catch (error) {
                console.error("Error loading from localStorage:", error);
                return default_value;
            }
        }
    }
    return default_value;
}

// // // // // //
//  CONSTANTS  //
// // // // // //

const Soundfonts = {
    'FluidR3_GM': {
        url: 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/kalimba-mp3.js',
        sourceUrl: 'https://gleitz.github.io/midi-js-soundfonts/',
        gain: 6,
    },
    'FatBoy': {
        url: 'https://gleitz.github.io/midi-js-soundfonts/FatBoy/kalimba-mp3.js',
        sourceUrl: 'https://gleitz.github.io/midi-js-soundfonts/',
        gain: 6,
    },
    'Keylimba': {
        url: '/soundfonts/keylimba/kalimba.mp3.js',
        sourceUrl: 'https://keylimba.carrd.co/',
        gain: 1,
    },
};

// Sorts the input array of keys into kalimba order
function sortArrayKalimba(notesArr) {
    let sortedArr = []
    for (let i = notesArr.length - notesArr.length % 2 - 1; i > 0; i -= 2) {
        sortedArr.push(notesArr[i]);
    }
    for (let i = 0; i < notesArr.length; i += 2) {
        sortedArr.push(notesArr[i]);
    }
    return sortedArr;
}

const allNotesSharp = [                                       "A0", "A#0", "B0",
    "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
    "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
    "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
    "C8"
];

// Object mapping keycodes to key names
const keyboardKeys = {
    192: "`", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 48: "0", 189: "-", 187: "=", 8: "←",
    9: "Tab", 81: "Q", 87: "W", 69: "E", 82: "R", 84: "T", 89: "Y", 85: "U", 73: "I", 79: "O", 80: "P", 219: "[", 221: "]", 220: "\\",
    20: "Caps", 65: "A", 83: "S", 68: "D", 70: "F", 71: "G", 72: "H", 74: "J", 75: "K", 76: "L", 186: ";", 222: "'", 13: "Enter",
    16: "Shift", 90: "Z", 88: "X", 67: "C", 86: "V", 66: "B", 78: "N", 77: "M", 188: ",", 190: ".", 191: "/",
    17: "Ctrl", 18: "Alt", 32: "Space", 0: " "
};

// Array of standard QWERTY keyboard keys with position and width information
const keyboardKeyInfo = [
    // Row 1
    [
        { code: 192, length: 1 }, { code: 49, length: 1 }, { code: 50, length: 1 }, { code: 51, length: 1 },
        { code: 52, length: 1 }, { code: 53, length: 1 }, { code: 54, length: 1 }, { code: 55, length: 1 },
        { code: 56, length: 1 }, { code: 57, length: 1 }, { code: 48, length: 1 }, { code: 189, length: 1 },
        { code: 187, length: 1 }, { code: 8, length: 2.5 }
    ],
    // Row 2
    [
        { code: 9, length: 1.5 }, { code: 81, length: 1 }, { code: 87, length: 1 }, { code: 69, length: 1 },
        { code: 82, length: 1 }, { code: 84, length: 1 }, { code: 89, length: 1 }, { code: 85, length: 1 },
        { code: 73, length: 1 }, { code: 79, length: 1 }, { code: 80, length: 1 }, { code: 219, length: 1 },
        { code: 221, length: 1 }, { code: 220, length: 2 }
    ],
    // Row 3
    [
        { code: 20, length: 2 }, { code: 65, length: 1 }, { code: 83, length: 1 }, { code: 68, length: 1 },
        { code: 70, length: 1 }, { code: 71, length: 1 }, { code: 72, length: 1 }, { code: 74, length: 1 },
        { code: 75, length: 1 }, { code: 76, length: 1 }, { code: 186, length: 1 }, { code: 222, length: 1.05 },
        { code: 13, length: 2.5 }
    ],
    // Row 4
    [
        { code: 16, length: 2.5 }, { code: 90, length: 1 }, { code: 88, length: 1 }, { code: 67, length: 1 },
        { code: 86, length: 1 }, { code: 66, length: 1 }, { code: 78, length: 1 }, { code: 77, length: 1 },
        { code: 188, length: 1 }, { code: 190, length: 1 }, { code: 191, length: 1 }, { code: 16, length: 3.1 }
    ],
    // Row 5
    [
        { code: 17, length: 1.5 }, { code: 0, length: 1 }, { code: 18, length: 1.5 }, { code: 32, length: 6.3 },
        { code: 18, length: 1.5 }, { code: 0, length: 1 }, { code: 0, length: 1 }, { code: 17, length: 2 }
    ]
];

// Keyboard control schemes, each array is a separate scheme storing keycodes in ascending note frequency order
const keyboardSchemes = [
    // B V N C M X < F H D J S K A U R I E O P W
    [66, 86, 78, 67, 77, 88, 188, 70, 72, 68, 74, 83, 75, 65, 85, 82, 73, 69, 79, 80, 87],

    // A S D F G H J K L
    [71, 70, 72, 68, 74, 83, 75, 65, 76],

    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, =
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187],
];

// Flag: is left mouse button pressed
var isMouseDown = false;

// Flag: is space bar pressed (used to raise octave when playing with keyboard)
var isSpacePressed = false;

// Flag: is recording in progress
var isRecording = false;

// Flag: is playback in progress
var isPlaying = false;

// Variable to store the recording
var sequence = [];

// Variable to store the timestamp of the last pressed key
var prevTime;

// Disable isMouseDown flag when left mouse button is released
$(document).on('mouseup', (event) => {
    // Check that the left mouse button was released (code 0)
    if (event.button === 0) {
        isMouseDown = false;
    }
});

// Enable isMouseDown flag when left mouse button is pressed
$(document).on('mousedown', (event) => {
    // Check that the left mouse button was pressed (code 0)
    if (event.button === 0) {
        isMouseDown = true;
    }
});

// Enable isSpacePressed flag when space bar is pressed
$(document).on('keydown', function (event) {
    if (event.keyCode == 32) {
        isSpacePressed = true;
        event.preventDefault(); // Prevent scrolling when space is pressed
    }
});

// Disable isSpacePressed flag when space bar is released
$(document).on('keyup', function (event) {
    if (event.keyCode == 32) {
        isSpacePressed = false;
    }
});


// Updates labels on the keys
function updateLabels() {
    switch (kalimba_online.labelType) {
        case "Number":
            $('.note-letter').hide();
            $('.note-number').show();
            break;
        case "Letter":
            $('.note-letter').show();
            $('.note-number').hide();
            break;
        case "Letter_number":
            $('.note-letter').show();
            $('.note-number').show();
            break;
        default:
            break;
    }
}


// // // // // // //
//  MAIN CLASS    //
// // // // // // //

class Kalimba_Online {
    _kalimba = {};

    get soundfont() { return loadFromLocalStorage("soundfont", "Keylimba"); }
    get currentSoundfont () { return Soundfonts[this.soundfont]; }
    get arrangement() { return loadFromLocalStorage("arrangement", "Alternating"); }
    get keysCount() { return loadFromLocalStorage("keysCount", 17); }
    get labelType() { return loadFromLocalStorage("labelType", "Number"); }
    get kalimba () { return this._kalimba; }
    get baseNote() { return parseInt(loadFromLocalStorage("baseNote", allNotesSharp.indexOf("C4"))); }
    get tunes() { return loadFromLocalStorage("tunes", Array(21).fill(0).join(',')).split(",").map(Number); }
    // get tunes() { return loadJSONFromLocalStorage("tunes", Array(21).fill(0)); } // Switching to JSON format breaks reading old settings
    get keyboardScheme () { return loadFromLocalStorage("keyboardScheme", 0); }
    get currentKeyboardScheme () { return keyboardSchemes[this.keyboardScheme]; }
    get volume() { return loadFromLocalStorage("volume", 75); }
    get recordedNotes() { return loadJSONFromLocalStorage("recordedNotes", Array(0)); }

    set soundfont(value) { saveToLocalStorage("soundfont", value); }
    set arrangement(value) { saveToLocalStorage("arrangement", value); }
    set keysCount(value) { saveToLocalStorage("keysCount", value); }
    set labelType(value) { saveToLocalStorage("labelType", value); }
    set kalimba(value) { this._kalimba = value; }
    set baseNote(value) { saveToLocalStorage("baseNote", value); }
    set tunes(value) { saveToLocalStorage("tunes", value); }
    // set tunes(value) { saveJSONToLocalStorage("tunes", value); }
    set keyboardScheme(value) { saveToLocalStorage("keyboardScheme", value); }
    set volume(value) { saveToLocalStorage("volume", value); }
    set recordedNotes(value) { saveJSONToLocalStorage("recordedNotes", value); }


    constructor() {
        this.loadSF();
    }

    // Flag indicating a touchscreen device
    ifTouchscreen = false;

    // Buffer variable storing the last keys pressed via touch
    lastTouchKeysPressed=[];

    // Load kalimba sounds
    _audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Loads sounds
    loadSF() {
        var KalimbaSF = Soundfont.instrument(this._audioContext, this.currentSoundfont.url);

        // Clear the field of previous keys
        $('.kalimba-container').empty();
        // Show loading spinner
        $('.kalimba-container').attr("aria-busy", true);

        // Update events
        KalimbaSF.then((k) => {
            // Get the new instrument
            this.kalimba = k;
            // Add keys to the screen
            this.addKeys();
            // Hide loading spinner
            $('.kalimba-container').removeAttr("aria-busy");
        });
    }

    // Returns an array of notes with current settings
    getNotes() {
        const majorIntervals = [2, 2, 1, 2, 2, 2, 1]; // tone-tone-semitone-tone-tone-tone-semitone
        const minorIntervals = [2, 1, 2, 2, 1, 2, 2]; // tone-semitone-tone-tone-semitone-tone-tone

        // Define an empty array to fill
        const notes = [];
        // Get the starting (base) note to count from
        var currentIndex = this.baseNote;
        // Loop through the number of keys
        for (let i = 0; i < this.keysCount; i++) {
            // Add the key at the current index, accounting for tuning
            notes.push(allNotesSharp[currentIndex + this.tunes[i]]);
            // Add tone/semitone to the index depending on the selected scale
            currentIndex += majorIntervals[i%7];
        }
        // Return the resulting array
        return notes;
    }


    // Adds keys to the form
    addKeys() {
        // Clear the field of previous keys
        $('.kalimba-container').empty();

        // Get the array of notes with current settings
        let notesArray = this.getNotes();

        // Sort the notes
        let sortedNotes = notesArray;

        switch (this.arrangement) {
            case "Ascending":
                sortedNotes = notesArray;
                break;
            case "Alternating":
                sortedNotes = sortArrayKalimba(notesArray);
                break;
            case "Descending":
                sortedNotes = notesArray.slice().reverse();
                break;
            default:
                sortedNotes = notesArray;
                break;
        }

        // Iterate through the array of keys to add to the field
        sortedNotes.forEach((note) => {
            // Get the key number, where C4 = 0, D4 = 1, etc.
            let num = notesArray.indexOf(note);
            // Convert numbers 8, 9, 10... to 1, 2, 3...
            let labelNum = num % 7 + 1;

            // Determine how many dots to draw above the number
            let dots = "";
            for (let i = 0; i < Math.floor(num / 7); i++) dots += ".";
            if (dots === "..") dots = ":";

            // Get the final key label
            let label = dots + "\n" + labelNum;

            let keys = notesArray.length;
            let x = notesArray.indexOf(note);

            // Calculate the key height
            // let keyHeight = 165 + 5*(keys - x); // Linear
            // let keyHeight = 315 - 5*(21-keys) - 30*Math.sqrt(x); // Power
            // let keyHeight = 280 - 4*(21-keys) - 25*Math.sqrt(x); // Power
            let keyHeight = 260 - 3*(21-keys) - 20*Math.sqrt(x); // Power

            let letter = note.replace(/#/g, '♯');

            // Get the keyboard key label by number
            let keyboardKey = this.currentKeyboardScheme[num];

            // Create the key
            const keyZone = $('<div>')
                .addClass('key-zone')
                .attr('note', note)
                .attr('notenumber', notesArray.indexOf(note))
                .css('height', keyHeight + 'px')
                .append(
                    $('<div>').addClass('key').append(
                        $('<div>').addClass('note-text').append(
                            $('<span>').addClass('note-keyboard-key').text(keyboardKeys[keyboardKey])
                        ).append(
                            $('<span>').addClass('note-number').text(label)
                        ).append(
                            $('<span>').addClass('note-letter').text(letter.slice(0, -1)).append(
                                $('<sub>').text(letter.slice(-1))
                            )
                        )
                    )
                );

            /* The following structure is generated inside keyZone:
                <div class="key-zone" note="{note}" style="height: {keyHeight + 'px'};">
                    <div class="key">
                        <div class="note-text">
                            <span class="note-keyboard-key">{keyboardKeys[keyboardKey]}</span>
                            <span class="note-number">{label}</span>
                            <span class="note-letter">{letter.slice(0, -1)}<sub>{letter.slice(-1)}</sub></span>
                        </div>
                    </div>
                </div>
            */

            // Event: Single mouse click on a key
            keyZone.on('mousedown', () => {
                // If user has a touchscreen, sound is played in a different event
                if (!this.ifTouchscreen) {
                    this.playSound(note);
                }
            });

            // Event: Mouse held down and dragged across keys
            keyZone.on('mouseover', (event) => {
                // If mouse is pressed and cursor is inside the key (without the second check, the event fires an extra time)
                if (isMouseDown && !$(event.relatedTarget).closest(keyZone).length) {
                    this.playSound(note);
                }
            });

            // Event: Single finger tap on a key
            keyZone.on('touchstart', (event) => {
                // If this event fired, the user has a touchscreen
                this.ifTouchscreen = true;

                // let note = $(this).attr('note');
                this.playSound(note);
                // keyShake($('.key', this));

                // Check the last screen touch
                let key = $(event.touches[event.touches.length - 1].target);
                // Find the parent element until it has a note attribute
                let i = 0;
                while (key.attr('note') === undefined && i<2) {
                    key = key.parent();
                    i++;
                }
                // Get the note from the attribute and store it
                this.lastTouchKeysPressed[event.touches.length - 1] = key.attr('note');

            });

            // Event: Finger held down and dragged across keys
            keyZone.on('touchmove', (event) => {
                for (let j = 0; j < event.touches.length; j++) {
                    var touch = event.touches[j]; // Get touch information
                    var key = $(document.elementFromPoint(touch.clientX, touch.clientY));

                    let i = 0;
                    while (key.attr('note') === undefined && i<2) {
                        key = key.parent();
                        i++;
                        // if (i>2) console.log(i);
                    }
                    let note = key.attr('note');

                    if (note !== undefined && !this.lastTouchKeysPressed.includes(note)) {
                        this.lastTouchKeysPressed[j]=note;
                        this.playSound(note);
                    }
                }
            });

            // Add the created key to the field
            $('.kalimba-container').append(keyZone);
        });

        // Update labels
        updateLabels();
    }

    // Plays a sound
    playSound(note, options = { play: true, animate: true, record: true }) {

        // Play sound if the play flag is set to true
        if (options.play) {
            // Calculate volume on a logarithmic scale (subjectively worse than linear):
            // let currentVolume = this.currentSoundfont.gain * Math.log10(1 + 9 * this.volume / 100);
            // Calculate volume on a linear scale:
            let currentVolume = this.currentSoundfont.gain * this.volume / 100;
            // Play sound at the current volume
            this._kalimba.play(note, 0, { gain: currentVolume });
        }

        // Run animation if the animate flag is set to true
        if (options.animate) {
            this.keyShake($(`.key-zone[note='${note}'] .key`));
        }
        console.log('Pressed \'' + note + '\' (' + allNotesSharp.indexOf(note) + ')');

        // Record the pressed note if the record and isRecording flags are set to true
        if (options.record && isRecording) {
            // If this is the first note pressed, store the press time
            if (sequence.length == 0) prevTime = Date.now();
            // Store the current time
            var currentTime = Date.now();
            // Calculate time elapsed since the previous note press
            var timeElapsed = currentTime - prevTime;
            // Add the note to the notes array
            sequence.push({ soundId: note, time: timeElapsed });
            console.log('[REC] Recorded \'' + note + '\' with a duration of ' + timeElapsed + 'ms');
            // Update the last key press time to the current time
            prevTime = currentTime;
        }
    }

    // Plays the key shake animation
    keyShake(keyObj) {
        const el = keyObj[0];
        el.classList.remove('key-click');
        void el.offsetWidth; // Force reflow so the browser registers the removal
        el.classList.add('key-click');
    }
}

const kalimba_online = new Kalimba_Online();


// // // // // // // // // //
//  FUNCTIONS AND METHODS  //
// // // // // // // // // //

// updateKeyboardSchemes updates keyboard key labels on the kalimba keys
function updateKeyboardSchemes() {
    $(".key-zone").each(function(){
        var notenumberValue = $(this).attr("notenumber");
        // Get the keyboard key label by number
        let keyboardKey = kalimba_online.currentKeyboardScheme[notenumberValue];

        if (keyboardKey !== undefined) {
            $(this).find(".note-keyboard-key").text(keyboardKeys[keyboardKey]);
        } else {
            $(this).find(".note-keyboard-key").empty();
        }
    });
}

// updateTunes updates the controls that configure keys (key tuning)
function updateTunes() {
    // Clear the field
    $('.tune-field').empty();

    // Get the array of keys with current settings
    let notesArray = kalimba_online.getNotes();
    // Iterate through the keys
    notesArray.forEach((note, index) => {
        let letter = note.replace(/#/g, '♯');
        $('<label>', {
            'class': 'tune-label',
            'for': 'range-tune-'+index
        }).append(
            $('<input>', {
                'type': 'range',
                'min': '-1',
                'max': '1',
                'value': kalimba_online.tunes[index],
                'id': 'range-tune-' + index,
                'notenumber': index,
                'orient': 'vertical'
            }),
            $('<span>', {
                'id': 'range-tune-value-' + index,
            }).append(
                $('<small>').text(letter.slice(0, -1)).append(
                    $('<sub>').text(letter.slice(-1))
                )
            )
        ).appendTo('.tune-field');
    });

    // Event on key tuning slider change
    $('input', '.tune-label').on('input', function () {
        // Get the index of the changed key and the new value
        let notenumber = parseInt($(this).attr('notenumber'));
        let tune = parseInt($(this).val());

        // Get the current settings array, modify it and save it back
        let tunes = kalimba_online.tunes;
        tunes[notenumber] = tune;
        kalimba_online.tunes = tunes;

        // Recreate the keys
        kalimba_online.addKeys();

        // Get the current list of notes
        let notesArray = kalimba_online.getNotes();
        // Find the note in the array by its number and replace # with ♯
        let letter = notesArray[notenumber].replace(/#/g, '♯');

        // Update the key name in the key settings
        $('#range-tune-value-' + notenumber).empty().append(
            $('<small>').text(letter.slice(0, -1)).append(
                $('<sub>').text(letter.slice(-1))
            )
        );
        // Play the sound of the changed key
        kalimba_online.playSound(notesArray[notenumber], { play: true, animate: true, record: false });
    });
}

// showKeyboardScheme highlights the keys of the selected scheme on the keyboard
function showKeyboardScheme(keyMapScheme) {
    // Iterate through all keys on the keyboard
    $('.kb_key', '.kb_container').each(function (index, key) {
        let keycode = $(key).data('keycode');
        // If the key is in the specified scheme, add the class; otherwise remove it
        if (keyMapScheme.includes(keycode)) {
            $(key).addClass('used');
        } else {
            $(key).removeClass('used');
        }
    });
}

// // // // // // // // //
//  AFTER PAGE RENDER   //
// // // // // // // // //

$(document).ready(function () {

    // Record button click event
    $('#recordButton').click(function() {
        if (isRecording) {
            // If recording was in progress - stop it
            isRecording = false;

            // Change button icons
            $("#icon-record").show();
            $("#icon-spin").hide();

            // If at least one note was recorded
            if (sequence.length > 0) {
                // Add an empty note with a pause between the last pressed key and recording stop
                var timeElapsed = Date.now() - prevTime;
                sequence.push({ soundId: null, time: timeElapsed });

                // Enable the playback button
                $("#playButton").attr("disabled", null);

                // Calculate the total recording duration in seconds
                let duration = 0;
                for (let i = 0; i < sequence.length; i++) {
                    duration += sequence[i].time;
                }
                duration = duration/1000;
                // Set the animation duration for the circular progress bar
                $("#playButton .loader").css('--anim-load-duration', duration+"s");

                // Save the recording to localStorage
                kalimba_online.recordedNotes = sequence;

                // Log that recording has stopped
                console.log('[REC] Recording stopped. Total duration: ' + duration + 's');
                console.log('[REC] Recorded sequence:', sequence);
            }
        } else {
            // If recording was NOT in progress - start recording
            isRecording = true;

            // Log that recording has started
            console.log('[REC] Recording started');

            // Create an empty array for the recorded sequence
            sequence = [];

            // Change button icons
            $("#icon-record").hide();
            $("#icon-spin").show();

            // Disable the playback button
            $("#playButton").attr("disabled", "");
        }
    });

    // Play button click event
    $('#playButton').click(function() {
        if (isPlaying) {
            // If playback was in progress - stop it
            isPlaying = false;

            // Change button icons
            $("#icon-play").show();
            $("#icon-pause").hide();
            $("#icon-load").hide();

            // Enable the record button
            $("#recordButton").attr("disabled", null);
        } else {
            // If playback was NOT in progress - start playback
            isPlaying = true;
            let index = 0;

            // Declare a recursive function that plays the current note and calls itself with the next note after a delay of sequence[index].time
            function playNextNote() {
                // Stop playback if the flag is disabled
                if (!isPlaying) return;
                // Play the current note with options: no animation and no recording
                if (sequence[index].soundId != null) kalimba_online.playSound(sequence[index].soundId, { play: true, animate: false, record: false });
                // Increment the index (and loop)
                index = (index + 1) % sequence.length;
                // Play the next note after a pause
                setTimeout(playNextNote, sequence[index].time);
            }
            // Start the recursive function
            playNextNote();

            // Change button icons
            $("#icon-play").hide();
            $("#icon-pause").show();
            $("#icon-load").show();

            // Disable the record button
            $("#recordButton").attr("disabled", "");
        }
    });

    // Check if there is a recording in localStorage
    if (kalimba_online.recordedNotes.length > 0) {
        // Get the recording from localStorage
        sequence = kalimba_online.recordedNotes;

        // Enable the playback button
        $("#playButton").attr("disabled", null);

        // Calculate the total recording duration in seconds
        let duration = 0;
        for (let i = 0; i < sequence.length; i++) {
            duration += sequence[i].time;
        }
        duration = duration/1000;
        // Set the animation duration for the circular progress bar
        $("#playButton .loader").css('--anim-load-duration', duration+"s");
    }

    // Display volume settings on the page (from localStorage)
    $('#range-volume').val(kalimba_online.volume);
    $('#range-volume-value').text(kalimba_online.volume);
    // Volume change event
    $('#range-volume').on('input', function () {
        kalimba_online.volume = $('#range-volume').val();
        $('#range-volume-value').text(kalimba_online.volume);
        kalimba_online.addKeys();
        updateTunes();
    });

    // Display the key count on the page (from localStorage)
    $('#range-keys').val(kalimba_online.keysCount);
    $('#range-keys-value').text(kalimba_online.keysCount);
    // Key count change event
    $('#range-keys').on('input', function () {
        kalimba_online.keysCount = $('#range-keys').val();
        $('#range-keys-value').text(kalimba_online.keysCount);
        kalimba_online.addKeys();
        updateTunes();
    });

    updateTunes();

    // Display the base note on the page (from localStorage)
    $('#range-baseNote').val(kalimba_online.baseNote);
    // $('#range-baseNote-value').text(allNotesSharp[kalimba_online.baseNote]);
    let letter = allNotesSharp[kalimba_online.baseNote].replace(/#/g, '♯');
    $('#range-baseNote-value').empty().append(
        $('<span>').text(letter.slice(0, -1)).append(
            $('<sub>').text(letter.slice(-1))
        )
    );

    // Base note change event
    $('#range-baseNote').on('input', function () {
        kalimba_online.baseNote = $('#range-baseNote').val();
        // $('#range-baseNote-value').text(allNotesSharp[kalimba_online.baseNote]);

        let letter = allNotesSharp[kalimba_online.baseNote].replace(/#/g, '♯');
        $('#range-baseNote-value').empty().append(
            $('<span>').text(letter.slice(0, -1)).append(
                $('<sub>').text(letter.slice(-1))
            )
        );
        kalimba_online.addKeys();
        kalimba_online.playSound(allNotesSharp[kalimba_online.baseNote], { play: true, animate: false, record: false });
        updateTunes();
    });

    // Display the key arrangement on the page (from localStorage)
    $("input#"+kalimba_online.arrangement).prop('checked', true);
    // Arrangement change event
    $('input', '#arrangement-radio-list').on("click", function () {
        kalimba_online.arrangement = $('input:checked', '#arrangement-radio-list').attr("id");
        kalimba_online.addKeys();
    });

    // Display the label type on the page (from localStorage)
    $("input#" + kalimba_online.labelType).prop('checked', true);
    // Label type change event
    $('input', '#labeltype-radio-list').on("click", function () {
        kalimba_online.labelType = $('input:checked', '#labeltype-radio-list').attr("id");
        updateLabels();
    });


    // Display the soundfont on the page (from localStorage)
    $('#soundfonts').val(kalimba_online.soundfont);
    $("#soundfonts_source").attr("href", kalimba_online.currentSoundfont.sourceUrl);
    // Soundfont change event
    $('#soundfonts').change(function () {
        kalimba_online.soundfont = $(this).val();
        kalimba_online.loadSF();
        $("#soundfonts_source").attr("href", kalimba_online.currentSoundfont.sourceUrl);
    });

    // Keydown event handler
    $(document).on('keydown', function (event) {

        // Check if there is a note for the pressed key
        if (kalimba_online.currentKeyboardScheme.includes(event.keyCode)) {
            // Get the pressed key number and notes array
            let keyNum = kalimba_online.currentKeyboardScheme.indexOf(event.keyCode);
            let notesArray = kalimba_online.getNotes();
            // If space is pressed, raise the octave
            if (isSpacePressed) keyNum +=7;
            // Play the sound
            if (notesArray.hasOwnProperty(keyNum)) kalimba_online.playSound(notesArray[keyNum]);
        }
    });


    // Add the keyboard to the page
    // Iterate through keyboard rows
    keyboardKeyInfo.forEach(row => {
        const rowElement = $('<div class="kb_row"></div>');
        // Iterate through keys in the row
        row.forEach(key => {
            // Create the key element and add it to the page
            $('<div class="kb_key"></div>')
                .text(keyboardKeys[key.code])
                .css('flex-grow', key.length)
                .attr("data-keycode", key.code)
                .appendTo(rowElement);
        });
        // Add the created row to the keyboard container on the page
        $('#keyboard_container').append(rowElement);
    });

    // Display keyboard control schemes stored in the keyboardSchemes array
    keyboardSchemes.forEach(function(_key, index) {
        $('<label style="padding-right: 1.4em;">')
            .appendTo($('#keyboard_schemes'))
            .append(
                $('<input type="radio" name="kb_scheme">')
                    .attr('data-schemeid', index)
                    .prop('checked', index == kalimba_online.keyboardScheme)
            )
            .append(' ')
            .append($('<span>').text(index + 1));
    });
    // Display the current scheme on the keyboard
    showKeyboardScheme(kalimba_online.currentKeyboardScheme);
    // Mark the current scheme as selected
    $("input#"+kalimba_online.currentKeyboardScheme).prop('checked', true);
    // Create event for scheme change
    $('input', '#keyboard_control').on("click", function () {
        kalimba_online.keyboardScheme = $('input:checked', '#keyboard_control').data("schemeid");
        showKeyboardScheme(kalimba_online.currentKeyboardScheme);
        updateKeyboardSchemes();
    });
});
