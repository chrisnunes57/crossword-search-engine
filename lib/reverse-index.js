import { xwordParser } from './xwordParser';
const fs = require('fs');

export function getReverseIndex(dataFile) {
    const crosswordData = dataFile;

    const index = {};

    // we need to map each word to a list of crosswords that contain it
    for (const xword of crosswordData) {

        // only process solved crosswords
        if (xword.solved) {
            const parser = new xwordParser();
            const words = parser.getWords(xword);

            for (const word of words) {
                // @TODO: why does "lengt" return results, but not "length"?
                // @TODO: error message for queries shorter than 3 characters
                const lowerWord = word["word"].toLowerCase();
                if (!index[lowerWord]) {
                    index[lowerWord] = [];
                }

                // add some minimal puzzle details to results
                // @TODO: include the relevant text in the response
                const result = {
                    xword: xword,
                    text: word["text"]
                }
                index[lowerWord].push(result);
            }
        }
    }

    return index;
}

export function getWords() {
    const index =  getReverseIndex();
    const words = [];

    for (const key of Object.keys(index)) {
        words.push(key);
    }

    return words;
}