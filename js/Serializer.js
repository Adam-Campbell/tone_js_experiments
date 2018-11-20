class Serializer {
    
    serialize(bus) {
        const serialized = this._serializeBus(bus);
        return JSON.stringify(serialized);
    }

    _getSynthType(synth) {
        let v = synth.voices[0];
        if (v instanceof Tone.Synth) {
            return synthTypes.default;
        } else if (v instanceof Tone.AMSynth) {
            return synthTypes.am;
        } else if (v instanceof Tone.FMSynth) {
            return synthTypes.fm;
        } else if (v instanceof Tone.DuoSynth) {
            return synthTypes.duo;
        } else if (v instanceof Tone.MonoSynth) {
            return synthTypes.mono;
        }
    }

    _serializeSynth(synth) {
        
        const synthData = synth.get();
        synthData.oscillator.modulationType = synth.voices[0].oscillator.modulationType;
        if (synth.voices[0].oscillator.harmonicity) {
            synthData.oscillator.harmonicity = synth.voices[0].oscillator.harmonicity.value;
        }
        return {
            synthType: this._getSynthType(synth),
            synthData: synthData
        };    
    }

    _getEffectType(effect) {
        if (effect instanceof Tone.AutoFilter) {
            return effectTypes.autoFilter;
        } else if (effect instanceof Tone.BitCrusher) {
            return effectTypes.bitCrusher;
        } else if (effect instanceof Tone.Chorus) {
            return effectTypes.chorus;
        } else if (effect instanceof Tone.Distortion) {
            return effectTypes.distortion;
        } else if (effect instanceof Tone.FeedbackDelay) {
            return effectTypes.feedbackDelay;
        } else if (effect instanceof Tone.Freeverb) {
            return effectTypes.freeverb;
        } else if (effect instanceof Tone.JCReverb) {
            return effectTypes.jcReverb;
        } else if (effect instanceof Tone.Phaser) {
            return effectTypes.phaser;
        } else if (effect instanceof Tone.PingPongDelay) {
            return effectTypes.pingPongDelay;
        } else if (effect instanceof Tone.PitchShift) {
            return effectTypes.pitchShift;
        } else if (effect instanceof Tone.Tremolo) {
            return effectTypes.tremolo;
        } else if (effect instanceof Tone.Vibrato) {
            return effectTypes.vibrato;
        }
    }

    _serializeEffect(effect) {
        return {
            effectType: this._getEffectType(effect),
            effectData: effect.get()
        };
    }

    _serializeSection(section) {
        let notesArr = [];
        for (let note in section.noteStore) {
            let _note = section.noteStore[note];
            notesArr.push({
                time: _note.time,
                note: _note.note,
                duration: _note.duration
            });
        }
        const sectionObject = {
            start: section.start,
            notes: notesArr
        };
        return sectionObject;
    }

    _serializeChannel(channel) {
        // create an array of the results of serializing each section residing on this channel.
        let sectionsArr = [];
        for (let section in channel.sectionStore) {
            const _section = channel.sectionStore[section];
            sectionsArr.push(this._serializeSection(_section));
        }

        // create an array of the results of serializing the effects currently being applied to this
        // channel. However we aren't interested in the first or last elements in the effect chain, 
        // since the first is the instrument, and that last is the master output. We only want the
        // effects in between the two. As such, we skip this entire section if the chains length
        // isn't greater than two, since that means there are no effects. 
        let effectsArr = [];
        if (channel.effectChain.length > 2) {
            let subEffectsArr = channel.effectChain.slice(1, channel.effectChain.length-1);
            for (let effect of subEffectsArr) {
                effectsArr.push(this._serializeEffect(effect));
            } 
        }

        let instrument = this._serializeSynth(channel.instrument);

        const channelObject = {
            sections: sectionsArr,
            effects: effectsArr,
            instrument: instrument
        };

        return channelObject;
    }

    _serializeBus(bus) {
        let channelsArr = [];
        for (let channel of bus.channels) {
            channelsArr.push(this._serializeChannel(channel));
        }
        const busObject = {
            channels: channelsArr,
            volume: bus.volume
        };
        return busObject;
    }

}





/*

Old implementation below this point...

*/



function serializeSynth(synth) {

    const synthData = synth.get();
    synthData.oscillator.modulationType = synth.voices[0].oscillator.modulationType;
    if (synth.voices[0].oscillator.harmonicity) {
        synthData.oscillator.harmonicity = synth.voices[0].oscillator.harmonicity.value;
    }

    return {
        synthType: getSynthType(synth),
        synthData: synthData
    };
}

function getSynthType(synth) {
    let v = synth.voices[0];
    if (v instanceof Tone.Synth) {
        return synthTypes.default;
    } else if (v instanceof Tone.AMSynth) {
        return synthTypes.am;
    } else if (v instanceof Tone.FMSynth) {
        return synthTypes.fm;
    } else if (v instanceof Tone.DuoSynth) {
        return synthTypes.duo;
    } else if (v instanceof Tone.MonoSynth) {
        return synthTypes.mono;
    }
}


function serializeEffect(effect) {
    return {
        effectType: getEffectType(effect),
        effectData: effect.get()
    };
}

function getEffectType(effect) {
    if (effect instanceof Tone.AutoFilter) {
        return effectTypes.autoFilter;
    } else if (effect instanceof Tone.BitCrusher) {
        return effectTypes.bitCrusher;
    } else if (effect instanceof Tone.Chorus) {
        return effectTypes.chorus;
    } else if (effect instanceof Tone.Distortion) {
        return effectTypes.distortion;
    } else if (effect instanceof Tone.FeedbackDelay) {
        return effectTypes.feedbackDelay;
    } else if (effect instanceof Tone.Freeverb) {
        return effectTypes.freeverb;
    } else if (effect instanceof Tone.JCReverb) {
        return effectTypes.jcReverb;
    } else if (effect instanceof Tone.Phaser) {
        return effectTypes.phaser;
    } else if (effect instanceof Tone.PingPongDelay) {
        return effectTypes.pingPongDelay;
    } else if (effect instanceof Tone.PitchShift) {
        return effectTypes.pitchShift;
    } else if (effect instanceof Tone.Tremolo) {
        return effectTypes.tremolo;
    } else if (effect instanceof Tone.Vibrato) {
        return effectTypes.vibrato;
    }
}

function serializeSection(section) {
    let notesArr = [];
    for (let note in section.noteStore) {
        let _note = section.noteStore[note];
        notesArr.push({
            time: _note.time,
            note: _note.note,
            duration: _note.duration
        });
    }
    const sectionObject = {
        start: section.start,
        notes: notesArr
    };
    return sectionObject;
}


function serializeChannel(channel) {
    // create an array of the results of serializing each section residing on this channel.
    let sectionsArr = [];
    for (let section in channel.sectionStore) {
        const _section = channel.sectionStore[section];
        sectionsArr.push(serializeSection(_section));
    }

    // create an array of the results of serializing the effects currently being applied to this
    // channel. However we aren't interested in the first or last elements in the effect chain, 
    // since the first is the instrument, and that last is the master output. We only want the
    // effects in between the two. As such, we skip this entire section if the chains length
    // isn't greater than two, since that means there are no effects. 
    let effectsArr = [];
    if (channel.effectChain.length > 2) {
        let subEffectsArr = channel.effectChain.slice(1, channel.effectChain.length-1);
        for (let effect of subEffectsArr) {
            effectsArr.push(serializeEffect(effect));
        } 
    }

    let instrument = serializeSynth(channel.instrument);

    const channelObject = {
        sections: sectionsArr,
        effects: effectsArr,
        instrument: instrument
    };

    return channelObject;
}


function serializeBus(bus) {
    let channelsArr = [];
    for (let channel of bus.channels) {
        channelsArr.push(serializeChannel(channel));
    }
    const busObject = {
        channels: channelsArr,
        volume: bus.volume
    };
    return busObject;
}







`


{
    oscillator  : {
    type  : triangle
    }  ,
    envelope  : {
    attack  : 0.005 ,
    decay  : 0.1 ,
    sustain  : 0.3 ,
    release  : 1
    }
}

s.detune.value to get detune value

detune - s.detune.value
envelope
    attack - s.envelope.attack
    attackCurve - s.envelope.attackCurve
    decay - s.envelope.decay
    release - s.envelope.release
    releaseCurve - s.envelope.releaseCurve
    sustain - s.envelope.sustain
frequency - s.frequency.value
oscillator
    type - s.oscillator.type
    detune - s.oscillator.detune.value
    frequency - s.oscillator.frequency.value
    harmonicity - s.oscillator.harmonicity && s.oscillator.harmonicity.value -- may want to use if conditional
    modulationType - s.oscillator.modulationType
    phase - s.oscillator.phase
volume - s.volume.value
portamento - s.portamento

Populated Program


Bus
-- Channel
----------- Sections
--------------------- Each section has noteStore holding note data
----------- Instrument
----------------------- Each instrument has its own state that needs to be serialized.
                        Also need to store what type of instrument was used. 
----------- Effect chain
------------------------ Effects
-------------------------------- Each effect has its own state that needs to be serialized. 
                                 Also need to store what type of effect was used. 







function serializeSynth___(synth)
    return {
        synthType: ...,
        synthData: { ... }
    }




function synthSwitch(synth)
    if synth instanceof SynthClassA
        return serializeSynthA()
    else if synth instanceof SynthClassB
        return serializeSynthB()

    ... for each type of Synth




function serializeEffect___(effect)
    return {
        effectType: ...,
        effectData: { ... }
    }




function effectSwitch(effect)
    if effect instanceof EffectClassA
        return serializeEffectA()
    else if effect instanceof EffectClassB
        return serializeEffectB()

    ... for each type of Effect




function serializeSection(section)
    return {
        notes: [
            { time: "0:0:0", note: "G3", duration: "2m" }
        ],
        start: "0:0:0"
    }


function serializeChannel(channel)
    let sections = [];
    for (let section in channel.sections)
        sections.push(serializeSection(section))

    let instrument = serializeSynth(channel.instrument)

    let effectsArr = the _effectChain array minus the first and last elements
    if that doesnt leave anything then dont do this

    let mappedEffectArr = map over effectsArr and call effectSwitch for each element,
    the end result is creating an array of the serializations of all effects in the
    original effect chain, except for the first element (the instrument) and the last
    element (the master).


functin serializeBus(bus)
    let channelsArr = bus.channels.map => return serializeChannel(channel)
    return {
        channels: channelsArr
    }
 


`
