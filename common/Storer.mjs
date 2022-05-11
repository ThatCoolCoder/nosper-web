/**
 * Abstract class able to store object data
 * @class
 * @abstract
 */
export class Storer {
    store(key, data) {
        console.error("Storer.store was not overridden");
    }

    load(key, callback) {
        console.error("Storer.load was not overridden");
    }
}

export class LocalStorageStorer extends Storer {
    store(key, data) {
        localStorage[key] = JSON.stringify(data);
    }

    load(key, callback) {
        var value = localStorage.getItem(key);
        if (value == null) callback(value);
        else callback(JSON.parse(value));
    }
}

export class ChromeStorageStorer extends Storer {
    store(key, data) {
        chrome.storage.sync.set({[key]: data}, () => {});
    }

    load(key, callback) {
        chrome.storage.sync.get([key], data => {
            if (spnr.obj.keys(data).length != 0)
                callback(data[key]);
        });
    }
}

// AutoStorer: either a LocalStorageStorer or ChromeStorageStorer, depending if chrome storage is available
export var AutoStorer;
if (window.chrome?.storage?.sync == undefined) {
    AutoStorer = LocalStorageStorer;
}
else {
    AutoStorer = ChromeStorageStorer;
}