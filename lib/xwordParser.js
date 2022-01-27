export class xwordParser {
    constructor() {
        this.WILDCARD = "*";
    }

    isAlphaNumeric(ch) {
        return /^[A-Za-z0-9]$/i.test(ch);
    }

    cleanToken(token) {
        const chars = token.trim().split('');

        if (!this.isAlphaNumeric(chars[0])) {
            chars.splice(0, 1);
        }

        if (!this.isAlphaNumeric(chars[chars.length - 1])) {
            chars.splice(chars.length - 1, 1);
        }

        return chars.join('');
    }

    parseClueSection(clues, words) {
        for (const clue of clues) {
            const tokens = clue[1].split(" ");
            // get rid of number at beginning of clue
            tokens.splice(0, 1);
            for (const token of tokens) {
                words.push({
                    word: this.cleanToken(token),
                    text: clue[1] + " -> " + clue[0]
                });
            }
        }
    }

    get2DArrayFromCells(cells) {
        const GRID_SIZE = Math.round(Math.sqrt(cells.length));
        const grid = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            grid.push(new Array(GRID_SIZE));
        }

        for (let i = 0; i < cells.length; i++) {
            let r = Math.floor(i / GRID_SIZE);
            let c = i % GRID_SIZE;

            grid[r][c] = cells[i]["guess"] ? cells[i]["guess"] : this.WILDCARD;
        }

        return grid;
    }

    getGridWords(xword, words) {

        const answers = xword["clues"];
        
        for (let i = 0; i < answers["across"].length; i++) {
            words.push({
                word: this.cleanToken(answers["across"][i][0]),
                text: answers["across"][i][1] + " -> " + answers["across"][i][0]
            });
        }

        for (let i = 0; i < answers["down"].length; i++) {
            words.push({
                word: this.cleanToken(answers["down"][i][0]),
                text: answers["down"][i][1] + " -> " + answers["down"][i][0]
            });
        }
        
    }

    getWords(xword) {
        // console.log(xword)s
        const words = []

        // need to extract words from across and down clues
        this.parseClueSection(xword["clues"]["across"], words);
        this.parseClueSection(xword["clues"]["down"], words);

        // need to construct words from grid
        this.getGridWords(xword, words);

        return words;
    }
}