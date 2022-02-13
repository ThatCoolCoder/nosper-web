class InputHistory {
    constructor(profileName='default') {
        this.profileName = profileName;
        this.commands = [];
        this.crntIndex = 0;
        this.maxLength = 3;
        this.chromeStorageKey = `naltonCalculatorHistory:${this.profileName}`;
    }

    push(value) {
        this.commands.push(value);
        this.trim();
    }

    get crntCommand() {
        return this.commands[this.crntIndex] || '';
    }

    get isAtStart() {
        return this.crntIndex == 0;
    }

    get isAtEnd() {
        return this.crntIndex == this.commands.length - 1;
    }

    toStart() {
        this.crntIndex = 0;
    }

    toEnd() {
        this.crntIndex = this.commands.length - 1;
    }

    pastEnd() {
        this.crntIndex = this.commands.length;
    }

    next() {
        this.crntIndex = Math.min(this.commands.length, this.crntIndex + 1);
    }

    previous() {
        this.crntIndex = Math.max(this.crntIndex - 1, 0);
    }

    load(callback=()=>{}) {
        // Handy to be able to test calculator UI in other browsers so don't crash if we're not a chrome extension.
        if (window.chrome == undefined) return;
        chrome.storage.sync.get([this.chromeStorageKey], data => {
            if (spnr.obj.keys(data).length != 0)
                this.commands = data[this.chromeStorageKey];
            this.trim();
            callback();
        });
    }

    save() {
        if (window.chrome == undefined) return;
        chrome.storage.sync.set({[this.chromeStorageKey]: this.commands}, () => {});
    }

    trim() {
        var overflow = this.commands.length - this.maxLength;
        if (overflow > 0) this.commands.splice(0, overflow);
    }
}