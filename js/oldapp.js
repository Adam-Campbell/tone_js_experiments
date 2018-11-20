//const synth = new Tone.Synth().toMaster();
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
synth.set({
    oscillator : {
        type : 'amsquare',
        modulationType : 'triangle',
        modulationIndex : 3,
        harmonicity: 2
    },
    // envelope : {
    //     attack : 0.001,
    //   decay : 0.1,
    //   sustain: 0.1,
    //   release: 0.1
    // }
});
window.synth = synth;
window.transport = Tone.Transport;
Tone.Transport.bpm.value = 135;


const plucky = new Tone.Synth().toMaster();
plucky.set({
    oscillator : {
        type : 'fmsine',
        // modulationType : 'triangle',
        // modulationIndex : 3,
        // harmonicity: 2
    },
    // envelope : {
    //     attack : '32n',
    //   decay : 0.1,
    //   sustain: 0.3,
    //   release: 0.1
    // }
    envelope : {
        attack : 0.001,
        decay : 0.1,
        sustain: 0.1,
        release: 0.1
    }
});

/*
These notes are tied to the main audio context timer, 
this timer starts as soon as the window loads.
*/

// synth.triggerAttackRelease('C5', '8n', "1:0")
// synth.triggerAttackRelease('G4', '8n', "1:1")
// synth.triggerAttackRelease('A4', '8n', "1:2")
// synth.triggerAttackRelease('F4', '8n', "1:3")






/*
These notes are scheduled on the tone transport object, which can be paused,
restarted, is seekable etc. Each of these notes only plays once. 
*/

// Tone.Transport.schedule(function(time){
// 	synth.triggerAttackRelease('C5', '4n');
// }, "0:0:0");
// Tone.Transport.schedule(function(time){
// 	synth.triggerAttackRelease('G4', '4n');
// }, "0:1:0");
// Tone.Transport.schedule(function(time){
// 	synth.triggerAttackRelease('A4', '4n');
// }, "0:2:0");
// Tone.Transport.schedule(function(time){
// 	synth.triggerAttackRelease('F4', '4n');
// }, "0:3:0");









/*
These notes are scheduled on the transport timeline, but they repeat indefinetely. 
*/

// Tone.Transport.scheduleRepeat(function(time){
// 	synth.triggerAttackRelease('C5', '4n');
// }, "1m", "0:0:0");
// Tone.Transport.scheduleRepeat(function(time){
// 	synth.triggerAttackRelease('G4', '4n');
// }, "1m", "0:1:0");
// Tone.Transport.scheduleRepeat(function(time){
// 	synth.triggerAttackRelease('A4', '4n');
// }, "1m", "0:2:0");
// Tone.Transport.scheduleRepeat(function(time){
// 	synth.triggerAttackRelease('F4', '4n');
// }, "1m", "0:3:0");



/*
These notes are scheduled on the transport timeline, but utilise the 
Tone.Loop abstraction. 
*/

// const loop1 = new Tone.Loop(time => {
//     synth.triggerAttackRelease('C5', '4n');
// }, '1m').start("0:0:0");
// const loop2 = new Tone.Loop(time => {
//     synth.triggerAttackRelease('G4', '4n');
// }, '1m').start("0:1:0");
// const loop3 = new Tone.Loop(time => {
//     synth.triggerAttackRelease('A4', '4n');
// }, '1m').start("0:2:0");
// const loop4 = new Tone.Loop(time => {
//     synth.triggerAttackRelease('F4', '4n');
// }, '1m').start("0:3:0");


/*
Event provides an abstraction over the schedule api. The first argument is the callback
function to be called at the time specified by the start() method, and the second 
argument is a note value to pass in to the callback function.
*/

// const firstChord = new Tone.Event(function(time, note) {
//     synth.triggerAttackRelease(note, '2m');
// }, ['C4', 'E4', 'G4', 'B4']).start("0:0:0");

// const secondChord = new Tone.Event(function(time, note) {
//     synth.triggerAttackRelease(note, '2m');
// }, ['A4', 'C4', 'E4', 'G4']).start("2:0:0");

// const thirdChord = new Tone.Event(function(time, note) {
//     synth.triggerAttackRelease(note, '2m');
// }, ['F3', 'A4', 'C4', 'D4']).start("4:0:0");

// const fourthChord = new Tone.Event(function(time, note) {
//     synth.triggerAttackRelease(note, '2m');
// }, ['G3', 'B4', 'D4', 'F4']).start("6:0:0");



/*
The Part object allows you to set up several Events at once. Again the first argument is the 
callback function. The second argument is the data to be passed into the callback each time. 
If using objects as in this example, it must contain a time property. This is relative time 
rather than an absolute time on the transport timeline (the absolute start time for the Part
is decided by its start method). All the other properties are up to you, in this example
I am just passing in an array of notes, but we could pass in other information as well,
such as velocity.
*/

const chordPart = new Tone.Part(function(time, value) {
    synth.triggerAttackRelease(value.notes, '2m', time);
}, [
    { time: "0:0:0", notes: ['C4', 'E4', 'G4', 'B4'] },
    { time: "2:0:0", notes: ['A4', 'C4', 'E4', 'G4'] },
    { time: "4:0:0", notes: ['F3', 'A4', 'C4', 'D4'] },
    { time: "6:0:0", notes: ['G3', 'B4', 'D4', 'F4'] },
    //["0:0:0", []],
    //["2:0:0", []]
]);
chordPart.loop = true;
chordPart.loopStart = "0:0:0";
chordPart.loopEnd = "8:0:0";
chordPart
//.start("0:0:0");



const chord1Data = { time: "0:0:0", notes: ['C4', 'E4', 'G4', 'B4'] };
const chord2Data = { time: "2:0:0", notes: ['A4', 'C4', 'E4', 'G4'] };
const chord3Data = { time: "4:0:0", notes: ['F3', 'A4', 'C4', 'D4'] };
const chord4Data = { time: "6:0:0", notes: ['G3', 'B4', 'D4', 'F4'] };

const chordal = new Tone.Part().start("0:0:0");
const chordalCallback = function(time, value) {
    synth.triggerAttackRelease(value.notes, '2m', time);
}
chordal.callback = chordalCallback;
chordal.add(chord1Data);
chordal.add(chord2Data);
chordal.add(chord3Data);
chordal.add(chord4Data);
window.choral = chordal;

 
const bassPart = new Tone.Part(function(time, value) {
    plucky.triggerAttackRelease(value.note, '16n', time);
}, [
    { time: "0:0:0", note: 'C2' },
    { time: "0:0:1", note: 'C2' },
    { time: "0:0:2", note: 'C2' },
    { time: "0:0:3", note: 'C2' },
    { time: "0:1:0", note: 'C2' },
    { time: "0:1:1", note: 'C2' },
    { time: "0:1:2", note: 'C2' },
    { time: "0:1:3", note: 'C2' },
    { time: "0:2:0", note: 'C2' },
    { time: "0:2:1", note: 'C2' },
    { time: "0:2:2", note: 'C2' },
    { time: "0:2:3", note: 'C2' },
    { time: "0:3:0", note: 'C2' },
    { time: "0:3:1", note: 'C2' },
    { time: "0:3:2", note: 'C2' },
    { time: "0:3:3", note: 'C2' },
    { time: "1:0:0", note: 'C2' },
    { time: "1:0:1", note: 'C2' },
    { time: "1:0:2", note: 'C2' },
    { time: "1:0:3", note: 'C2' },
    { time: "1:1:0", note: 'C2' },
    { time: "1:1:1", note: 'C2' },
    { time: "1:1:2", note: 'C2' },
    { time: "1:1:3", note: 'C2' },
    { time: "1:2:0", note: 'C2' },
    { time: "1:2:1", note: 'C2' },
    { time: "1:2:2", note: 'C2' },
    { time: "1:2:3", note: 'C2' },
    { time: "1:3:0", note: 'C2' },
    { time: "1:3:1", note: 'C2' },
    { time: "1:3:2", note: 'C2' },
    { time: "1:3:3", note: 'C2' },
    { time: "2:0:0", note: 'A1' },
    { time: "2:0:1", note: 'A1' },
    { time: "2:0:2", note: 'A1' },
    { time: "2:0:3", note: 'A1' },
    { time: "2:1:0", note: 'A1' },
    { time: "2:1:1", note: 'A1' },
    { time: "2:1:2", note: 'A1' },
    { time: "2:1:3", note: 'A1' },
    { time: "2:2:0", note: 'A1' },
    { time: "2:2:1", note: 'A1' },
    { time: "2:2:2", note: 'A1' },
    { time: "2:2:3", note: 'A1' },
    { time: "2:3:0", note: 'A1' },
    { time: "2:3:1", note: 'A1' },
    { time: "2:3:2", note: 'A1' },
    { time: "2:3:3", note: 'A1' },
    { time: "3:0:0", note: 'A1' },
    { time: "3:0:1", note: 'A1' },
    { time: "3:0:2", note: 'A1' },
    { time: "3:0:3", note: 'A1' },
    { time: "3:1:0", note: 'A1' },
    { time: "3:1:1", note: 'A1' },
    { time: "3:1:2", note: 'A1' },
    { time: "3:1:3", note: 'A1' },
    { time: "3:2:0", note: 'A1' },
    { time: "3:2:1", note: 'A1' },
    { time: "3:2:2", note: 'A1' },
    { time: "3:2:3", note: 'A1' },
    { time: "3:3:0", note: 'A1' },
    { time: "3:3:1", note: 'A1' },
    { time: "3:3:2", note: 'A1' },
    { time: "3:3:3", note: 'A1' },
    { time: "4:0:0", note: 'F2' },
    { time: "4:0:1", note: 'F2' },
    { time: "4:0:2", note: 'F2' },
    { time: "4:0:3", note: 'F2' },
    { time: "4:1:0", note: 'F2' },
    { time: "4:1:1", note: 'F2' },
    { time: "4:1:2", note: 'F2' },
    { time: "4:1:3", note: 'F2' },
    { time: "4:2:0", note: 'F2' },
    { time: "4:2:1", note: 'F2' },
    { time: "4:2:2", note: 'F2' },
    { time: "4:2:3", note: 'F2' },
    { time: "4:3:0", note: 'F2' },
    { time: "4:3:1", note: 'F2' },
    { time: "4:3:2", note: 'F2' },
    { time: "4:3:3", note: 'F2' },
    { time: "5:0:0", note: 'F2' },
    { time: "5:0:1", note: 'F2' },
    { time: "5:0:2", note: 'F2' },
    { time: "5:0:3", note: 'F2' },
    { time: "5:1:0", note: 'F2' },
    { time: "5:1:1", note: 'F2' },
    { time: "5:1:2", note: 'F2' },
    { time: "5:1:3", note: 'F2' },
    { time: "5:2:0", note: 'F2' },
    { time: "5:2:1", note: 'F2' },
    { time: "5:2:2", note: 'F2' },
    { time: "5:2:3", note: 'F2' },
    { time: "5:3:0", note: 'F2' },
    { time: "5:3:1", note: 'F2' },
    { time: "5:3:2", note: 'F2' },
    { time: "5:3:3", note: 'F2' },
    { time: "6:0:0", note: 'G1' },
    { time: "6:0:1", note: 'G1' },
    { time: "6:0:2", note: 'G1' },
    { time: "6:0:3", note: 'G1' },
    { time: "6:1:0", note: 'G1' },
    { time: "6:1:1", note: 'G1' },
    { time: "6:1:2", note: 'G1' },
    { time: "6:1:3", note: 'G1' },
    { time: "6:2:0", note: 'G1' },
    { time: "6:2:1", note: 'G1' },
    { time: "6:2:2", note: 'G1' },
    { time: "6:2:3", note: 'G1' },
    { time: "6:3:0", note: 'G1' },
    { time: "6:3:1", note: 'G1' },
    { time: "6:3:2", note: 'G1' },
    { time: "6:3:3", note: 'G1' },
    { time: "7:0:0", note: 'G1' },
    { time: "7:0:1", note: 'G1' },
    { time: "7:0:2", note: 'G1' },
    { time: "7:0:3", note: 'G1' },
    { time: "7:1:0", note: 'G1' },
    { time: "7:1:1", note: 'G1' },
    { time: "7:1:2", note: 'G1' },
    { time: "7:1:3", note: 'G1' },
    { time: "7:2:0", note: 'G1' },
    { time: "7:2:1", note: 'G1' },
    { time: "7:2:2", note: 'G1' },
    { time: "7:2:3", note: 'G1' },
    { time: "7:3:0", note: 'G1' },
    { time: "7:3:1", note: 'G1' },
    { time: "7:3:2", note: 'G1' },
    { time: "7:3:3", note: 'G1' },
])
//.start("0:0:0");

bassPart.loop = true;
bassPart.loopStart = "0:0:0";
bassPart.loopEnd = "8:0:0";

//Tone.Transport.start();




