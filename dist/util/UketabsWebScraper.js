"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UketabsScraper = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class UketabsScraper {
    constructor() { }
    scrapeSong(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const AxiosInstance = axios_1.default.create();
            return AxiosInstance.get(url)
                .then((res) => res.data)
                .then((html) => {
                const $ = cheerio_1.default.load(html);
                const searchResults = $("ul.archivelist");
                const songs = searchResults["0"].children;
                const amountSongs = songs.length;
                if (!amountSongs)
                    return console.log("No songs found");
                const $1 = cheerio_1.default.load(searchResults.html());
                const _aTagWithImageResults = $1("li a img");
                const songsDto = _aTagWithImageResults.toArray().map((e, i) => {
                    var _a, _b;
                    // console.log(
                    //   e.parent.prev.prev.prev.prev["children"][0].data
                    //     ?.split("\n")[1]
                    //     ?.trim()
                    // );
                    if (e["name"] !== "img")
                        return null;
                    const { href, title } = e["parent"]["attribs"];
                    const image = e["attribs"].src;
                    const artist = (_b = (_a = e.parent.prev.prev.prev.prev["children"][0].data) === null || _a === void 0 ? void 0 : _a.split("\n")[1]) === null || _b === void 0 ? void 0 : _b.trim();
                    return { title, href, image, artist };
                });
                return songsDto;
            })
                .catch((err) => []);
        });
    }
    scrapeChords(url) {
        const AxiosInstance = axios_1.default.create();
        return AxiosInstance.get(url)
            .then((res) => res.data)
            .then((html) => {
            const $ = cheerio_1.default.load(html);
            const searchResults = $("div.chordsinthissong > div.cits-c-b > img");
            const chords = searchResults.toArray().map((e) => {
                if (e.type !== "tag")
                    return null;
                return { chord: e.attribs["alt"] };
            });
            return chords;
        });
    }
    scrapeLyrics(url) {
        const AxiosInstance = axios_1.default.create();
        return AxiosInstance.get(url)
            .then((res) => res.data)
            .then((html) => {
            const $ = cheerio_1.default.load(html);
            const searchResults = $("#ukutabs-song");
            const tbd = searchResults
                .children()
                .toArray()
                .map((e) => {
                var _a;
                return ((_a = e.prev) === null || _a === void 0 ? void 0 : _a.data) || null;
            })
                .filter((e) => e !== null);
            return tbd.join(" ");
        });
    }
}
exports.UketabsScraper = UketabsScraper;
const uketabs = new UketabsScraper();
// uketabs
//   .scrape(
//     "https://ukutabs.com/?s=somewhere+over+the+rainbow+what+a+wonderfull+world"
//   )
//   .then(console.log);
// uketabs
//   .scrapeChords("https://ukutabs.com/n/nirvana/the-man-who-sold-the-world/")
//   .then(console.log);
// uketabs
//   .scrapeLyrics("https://ukutabs.com/n/nirvana/the-man-who-sold-the-world/")
//   .then(console.log);
//# sourceMappingURL=UketabsWebScraper.js.map