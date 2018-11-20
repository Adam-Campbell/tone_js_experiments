class StateBuilder {

    constructor() {
        this._synthFactory = new SynthFactory();
        this._effectFactory = new EffectFactory();
    }

    build(serializedState) {
        const deserializedState = JSON.parse(serializedState);
        const builtState = this._buildBus(deserializedState);
        return builtState;
    }

    _buildBus(busState) {
        const bus = new Bus();
        bus.volume = busState.volume;
        for (let channel of busState.channels) {
            bus.addChannel(this._buildChannel(channel));
        }
        return bus;
    }

    _buildChannel(channelState) {
        // create the channel instance
        const channel = new Channel();
        // create the instrument instance
        channel.instrument = this._buildSynth(channelState.instrument);
        
        // create the effect instances and wire them up to the channel instance
        for (let i = 0; i < channelState.effects.length; i++) {
            const effect = this._buildEffect(channelState.effects[i]);
            channel.addToEffectChain(effect, i);
        }

        // create the section instances and add them to the channel.
        for (let sectionState of channelState.sections) {
            const section = this._buildSection(sectionState);
            channel.addSection(section, section.start);
        }
        return channel;
    }

    _buildSection(sectionState) {
        const section = new Section();
        // more stuff to go here...
        section.start = sectionState.start;
        for (let note of sectionState.notes) {
            section.addNote(note);
        }
        return section;
    }

    _buildSynth(synthState) {
        const synth = this._synthFactory.create(
            synthState.synthType,
            synthState.synthData
        );
        return synth;
    }

    _buildEffect(effectState) {
        const effect = this._effectFactory.create(
            effectState.effectType,
            effectState.effectData
        );
        return effect;
    }

}

