class AudioEngine {

    constructor() {
        this._serializer = new Serializer();
        this._stateBuilder = new StateBuilder();
        this._state = this.initializeState();
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        this._state = newState;
    }

    initializeState() {
        const bus = new Bus();
        bus.addChannel(new Channel());
        return bus; 
    }

    save() {
        return this._serializer.serialize(this.state);
    }

    load(serializedState) {
        // detach the old state from Tone.Transport
        this.state.clear();
        this.state = this._stateBuilder.build(serializedState);
    }

}