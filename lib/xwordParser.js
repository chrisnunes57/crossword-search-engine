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
            const tokens = clue.split(" ");
            // get rid of number at beginning of clue
            tokens.splice(0, 1);
            for (const token of tokens) {
                words.push({
                    word: this.cleanToken(token),
                    text: clue
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

    getGridWords(board, words) {

        // we need to loop through grid. we construct a string until we hit a blank space or the edge of grid
        // each grid entry is a tuple object, we don't care about index one (it's my solve timestamp)
        const cells = board["cells"].map( (pair) => {
            delete pair["timestamp"];
            return pair;
        });

        // cells are in a linear array, not a 2d array. pretty annoying. so, we create a 2d array
        // @TODO: add support for non-square crosswords
        const GRID_SIZE = Math.round(Math.sqrt(cells.length));
        
        // check for non-square gridSize
        if (GRID_SIZE * GRID_SIZE !== cells.length) {
            return;
        }
        const grid = this.get2DArrayFromCells(cells);

        // process down and across in one loop
        for (let r = 0; r < GRID_SIZE; r++) {
            const currRowLetters = [];
            const currColLetters = [];
            for (let c = 0; c < GRID_SIZE; c++) {
                currRowLetters.push(grid[r][c]);
                currColLetters.push(grid[c][r]);
            }
            // process the row/col letters
            const rowLetters = currRowLetters.join('');
            const rowWords = rowLetters.split(this.WILDCARD).filter((item) => item !== '');

            const colLetters = currColLetters.join('');
            const colWords = colLetters.split(this.WILDCARD).filter((item) => item !== '');

            for (const word of rowWords) {
                words.push ({
                    "word": word
                });
            }
            for (const word of colWords) {
                words.push ({
                    "word": word
                })
            }
        }
    }

    getWords(xword) {
        // console.log(xword)s
        const words = []

        // need to extract words from across and down clues
        this.parseClueSection(xword["clues"]["across"], words);
        this.parseClueSection(xword["clues"]["down"], words);

        // need to construct words from grid
        this.getGridWords(xword["board"], words);

        return words;
    }
}