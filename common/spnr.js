/*! (exclamation mark preserves comment)
spnr.js v1.6.1

MIT License

Copyright (c) 2021 That-Cool-Coder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/if (window.spnr !== undefined) {
    const message = 'An instance of spnr.js is already running'; try { spnr.internalWarn(message); }
        catch { console.warn(message); }
}
else { var spnr = {}; spnr.VERSION = 'v1.6.1'; spnr.consoleLogHeader = '  🔧🔧 '; spnr.consoleLogStyling = 'background-color: #9cc8ff; display: block'; window.spnr = spnr; console.log(`%c  \n${spnr.consoleLogHeader} spnr.js ${spnr.VERSION}  \n  `, spnr.consoleLogStyling); Object.getOwnPropertyNames(Math).forEach(key => { spnr[key] = Math[key]; }); }
spnr.internalLog = function (message) { var fullMessage = '%c' + spnr.consoleLogHeader + message; console.log(fullMessage, spnr.consoleLogStyling); }
spnr.internalWarn = function (message) { var fullMessage = `${spnr.consoleLogHeader} spnr.js warning:\n  ${message}`; console.warn(fullMessage); }
spnr.uniqueId = function () { return '_' + spnr.random().toString(36).substr(2, 9); }
spnr.randBoolean = function () { return spnr.random() > 0.5; }
spnr.doNothing = function () { }
spnr.constrain = function (num, min, max) { return Math.max(min, Math.min(num, max)) }
spnr.wrapAround = function (num, min, max) { var diff = max - min; if (num > max) num = num % diff + min; if (num < min) num = max; return num; }
spnr.doNTimes = function (n, func) { for (var i = 0; i < n; i++) { func(i); } }
spnr.mapNum = function (num, oldMin, oldMax, newMin, newMax) { var slope = (newMax - newMin) / (oldMax - oldMin); var output = newMin + slope * (num - oldMin); return output; }
spnr.str = {}; spnr.str.lowerAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; spnr.str.upperAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; spnr.str.digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; spnr.str.symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', '{', ']', '}', '\\', '|', ';', ':', '\'', '"', ',', '<', '.', '>', '/', '?']; spnr.str.randomFromArray = function (length = 1, charsToUse = []) {
    var result = ''; for (var i = 0; i < length; i++) { result += spnr.arr.choose(charsToUse); }
    return result;
}
spnr.str.random = function (length = 1, lowercaseAllowed = true, uppercaseAllowed = true, digitsAllowed = true, symbolsAllowed = true) { var charsToUse = []; if (lowercaseAllowed) charsToUse = charsToUse.concat(spnr.str.lowerAlphabet); if (uppercaseAllowed) charsToUse = charsToUse.concat(spnr.str.upperAlphabet); if (digitsAllowed) charsToUse = charsToUse.concat(spnr.str.digits); if (symbolsAllowed) charsToUse = charsToUse.concat(spnr.str.symbols); return spnr.str.randomFromArray(length, charsToUse); }
spnr.str.randomLetters = function (length = 1, lowercaseAllowed = true, uppercaseAllowed = true) { var charsToUse = spnr.str.symbols; if (lowercaseAllowed) charsToUse = charsToUse.concat(spnr.str.lowerAlphabet); if (uppercaseAllowed) charsToUse = charsToUse.concat(spnr.str.upperAlphabet); return spnr.str.randomFromArray(length, charsToUse); }
spnr.str.randomSymbols = function (length = 1, digitsAllowed = false) { var charsToUse = spnr.str.symbols; if (digitsAllowed) charsToUse = charsToUse.concat(spnr.str.digits); return spnr.str.randomFromArray(length, charsToUse); }
spnr.str.randomDigits = function (length = 1) { return spnr.str.randomFromArray(length, spnr.str.digits); }
spnr.str.breakHtmlTags = function (str) { return str.replace(/</g, '<\u200c'); }
spnr.str.mult = function (str, amount) {
    var result = ''; for (var i = 0; i < amount; i++) { result += str; }
    return result;
}
spnr.str.replaceAll = function (str, pattern, replacement = '') {
    if (typeof str.replaceAll == 'function') { return str.replaceAll(pattern, replacement); }
    else {
        while (str.includes(pattern)) { str = str.replace(pattern, replacement); }
        return str;
    }
}
spnr._180DIVPI = 180 / spnr.PI; spnr.round = function (num, decimalPlaces = 0) { var numToRound = num * 10 ** decimalPlaces; return Math.round(numToRound) / 10 ** decimalPlaces; }
spnr.floor = function (num, decimalPlaces = 0) { var numToRound = num * 10 ** decimalPlaces; return Math.floor(numToRound) / 10 ** decimalPlaces; }
spnr.ceiling = function (num, decimalPlaces = 0) { var numToRound = num * 10 ** decimalPlaces; return Math.ceil(numToRound) / 10 ** decimalPlaces; }
spnr.randflt = function (min, max) { var diff = max - min; return Math.random() * diff + min; }
spnr.randint = function (min, max) { return Math.floor(spnr.randflt(min, max)); }
spnr.sigmoid = function (x) { return 1 / (1 + Math.exp(-x)); }
spnr.invSigmoid = function (x) { return spnr.sigmoid(x) * (1 - spnr.sigmoid(x)); }
spnr.degrees = function (radians) { return radians * spnr._180DIVPI; }
spnr.radians = function (degrees) { return degrees / spnr._180DIVPI; }
spnr.mean = function (a, b) { return (a + b) / 2; }
spnr.dom = {}; spnr.dom.logPara = undefined; spnr.dom.id = function (id) { return document.getElementById(id); }
spnr.dom.viewportWidth = function () { return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0); }
spnr.dom.viewportHeight = function () { return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); }
spnr.dom.viewportSize = function () { return spnr.v(spnr.dom.viewportWidth(), spnr.dom.viewportHeight()); }
spnr.dom.clearLogPara = function () { if (spnr.dom.logPara !== undefined) { spnr.dom.logPara.innerText = ''; } }
spnr.dom.logToPara = function (data, label = 'No label') {
    if (spnr.dom.logPara === undefined) { spnr.dom.logPara = document.createElement('p'); document.body.appendChild(spnr.dom.logPara); }
    spnr.dom.logPara.innerText += `${label} : ${data}\n`;
}
spnr.dom.delete = function (id) { var elem = spnr.dom.id(id); if (elem != undefined) { elem.remove(); } }
spnr.arr = {}; spnr.arr.removeItem = function (array, item) {
    var index = array.indexOf(item); if (index == -1) { spnr.internalWarn(`Could not remove item ${item} from array as it is not in the array`); }
    else { spnr.arr.removeIndex(array, index); }
}
spnr.arr.removeIndex = function (array, index) {
    if (index < 0 || index >= array.length) { spnr.internalWarn(`Could not remove item at ${index} from array as the index is out of bounds`); }
    else { array.splice(index, 1); }
}
spnr.arr.highestIndex = function (array = []) { var highestIdx = null; var highestItem = 0; array.forEach((item, i) => { if (item >= highestItem) { highestItem = item; highestIdx = i; } }); return highestIdx; }
spnr.arr.lowestIndex = function (array = []) { var lowestIdx = null; var lowestItem = 0; array.forEach((item, i) => { if (item <= lowestItem) { lowestItem = item; lowestIdx = i; } }); return lowestIdx; }
spnr.arr.choose = function (array = []) { return array[spnr.randint(0, array.length)]; }
spnr.arr.sum = function (array = []) { var sum = array.reduce(function (a, b) { return a + b; }, 0); return sum; }
spnr.arr.product = function (array = []) { var product = array.reduce(function (a, b) { return a * b; }, 1); return product; }
spnr.arr.mean = function (array = []) { var sum = spnr.arr.sum(array); var mean = sum / array.length; return mean; }
spnr.arr.median = function (array = []) {
    if (array.length % 2 == 0) { var justBelowMiddle = array[array.length / 2 - 1]; var justOverMiddle = array[array.length / 2]; return spnr.mean(justBelowMiddle, justOverMiddle); }
    else { var middleIndex = array.length / 2 - 0.5; return array[middleIndex]; }
}
spnr.arr.mode = function () { }; spnr.obj = {}; spnr.obj.keys = function (obj) { return Object.keys(obj); }
spnr.obj.values = function (obj) { return Object.values(obj); }
spnr.obj.setValues = function (obj, values) { var keys = spnr.obj.keys(obj); keys.forEach((key, i) => { obj[key] = values[i]; }); }
spnr.obj.oneLevelCopy = function (obj) { var newObj = {}; var keys = spnr.obj.keys(obj); keys.forEach(key => { newObj[key] = obj[key]; }); return newObj; }
spnr.v = function (x, y, z = 0) { return { x: x, y: y, z: z }; }
spnr.v.makeZero = function (v) { v.x = 0; v.y = 0; v.z = 0; }
spnr.v.random = function (min, max, floatsAllowed = true) {
    if (floatsAllowed) { return new spnr.v(spnr.randflt(min.x, max.x), spnr.randflt(min.y, max.y), spnr.randflt(min.z, max.z)); }
    else { return new spnr.v(spnr.randint(min.x, max.x), spnr.randint(min.y, max.y), spnr.randint(min.z, max.z)); }
}
spnr.v.copy = function (v) { return spnr.v(v.x, v.y, v.z); }
spnr.v.prettyPrint = function (v, verbose = false) {
    if (verbose) { return `spnr.v: {x : ${v.x}, y : ${v.y}, z : ${v.z}}`; }
    else { return `{x:${v.x},y:${v.y},z:${v.z}}`; }
}
spnr.v.equal = function (v1, v2) { return (v1.x == v2.x && v1.y == v2.y && v1.z == v1.z); }
spnr.v.add = function (v1, v2) { v1.x += v2.x; v1.y += v2.y; v1.z += v2.z; }
spnr.v.copyAdd = function (v1, v2) { var v3 = spnr.v(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); return v3; }
spnr.v.sub = function (v1, v2) { v1.x -= v2.x; v1.y -= v2.y; v1.z -= v2.z; }
spnr.v.copySub = function (v1, v2) { var v3 = spnr.v(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); return v3; }
spnr.v.mult = function (v, amount) { v.x *= amount; v.y *= amount; v.z *= amount; }
spnr.v.copyMult = function (v, amount) { var v2 = spnr.v(v.x * amount, v.y * amount, v.z * amount); return v2; }
spnr.v.div = function (v, amount) { v.x /= amount; v.y /= amount; v.z /= amount; }
spnr.v.copyDiv = function (v, amount) { var v2 = spnr.v(v.x / amount, v.y / amount, v.z / amount); return v2; }
spnr.v.magSq = function (v) { return v.x ** 2 + v.y ** 2 + v.z ** 2; }
spnr.v.mag = function (v) { return spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2); }
spnr.v.distSq = function (v1, v2) { var displacementX = v2.x - v1.x; var displacementY = v2.y - v1.y; var displacementZ = v2.z - v1.z; return displacementX ** 2 + displacementY ** 2 + displacementZ ** 2; }
spnr.v.dist = function (v1, v2) { var displacementX = v2.x - v1.x; var displacementY = v2.y - v1.y; var displacementZ = v2.z - v1.z; return spnr.sqrt(displacementX ** 2 + displacementY ** 2 + displacementZ ** 2); }
spnr.v.mean = function (v1, v2) { var halfDisplacementX = (v2.x - v1.x) / 2; var halfDisplacementY = (v2.y - v1.y) / 2; var halfDisplacementZ = (v2.z - v1.z) / 2; return spnr.v(v1.x + halfDisplacementX, v1.y + halfDisplacementY, v1.z + halfDisplacementZ); }
spnr.v.normalize = function (v) {
    var mag = spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2)
    v.x /= mag; v.y /= mag; v.z /= mag;
}
spnr.v.rotate = function (v, angle = 0, useDegrees = false) {
    if (useDegrees) { angle /= spnr._180DIVPI; }
    var cos = spnr.cos(angle); var sin = spnr.sin(angle); var newX = v.x * cos - v.y * sin; v.y = v.x * sin + v.y * cos; v.x = newX;
}
spnr.v.heading = function (v, useDegrees = false) { var heading = spnr.atan2(v.y, v.x); if (useDegrees) heading *= spnr._180DIVPI; return heading; }
spnr.v.dot = function (v1, v2) { var result = v1.x * v2.x; result += v1.y * v2.y; result += v1.z * v2.z; return result; }
spnr.v.cross = function (v1, v2) { var crossP = spnr.v(0, 0, 0); crossP.x = v1.y * v2.z - v1.z * v2.y; crossP.y = v1.z * v2.x - v1.x * v2.z; crossP.z = v1.x * v2.y - v1.y * v2.x; return crossP; }
spnr.attitude = function (heading, pitch, roll) { return { heading: heading, pitch: pitch, roll: roll }; }
spnr.attitude.copy = function (a) { return spnr.attitude(a.heading, a.pitch, a.roll); }
spnr.attitude.add = function (a1, a2) { a1.heading += a2.heading; a1.pitch += a2.pitch; a1.roll += a2.roll; }
spnr.attitude.copyAdd = function (a1, a2) { var a3 = spnr.attitude.copy(a1); spnr.attitude.add(a3, a2); return a3; }
spnr.attitude.sub = function (a1, a2) { a1.heading -= a2.heading; a1.pitch -= a2.pitch; a1.roll -= a2.roll; }
spnr.attitude.copySub = function (a1, a2) { var a3 = spnr.attitude.copy(a1); spnr.attitude.sub(a3, a2); return a3; }
spnr.attitude.mult = function (a, amount) { a.heading *= amount; a.pitch *= amount; a.roll *= amount; }
spnr.attitude.copyMult = function (a, amount) { var a2 = spnr.attitude.copy(a); spnr.attitude.mult(a2, amount); return a2; }
spnr.attitude.div = function (a, amount) { a.heading /= amount; a.pitch /= amount; a.roll /= amount; }
spnr.attitude.copyDiv = function (a, amount) { var a2 = spnr.attitude.copy(a); spnr.attitude.div(a2, amount); return a2; }
spnr.Sound = class {
    constructor(url) { this.url = url; this.audio = new Audio(url); }
    play() { this.audio.play(); }
    stop() { this.audio.pause(); this.audio.currentTime = 0; this.onended = () => { }; }
    pause() { this.audio.pause(); }
    loop() { this.play(); this.onended = () => this.play(); }
    set onended(val) { this.audio.onended = val; }
    copy() { return new spnr.Sound(this.url); }
}
spnr.KeyWatcher = class {
    constructor(elem = document) { this.elem = elem; this.keysDown = {}; this.setupListeners(); }
    setupListeners() { this.elem.addEventListener('keydown', event => { this.keysDown[event.code] = true; }); this.elem.addEventListener('keyup', event => { this.keysDown[event.code] = false; }); }
    keyIsDown(code) { if (this.keysDown[code] != undefined) return this.keysDown[code]; else return false; }
}
spnr.MouseWatcher = class { constructor(elem = document, scale = 1) { this.elem = elem; this.scale = scale; this.position = spnr.v(0, 0); this.pointerDown = false; this.mouseDown = false; this.touchDown = false; this.onMouseMove = new spnr.FunctionGroup(); this.elem.addEventListener('mousemove', e => { var rect = e.target.getBoundingClientRect(); this.position.x = (e.x - rect.left) / this.scale; this.position.y = (e.y - rect.top) / this.scale; this.onMouseMove.call(this.position, e); }); this.onMouseDown = new spnr.FunctionGroup(); this.elem.addEventListener('mousedown', e => { this.mouseDown = true; this.onMouseDown.call(this.position, e); }); this.onMouseUp = new spnr.FunctionGroup(); this.elem.addEventListener('mouseup', e => { this.mouseDown = false; this.onMouseUp.call(this.position, e); }); this.onTouchStart = new spnr.FunctionGroup(); this.elem.addEventListener('touchstart', e => { this.touchDown = true; this.onTouchStart.call(this.position, e); }); this.onTouchEnd = new spnr.FunctionGroup(); this.elem.addEventListener('touchend', e => { this.touchDown = false; this.onTouchEnd.call(this.position, e); }); this.onPointerDown = new spnr.FunctionGroup(); this.elem.addEventListener('pointerdown', e => { this.pointerDown = true; this.onPointerDown.call(this.position, e); }); this.onPointerUp = new spnr.FunctionGroup(); this.elem.addEventListener('pointerup', e => { this.pointerDown = false; this.onPointerUp.call(this.position, e); }); } }
spnr.FunctionGroup = class {
    constructor(initialFunctions = []) { this.functions = new Set(initialFunctions); }
    add(f) { this.functions.add(f); }
    addBulk(functionArray) { functionArray.forEach(f => this.add(f)); }
    remove(f) { return this.functions.delete(f); }
    removeAll() { this.functions = []; }
    call() { this.functions.forEach(f => { f(...arguments); }); }
}
spnr.NeuralNetwork = class {
    constructor() { this.inputs = []; this.hiddenLayers = []; this.outputs = []; }
    createInputLayer(size) { this.inputs = []; for (var i = 0; i < size; i++) { this.inputs.push(new spnr.Neuron()); } }
    addHiddenLayer(size) {
        var newLayer = []; for (var i = 0; i < size; i++) { newLayer.push(new spnr.Neuron()); }
        this.hiddenLayers.push(newLayer);
    }
    createOutputLayer(size) { this.outputs = []; for (var i = 0; i < size; i++) { this.outputs.push(new spnr.Neuron()); } }
    connect() { this._connect2Layers(this.inputs, this.hiddenLayers[0]); this._connect2Layers(this.hiddenLayers[this.hiddenLayers.length - 1], this.outputs); for (var i = 0; i < this.hiddenLayers.length - 1; i++) { var firstLayer = this.hiddenLayers[i]; var secondLayer = this.hiddenLayers[i + 1]; this._connect2Layers(firstLayer, secondLayer); } }
    activate(input) { this.inputs.forEach((neuron, i) => neuron.activate(input[i])); this.hiddenLayers.forEach(layer => { layer.forEach(neuron => neuron.activate()); }); return this.outputs.map(neuron => neuron.activate()); }
    train(dataset, iterations = 1) { while (iterations > 0) { dataset.forEach(datum => { this.activate(datum.inputs); this.propagate(datum.outputs); }); iterations--; } }
    propagate(target) {
        this.outputs.forEach((neuron, i) => neuron.propagate(target[i])); for (var i = this.hiddenLayers.length - 1; i >= 0; i--) { var layer = this.hiddenLayers[i]; layer.forEach(neuron => neuron.propagate()); }
        return this.inputs.forEach(neuron => neuron.propagate());
    }
    saveTraining() { var savedTraining = []; savedTraining.push(this._saveLayer(this.inputs)); this.hiddenLayers.forEach(layer => { savedTraining.push(this._saveLayer(layer)); }); savedTraining.push(this._saveLayer(this.outputs)); return savedTraining; }
    loadTraining(savedTraining) { this._loadLayer(savedTraining[0], this.inputs); this.hiddenLayers.forEach((layer, i) => { this._loadLayer(savedTraining[i + 1], layer); }); this._loadLayer(savedTraining[this.hiddenLayers.length + 1], this.outputs); }
    _saveLayer(layer) { var savedLayer = []; layer.forEach(neuron => { var savedNeuron = []; savedNeuron.push(neuron.bias); var incomingWeights = Object.values(neuron.incoming.weights); savedNeuron.push(incomingWeights); var outgoingWeights = Object.values(neuron.outgoing.weights); savedNeuron.push(outgoingWeights); savedLayer.push(savedNeuron); }); return savedLayer; }
    _loadLayer(savedLayer, neuronObjs) { for (var i = 0; i < neuronObjs.length; i++) { var neuron = neuronObjs[i]; var values = savedLayer[i]; neuron.bias = values.shift(); setValues(neuron.incoming.weights, values[0]); setValues(neuron.outgoing.weights, values[1]); } }
    _connect2Layers(layer1, layer2) { layer1.forEach(neuron => { layer2.forEach(neuron2 => { neuron.connect(neuron2); }); }); }
}
spnr.Neuron = class {
    constructor(bias = spnr.randflt(-1, 1)) {
        this.id = spnr.uniqueId(); this.bias = bias; this.incoming = { weights: {}, targets: {} }
        this.outgoing = { weights: {}, targets: {} }
        this._output; this.output; this.error;
    }
    connect(neuron, weight = spnr.randflt(0, 1)) {
        this.outgoing.targets[neuron.id] = neuron; neuron.incoming.targets[this.id] = this; neuron.incoming.weights[this.id] = weight; if (neuron.incoming.weights[this.id] == undefined) { this.outgoing.weights[neuron.id] = spnr.randflt(-1, 1); }
        else { this.outgoing.weights[neuron.id] = weight; }
    }
    activate(input) {
        if (input != undefined) { this._output = 1; this.output = input; }
        else { var targetIds = Object.keys(this.incoming.targets); var sum = targetIds.reduce((total, target) => { return total += this.incoming.targets[target].output * this.incoming.weights[target]; }, this.bias); this._output = spnr.invSigmoid(sum); this.output = spnr.sigmoid(sum); }
        return this.output;
    }
    propagate(target, rate = 0.3) {
        var outgoingIds = Object.keys(this.outgoing.targets); if (target == undefined) { var sum = outgoingIds.reduce((total, target, index) => { var targetObj = this.outgoing.targets[target]; this.outgoing.weights[target] -= rate * targetObj.error * this.output; this.outgoing.targets[target].incoming.weights[this.id] = this.outgoing.weights[target]; total += targetObj.error * this.outgoing.weights[target]; return total; }, 0); }
        else { var sum = this.output - target; }
        this.error = sum * this._output
        this.bias -= rate * this.error; return this.error;
    }
}
spnr.GameEngine = class {
    static pixiApp; static canvasSize; static globalPosition; static globalAngle; static globalScale; static crntScene; static crntCanvasSizer; static deltaTime; static init(canvasSize, globalScale, backgroundColor = 0x000000) { spnr.internalWarn('spnr.GameEngine is an undocumented, untested festure. Use with caution'); this.globalPosition = spnr.v(0, 0); this.globalAngle = 0; this.setGlobalScale(globalScale); this.createPixiApp(canvasSize, backgroundColor); this.deselectCrntScene(); this.keyboard = new spnr.KeyWatcher(); this.mouse = new spnr.MouseWatcher(this.pixiApp.view); }
    static createPixiApp(canvasSize, backgroundColor) { this.pixiApp = new PIXI.Application({ width: canvasSize.x * this.globalScale, height: canvasSize.y * this.globalScale, backgroundColor: backgroundColor, resolution: window.devicePixelRatio || 1 }); document.body.appendChild(this.pixiApp.view); this.pixiApp.ticker.add(() => this.update()); this.pixiApp.stage.pivot.set(0.5, 0.5); this.setCanvasSize(canvasSize); this.setGlobalScale(this.globalScale); }
    static setCanvasSize(size) { this.canvasSize = spnr.v.copy(size); this.pixiApp.view.width = this.canvasSize.x * this.globalScale; this.pixiApp.view.height = this.canvasSize.y * this.globalScale; this.pixiApp.renderer.resize(this.canvasSize.x * this.globalScale, this.canvasSize.y * this.globalScale) }
    static selectCanvasSizer(canvasSizer = null) { this.crntCanvasSizer = canvasSizer; }
    static setGlobalScale(scale) {
        this.globalScale = scale; if (this.pixiApp != undefined) { this.pixiApp.stage.scale.set(this.globalScale, this.globalScale); }
        if (this.canvasSize != undefined) { this.setCanvasSize(this.canvasSize); }
    }
    static removeChildrenFromPixiApp() { while (this.pixiApp.stage.children.length > 0) { this.pixiApp.stage.removeChild(this.pixiApp.stage.children[0]); } }
    static get backgroundColor() { return this.pixiApp.renderer.backgroundColor; }
    static setBackgroundColor(color) { this.pixiApp.renderer.backgroundColor = color; }
    static selectScene(scene) { this.deselectCrntScene(); this.crntScene = scene; if (scene != null) { scene.select(this.pixiApp); scene.setParent(this); } }
    static deselectCrntScene() {
        if (this.crntScene != null) { this.crntScene.deselect(); this.removeChildrenFromPixiApp(); }
        this.crntScene = null;
    }
    static get entitiesInScene() {
        if (this.crntScene != null) { return this.crntScene.flattenedChildList; }
        else { return []; }
    }
    static getEntitiesWithName(name) { var searchResults = []; this.entitiesInScene.forEach(entity => { if (entity.name == name) searchResults.push(entity); }); return searchResults; }
    static getEntitiesWithoutName(name) { var searchResults = []; this.entitiesInScene.forEach(entity => { if (entity.name != name) searchResults.push(entity); }); return searchResults; }
    static getEntitiesWithNames(names) { var searchResults = []; this.entitiesInScene.forEach(entity => { for (var name of names) { if (entity.name == name) { searchResults.push(entity); break; } } }); return searchResults; }
    static getEntitiesWithTag(tag) { var searchResults = []; this.entitiesInScene.forEach(entity => { if (entity.tags.includes(tag)) searchResults.push(entity); }); return searchResults; }
    static getEntitiesWithTags(tags) { var searchResults = []; this.entitiesInScene.forEach(entity => { for (var tag of tags) { if (entity.tags.includes(tag)) { searchResults.push(entity); break; } } }); return searchResults; }
    static update() {
        this.deltaTime = this.pixiApp.ticker.elapsedMS / 1000; if (this.crntScene != null) { this.crntScene.internalUpdate(); }
        if (this.crntCanvasSizer != null) { this.crntCanvasSizer.updateCanvasSize(); }
        this.mouse.scale = this.globalScale;
    }
}
spnr.GameEngine.Entity = class {
    constructor(name, localPosition, localAngle) { this.rename(name); this.setLocalPosition(localPosition); this.setLocalAngle(localAngle); this.tags = []; this.children = []; this.containingScene = null; }
    rename(name) { this.name = name; }
    addTag(tag) { this.tags.push(tag); }
    addTags(tagArray) { this.tags.push(...tagArray); }
    removeTag(tag) { spnr.arr.removeItem(this.tags, tag); }
    get globalPosition() { var rotatedLocalPosition = spnr.v.copy(this.localPosition); spnr.v.rotate(rotatedLocalPosition, this.parent.localAngle); return spnr.v.copyAdd(this.parent.globalPosition, rotatedLocalPosition); }
    setLocalPosition(position) { this.localPosition = spnr.v.copy(position); }
    setGlobalPosition(position) { this.setLocalPosition(spnr.v.copySub(position, this.parent.globalPosition)); }
    get globalAngle() { return this.parent.globalAngle + this.localAngle; }
    setLocalAngle(angle) { this.localAngle = angle; }
    setGlobalAngle(angle) { this.setLocalAngle(angle - this.parent.globalAngle); }
    get isInScene() { return this.containingScene != null; }
    setContainingScene(scene) {
        this.containingScene = scene; if (this.containingScene != null) { this.containingScene.flattenedChildList.push(this); }
        this.setChildrensContainingScene(scene);
    }
    setChildrensContainingScene(scene) { this.children.forEach(child => { child.setContainingScene(scene); }); }
    removeFromContainingScene() {
        this.removeChildrenFromContainingScene(); if (this.containingScene != null) { spnr.arr.removeItem(this.containingScene.flattenedChildList, this); }
        this.containingScene = null;
    }
    removeChildrenFromContainingScene() { this.children.forEach(child => { child.removeFromContainingScene(); }); }
    removeChildren() { while (this.children.length > 0) { this.removeChild(this.children[0]); } }
    addChild(entity) {
        if (this.children.includes(entity)) { spnr.internalWarn(`Could not add entity '${entity.name}' to entity '${this.name}' as it is already a child`); return false; }
        else { this.children.push(entity); entity.setParent(this); return true; }
    }
    removeChild(entity) {
        var indexOfEntity = this.children.indexOf(entity); if (indexOfEntity == -1) { spnr.internalWarn(`Could not remove entity '${entity.name}' from entity '${this.name}' as it is not a child`); return false; }
        else { spnr.arr.removeItem(this.children, entity); entity.removeFromContainingScene(); entity.removeParent(); return true; }
    }
    setParent(parent) {
        this.parent = parent; if (this.parent != null) { if (this.parent.isInScene) { this.setContainingScene(this.parent.containingScene); } }
        else { this.setContainingScene(null); }
    }
    removeParent() { this.setParent(null); this.setContainingScene(null); }
    updateChildren() { this.children.forEach(child => { child.internalUpdate(); }); }
    internalUpdate() { this.updateChildren(); this.update(); }
    update() { }
}
spnr.GameEngine.Scene = class extends spnr.GameEngine.Entity {
    constructor(name, localPosition = spnr.v(0, 0), localAngle = 0) { super(name, localPosition, localAngle); this.pixiContainer = new PIXI.Container(); this.isSelected = false; this.flattenedChildList = []; }
    get globalAngle() { return 0; }
    setBackgroundSound(sound) { this.backgroundSound = sound; spnr.internalLog('Does this need a copy or something?'); if (this.isSelected) { this.startBackgroundSound(); } }
    startBackgroundSound() { if (this.backgroundSound != null) { this.backgroundSound.loop(); } }
    stopBackgroundSound() { if (this.backgroundSound != null) { this.backgroundSound.stop(); } }
    addChild(child) { var inheritedFunc = spnr.GameEngine.Entity.prototype.addChild.bind(this); var childAdded = inheritedFunc(child); if (childAdded) { child.setContainingScene(this); } }
    onSelected() { }
    select(pixiApp) { this.isSelected = true; this.parentAppPointer = pixiApp; pixiApp.stage.addChild(this.pixiContainer); this.startBackgroundSound(); this.onSelected(); }
    onDeselected() { }
    deselect() { this.isSelected = false; this.parentAppPointer.stage.removeChild(this.pixiContainer); this.parentAppPointer = null; this.stopBackgroundSound(); this.onDeselected(); }
    setParent(gameEngine) { this.parent = gameEngine; }
    internalUpdate() { this.updateChildren(); this.update(); this.pixiContainer.rotation = this.localAngle; }
}
spnr.GameEngine.Texture = {}; spnr.GameEngine.Texture.fromUrl = function (url) { return PIXI.Texture.from(url); }
spnr.GameEngine.DrawableEntity = class extends spnr.GameEngine.Entity {
    constructor(name, localPosition, localAngle, texture, textureSize, anchor = spnr.v(0.5, 0.5)) { super(name, localPosition, localAngle); this.setTexture(texture, textureSize); this.setAnchor(anchor); this.setTint(0xffffff); this.setupMouseInteraction(); }
    setupMouseInteraction() {
        if (this.mouseHovering == undefined) this.mouseHovering = false; this.sprite.interactive = true; if (this.mouseDownCallbacks == undefined) { this.mouseDownCallbacks = new spnr.FunctionGroup(); }
        this.sprite.mousedown = data => this.mouseDownCallbacks.call(data); this.sprite.touchstart = data => this.mouseDownCallbacks.call(data); if (this.mouseUpCallbacks == undefined) { this.mouseUpCallbacks = new spnr.FunctionGroup(); }
        this.sprite.mouseup = data => this.mouseUpCallbacks.call(data); this.sprite.touchend = data => this.mouseUpCallbacks.call(data); if (this.mouseOverCallbacks == undefined) { this.mouseOverCallbacks = new spnr.FunctionGroup(); }
        this.sprite.mouseover = data => { this.mouseHovering = true; this.mouseOverCallbacks.call(data); }
        this.mouseOutCallbacks = new spnr.FunctionGroup(); this.sprite.mouseout = data => { this.mouseHovering = false; this.mouseOutCallbacks.call(data); }
    }
    getGlobalCornerPositions() { var globalPosition = this.globalPosition; var topLeftPos = spnr.v(this.textureSize.x * -(1 - this.anchor.x), this.textureSize.y * -(1 - this.anchor.y)); spnr.v.rotate(topLeftPos, this.localAngle); spnr.v.add(topLeftPos, globalPosition); var topRightPos = spnr.v(this.textureSize.x * this.anchor.x, this.textureSize.y * -(1 - this.anchor.y)); spnr.v.rotate(topRightPos, this.localAngle); spnr.v.add(topRightPos, globalPosition); var bottomRightPos = spnr.v(this.textureSize.x * this.anchor.x, this.textureSize.y * this.anchor.y); spnr.v.rotate(bottomRightPos, this.localAngle); spnr.v.add(bottomRightPos, globalPosition); var bottomLeftPos = spnr.v(this.textureSize.x * -(1 - this.anchor.x), this.textureSize.y * this.anchor.y); spnr.v.rotate(bottomLeftPos, this.localAngle); spnr.v.add(bottomLeftPos, globalPosition); return [topLeftPos, topRightPos, bottomRightPos, bottomLeftPos]; }
    setTextureSize(size) { this.textureSize = spnr.v.copy(size); this.sprite.width = this.textureSize.x; this.sprite.height = this.textureSize.y; }
    setContainingScene(scene) { this.containingScene = scene; if (scene != null) { scene.pixiContainer.addChild(this.sprite); this.setChildrensContainingScene(scene); this.containingScene.flattenedChildList.push(this); } }
    removeFromContainingScene() {
        if (this.containingScene != null) { this.containingScene.pixiContainer.removeChild(this.sprite); this.removeChildrenFromContainingScene(); spnr.arr.removeItem(this.containingScene.flattenedChildList, this); }
        this.containingScene = null;
    }
    setTexture(texture, textureSize = this.textureSize) {
        if (this.sprite != undefined) { var containingScene = this.containingScene; var anchor = this.sprite.anchor; if (containingScene != undefined) { this.removeFromContainingScene(); } }
        this.sprite = new PIXI.Sprite(texture); this.setTextureSize(textureSize); this.setupMouseInteraction(); if (this.parent != null) this.updateSpritePosition(); if (this.tint != undefined) { this.setTint(this.tint); }
        if (containingScene != undefined) { this.setContainingScene(containingScene); }
        if (anchor != undefined) { this.setAnchor(anchor); }
    }
    setAnchor(position) { this.anchor = spnr.v.copy(position); this.sprite.anchor.x = position.x; this.sprite.anchor.y = position.y; }
    setTint(tint) { this.sprite.tint = tint; }
    get tint() { return this.sprite.tint; }
    setVisible(state) { this.sprite.visible = state; }
    get visible() { return this.sprite.visible; }
    setAlpha(alpha) { this.sprite.alpha = alpha; }
    get alpha() { return this.sprite.alpha; }
    updateSpritePosition() { var globalPosition = this.globalPosition; this.sprite.position.set(globalPosition.x, globalPosition.y); this.sprite.rotation = this.globalAngle + spnr.PI; }
    internalUpdate() { this.updateSpritePosition(); this.updateChildren(); this.update(); }
}
spnr.GameEngine.Label = class extends spnr.GameEngine.Entity {
    constructor(name, text, localPosition, localAngle, format = {}, anchor = spnr.v(0.5, 0.5)) { super(name, localPosition, localAngle); this.setTextFormat(format); this.setText(text); this.setAnchor(anchor); }
    setContainingScene(scene) { this.containingScene = scene; if (scene != null) { scene.pixiContainer.addChild(this.textSprite); this.setChildrensContainingScene(scene); this.containingScene.flattenedChildList.push(this); } }
    removeFromContainingScene() {
        if (this.containingScene != null) { this.containingScene.pixiContainer.removeChild(this.textSprite); this.removeChildrenFromContainingScene(); spnr.arr.removeItem(this.containingScene.flattenedChildList, this); }
        this.containingScene = null;
    }
    setTextFormat(format) { this.textFormat = spnr.obj.oneLevelCopy(format); if (this.text != undefined) { this.updateTextSprite(); } }
    setText(text) { this.text = text; if (this.text != undefined) { this.updateTextSprite(); } }
    setAnchor(position) { this.textSprite.anchor.x = position.x; this.textSprite.anchor.y = position.y; }
    setVisible(state) { this.textSprite.visible = state; }
    internalUpdate() { this.updateChildren(); this.update(); var globalPosition = this.globalPosition; this.textSprite.position.set(globalPosition.x, globalPosition.y); this.textSprite.rotation = this.globalAngle + spnr.PI; }
    updateTextSprite() {
        if (this.textSprite != undefined) {
            if (this.textSprite.parent != undefined) { var oldParent = this.textSprite.parent; oldParent.removeChild(this.textSprite); }
            var oldAnchor = this.textSprite.anchor;
        }
        this.textSprite = new PIXI.Text(this.text, this.textFormat); if (oldAnchor != undefined) { this.setAnchor(oldAnchor); }
        if (oldParent != undefined) { oldParent.addChild(this.textSprite); }
    }
}
spnr.GameEngine.Button = class extends spnr.GameEngine.DrawableEntity { constructor(name, localPosition, localAngle, size, background = null, text = '', textFormat = {}, anchor) { if (background === null) background = PIXI.Texture.Empty; super(name, localPosition, localAngle, background, size, anchor); this.label = new spnr.GameEngine.Label(this.name + ' label', text, spnr.v(0, 0), 0, textFormat); this.addChild(this.label) } }
spnr.GameEngine.colliderTypes = { circle: 'circle' }
spnr.GameEngine.BaseCollider = class extends spnr.GameEngine.Entity { constructor(name, type, localPosition, localAngle) { super(name, localPosition, localAngle); this.type = type; this.colliding = false; this.collideStartCallbacks = new spnr.FunctionGroup(); this.collideEndCallbacks = new spnr.FunctionGroup(); } }
spnr.GameEngine.CircleCollider = class extends spnr.GameEngine.BaseCollider {
    constructor(name, localPosition, radius) { super(name, spnr.GameEngine.colliderTypes.circle, localPosition, 0); this.radius = radius; }
    isTouching(collider) { switch (collider.type) { case spnr.GameEngine.colliderTypes.circle: var distSq = spnr.v.distSq(this.globalPosition, collider.globalPosition); return (distSq < this.radius ** 2 + collider.radius ** 2); } }
}
spnr.GameEngine.Particle = class extends spnr.GameEngine.DrawableEntity {
    static airFrictionMult = 0.001; constructor(name, localPosition, localAngle, texture, size, velocity, timeToLive, effectorStrengths) { super(name, localPosition, localAngle, texture, size); this.addTag('Particle'); this.velocity = spnr.v.copy(velocity); this.timeToLive = timeToLive; this.effectorStrengths = effectorStrengths; this.acceleration = spnr.v(0, 0); }
    feelEffectors() {
        if (this.effectorStrengths.gravity) { var forceVector = spnr.v(0, this.effectorStrengths.gravity); spnr.v.rotate(forceVector, this.effectorStrengths.gravityDirection); spnr.v.add(this.acceleration, forceVector); }
        if (this.effectorStrengths.airFriction) { var dragAmount = spnr.v.mag(this.velocity); dragAmount *= dragAmount; dragAmount *= this.effectorStrengths.airFriction * spnr.GameEngine.Particle.airFrictionMult; var dragVector = spnr.v.copy(this.velocity); spnr.v.normalize(dragVector); spnr.v.mult(dragVector, dragAmount); spnr.v.sub(this.acceleration, dragVector); }
    }
    update() { if (this.timeToLive < 0) this.parent.removeChild(this); if (this.effectorStrengths) this.feelEffectors(); spnr.v.mult(this.acceleration, spnr.GameEngine.deltaTime); spnr.v.add(this.velocity, this.acceleration); var distToMove = spnr.v.copyMult(this.velocity, spnr.GameEngine.deltaTime); spnr.v.add(this.localPosition, distToMove); spnr.v.makeZero(this.acceleration); this.timeToLive -= spnr.GameEngine.deltaTime; }
}
spnr.GameEngine.ParticleEffect = class extends spnr.GameEngine.Entity {
    timer = 0; playing = false; particlesRemaining = 0; hasPlayed = false; constructor(name, localPosition, localAngle, emitterData, looping = false, deleteWhenFinished = false) { super(name, localPosition, localAngle); this.emitterData = emitterData; this.looping = looping; this.deleteWhenFinished = deleteWhenFinished; }
    play() { if (!this.looping) this.removeChildren(); this.timer = this.emitterData.delay || 0; this.playing = true; this.particlesRemaining = this.emitterData.amount; }
    addParticle() {
        var particleTemplate = this.emitterData.particleTemplate; if (particleTemplate.tint === undefined) particleTemplate.tint = 0xffffff; var position = spnr.v(0, 0); var size = spnr.v.random(particleTemplate.minSize, particleTemplate.maxSize); var timeToLive = spnr.randflt(particleTemplate.minTimeToLive, particleTemplate.maxTimeToLive); var angle = 0; var velocity = spnr.v(0, 0); switch (this.emitterData.shape) { case 'circle': angle = spnr.randflt(0, spnr.PI * 2); velocity = spnr.v(0, spnr.randflt(particleTemplate.minSpeed, particleTemplate.maxSpeed)); spnr.v.rotate(velocity, angle); break; case 'arc': angle = spnr.randflt(this.emitterData.minAngle, this.emitterData.maxAngle); velocity = spnr.v(0, spnr.randflt(particleTemplate.minSpeed, particleTemplate.maxSpeed)); spnr.v.rotate(velocity, angle); break; case 'line': void 0; break; }
        var particle = new spnr.GameEngine.Particle('particle', position, angle, particleTemplate.texture, size, velocity, timeToLive, particleTemplate.effectorStrengths); particle.setTint(particleTemplate.tint); this.particlesRemaining--; this.addChild(particle); if (this.emitterData.interval == 0 && this.particlesRemaining > 0) { this.addParticle(); }
    }
    update() {
        if (this.playing) {
            if (this.particlesRemaining > 0) { this.timer -= spnr.GameEngine.deltaTime; if (this.timer < 0) { this.addParticle(); this.timer = this.emitterData.interval; } }
            else {
                this.hasPlayed = true; if (this.looping) this.play()
                else this.playing = false;
            }
        }
        if (this.deleteWhenFinished && this.children.length == 0 && this.hasPlayed) { this.parent.removeChild(this); }
    }
}
spnr.GameEngine.AbstractCanvasSizer = class { updateCanvasSize() { throw Error('Method "calcCanvasSize" not overwritten in class ' + 'extending from AbstractCanvasSizer'); } }
spnr.GameEngine.FixedARCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    constructor(targetSize, padding, minScale = 0, maxScale = Infinity) { super(); this.targetSize = spnr.v.copy(targetSize); this.padding = spnr.v.copy(padding); this.minScale = minScale; this.maxScale = maxScale; }
    updateCanvasSize() {
        var targetAspectRatio = this.targetSize.x / this.targetSize.y; var availableArea = spnr.v.copySub(spnr.dom.viewportSize(), this.padding); var availableAspectRatio = availableArea.x / availableArea.y; if (targetAspectRatio > availableAspectRatio) { var sizeMult = availableArea.x / this.targetSize.x; }
        else { var sizeMult = availableArea.y / this.targetSize.y; }
        spnr.GameEngine.setCanvasSize(this.targetSize); spnr.GameEngine.setGlobalScale(sizeMult);
    }
}
spnr.GameEngine.FillPageCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    constructor(padding) { super(); this.padding = spnr.v.copy(padding); }
    updateCanvasSize() { var size = spnr.v.copySub(spnr.dom.viewportSize(), this.padding); spnr.GameEngine.setGlobalScale(1); spnr.GameEngine.setCanvasSize(size); }
}