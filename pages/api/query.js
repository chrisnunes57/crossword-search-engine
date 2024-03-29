import { getReverseIndex } from '../../lib/reverse-index';
import path from "path";

let index = null;

const validateQuery = (req) => {
    // we don't check for much here, just that the query exists and has the "term" parameter
    if (!req.query)
        return false;
    else if (!req.query.term && req.query.term !== "")
        return false;

    return true;
}

export default function handler(req, res) {

    if (!index) {
        // build index, must be first query
        const filePath = path.join(process.cwd(), 'data', 'xwordData.json');
        index = getReverseIndex(filePath);
    }

    if (!validateQuery(req)) {
        // if the query is bad, we return an empty list
        res.status(400).send("Bad query");
        return;
    }

    // hits is the array in which we store all the matching search results
    const searchTerm = req.query.term;
    let hits = (searchTerm.length >= 3 && searchTerm in index) ? index[searchTerm] : []; 
    const keys = [];

    if (!hits) {
        hits = [];
    }

    // if the search term is long enough, we search for partial matches
    // we need the length limit, bc a single letter query will match thousands of results
    if (searchTerm.length >= 3) {
        for (const key of Object.keys(index)) {
            if (key.startsWith(req.query.term) && key !== req.query.term) {
                hits.push(...index[key]);
                keys.push(key);
            }
        }
    }

    // we should also return a list of matching keys, along with results
    if (index[req.query.term]) {
        keys.push(req.query.term);
    }

    if (hits) {
        hits.sort((a, b) => {
            // compare word length first
            const diffA = Math.abs(a.length - req.query.term.length);
            const diffB = Math.abs(b.length - req.query.term.length);
            
            if (diffB - diffA !== 0) {
                return diffB - diffA;
            }

            // then compare date of publish
            const d1 = Date.parse(a["xword"]["print_date"]);
            const d2 = Date.parse(b["xword"]["print_date"]);
            return d2 - d1;
        });
    }

    const result = {
        keys: keys,
        results: hits
    }

    res.status(200).json(result);
}
