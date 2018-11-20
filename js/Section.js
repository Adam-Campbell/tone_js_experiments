class Section {
    constructor(instrument, start) {
        this._part = new Tone.Part();
        this._id = generateId();
        this._instrument = instrument || null;
        this._start = start || "0:0:0";
        this._part.start(this._start);
        this._part.callback = this._partCallback.bind(this);
        this.noteStore = {};
        // only temp
        this._part.loop = true;
        this._part.loopStart = "0:0:0";
        this._part.loopEnd = "8:0:0";
    }

    get start() {
        return this._start;
    }

    set start(newStartValue) {
        this._start = newStartValue;
        this._part.start(this._start);
    }

    get instrument() {
        return this._instrument;
    }

    set instrument(instrument) {
        // if (!(instrument instanceof Tone.Instrument)) {
        //     throw new Error("You have tried to set the instrument on a Section with an invalid object");
        //     return;
        // }
        this._instrument = instrument;
    }

    _partCallback(time, value) {
        this.instrument.triggerAttackRelease(value.note, value.duration, time);
    }

    addNote(noteData) {
        const id = generateId();
        noteData.id = id;
        this._part.add(noteData);
        this.noteStore[id] = noteData;
    }

    removeNote(noteId) {
        const noteRef = this.noteStore[noteId];
        this._part.remove(noteRef.time, noteRef);
        delete this.noteStore[noteId];
    }

    delete() {
        this._part.dispose();
        // clean up the other props as well.
    }

}

