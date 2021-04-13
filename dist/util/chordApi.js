"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordApi = void 0;
const axios_1 = __importDefault(require("axios"));
const xml2js_1 = require("xml2js");
const config_1 = require("../config");
class ChordApi {
    constructor() {
        this.base = `https://ukulele-chords.com/get?ak=${config_1.UKULELE_CHORDS_API_KEY}`;
    }
    forChord(chordDto) {
        const AxiosInstance = axios_1.default.create();
        const url = this.base + "&r=" + chordDto.chord + "&typ=" + chordDto.type;
        return AxiosInstance.get(url)
            .then((res) => res.data)
            .then(xml2js_1.parseStringPromise)
            .then((js) => js.uc.chord);
    }
}
exports.ChordApi = ChordApi;
// const chordApi = new ChordApi();
// chordApi.forChord({ chord: "G", type: "major" });
//# sourceMappingURL=chordApi.js.map