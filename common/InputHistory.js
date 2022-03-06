class InputHistory {
    constructor(storer, profileName='default', collapseDuplicates=true) {
        this.storer = storer;
        this.profileName = profileName;
        this.collapseDuplicates = collapseDuplicates;

        this.commands = [];
        this.crntIndex = 0;
        this.maxLength = 3;
        this.storageKey = `naltonCalculatorHistory:${this.profileName}`;
    }

    push(value) {
        this.commands.push(value);
        this.commands = this.commands.filter((value, idx) => this.commands[idx - 1] !== value);
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
        this.storer.load(this.storageKey, data => {
            this.commands = data == null ? [] : data;
            this.trim();
            callback();
        });
    }

    save() {
        this.storer.store(this.storageKey, this.commands);
    }

    trim() {
        var overflow = this.commands.length - this.maxLength;
        if (overflow > 0) this.commands.splice(0, overflow);
    }
}