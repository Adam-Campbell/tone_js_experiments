window.transport = Tone.Transport;
Tone.Transport.bpm.value = 270;

document.getElementById('start-button').addEventListener('click', () => { 
    Tone.Transport.start()
});
document.getElementById('stop-button').addEventListener('click', () => { 
    Tone.Transport.stop(); 
});


const distortion = new Tone.Distortion(0.6);
const tremolo = new Tone.Tremolo().start();
const chorus = new Tone.Chorus();
const whammy = new Tone.PitchShift(12);
chorus.frequency = 2.5;

const square = new Tone.PolySynth(6, Tone.Synth)
square.set({
    oscillator : {
        type : 'amsquare',
        modulationType : 'triangle',
        harmonicity: 2
    }
});
window.square = square;

const saw = new Tone.PolySynth(6, Tone.Synth).chain(Tone.Master);
saw.set({
    oscillator : {
        type : 'fatsawtooth',
        modulationType : 'triangle',
        modulationIndex : 3,
        harmonicity: 2
    }
});
window.saw = saw;


const squareCB = function(time, value) {
    square.triggerAttackRelease(value.note, value.duration, time);
}


const chord1a = { time: "0:0:0", note: 'C4', duration: '2m' };
const chord1b = { time: "0:0:0", note: 'E4', duration: '2m' };
const chord1c = { time: "0:0:0", note: 'G4', duration: '2m' };
const chord1d = { time: "0:0:0", note: 'B4', duration: '2m' };
const chord2a = { time: "2:0:0", note: 'A4', duration: '2m' };
const chord2b = { time: "2:0:0", note: 'C4', duration: '2m' };
const chord2c = { time: "2:0:0", note: 'E4', duration: '2m' };
const chord2d = { time: "2:0:0", note: 'G4', duration: '2m' };
const chord3a = { time: "4:0:0", note: 'F3', duration: '2m' };
const chord3b = { time: "4:0:0", note: 'A4', duration: '2m' };
const chord3c = { time: "4:0:0", note: 'C4', duration: '2m' };
const chord3d = { time: "4:0:0", note: 'D4', duration: '2m' };
const chord4a = { time: "6:0:0", note: 'G3', duration: '2m' };
const chord4b = { time: "6:0:0", note: 'B4', duration: '2m' };
const chord4c = { time: "6:0:0", note: 'D4', duration: '2m' };
const chord4d = { time: "6:0:0", note: 'F4', duration: '2m' };

// const bus = new Bus();
// const sawChannel = new Channel(saw);
// const squareChannel = new Channel(square);
// const chordSection = new Section();

// bus.addChannel(sawChannel);
// bus.addChannel(squareChannel);
// squareChannel.addSection(chordSection, "0:0:0");

// chordSection.addNote(chord1a);
// chordSection.addNote(chord1b);
// chordSection.addNote(chord1c);
// chordSection.addNote(chord1d);
// chordSection.addNote(chord2a);
// chordSection.addNote(chord2b);
// chordSection.addNote(chord2c);
// chordSection.addNote(chord2d);
// chordSection.addNote(chord3a);
// chordSection.addNote(chord3b);
// chordSection.addNote(chord3c);
// chordSection.addNote(chord3d);
// chordSection.addNote(chord4a);
// chordSection.addNote(chord4b);
// chordSection.addNote(chord4c);
// chordSection.addNote(chord4d);

// squareChannel.addToEffectChain(chorus, 0);
// squareChannel.addToEffectChain(tremolo, 1);
// sawChannel.addToEffectChain(distortion, 0);


// const synthFactory = new SynthFactory();
// const serializer = new Serializer();
// const stateBuilder = new StateBuilder();

const engine = new AudioEngine();





