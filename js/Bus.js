class Bus {
    constructor() {
        this.channels = [];
    }

    addChannel(newChannel) {
        this.channels.push(newChannel);
    }

    toggleMute() {
        Tone.Master.mute = !Tone.Master.mute;
    }

    get volume() {
        return Tone.Master.volume.value;
    }

    set volume(newVolume) {
        // note that volume is measured in decibels and therefore is logarithmic. Each additional
        // 10 decibels doubles the volumn, subtracting 10 decibels halves the volume. 
        Tone.Master.volume.value = newVolume;
    }

    clear() {
        for (let channel of this.channels) {
            channel.deleteChannel();
        }
    }
}

