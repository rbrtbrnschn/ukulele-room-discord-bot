"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UkuleleGoWebScraper = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class UkuleleGoWebScraper {
    constructor() { }
    scrapeProgressions() {
        const AxiosInstance = axios_1.default.create();
        return AxiosInstance.get("https://ukulelego.com/ukulele-chord-progressions/")
            .then((res) => res.data)
            .then((html) => {
            console.log(html);
            const $ = cheerio_1.default.load(html);
            const searchResults = $("ul#chords")["0"];
            // console.log(searchResults);
        });
    }
}
exports.UkuleleGoWebScraper = UkuleleGoWebScraper;
const scraper = new UkuleleGoWebScraper();
scraper.scrapeProgressions();
//# sourceMappingURL=UkuleleGoWebScraper.js.map