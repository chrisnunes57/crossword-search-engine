import { getReverseIndex } from '../../lib/reverse-index';

const index = getReverseIndex();

export default function handler(req, res) {

    // hits is the array in which we store all the matching search results
    let hits = (req.query && req.query.term) ? index[req.query.term] : [];
    const keys = [];

    if (!hits) {
        hits = [];
    }

    // if the search term is long enough, we search for partial matches
    // we need the length limit, bc a single letter query will match thousands of results
    if (req.query.term.length >= 3) {
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
            const d1 = Date.parse(a["xword"]["print_date"]);
            const d2 = Date.parse(b["xword"]["print_date"]);
            return d2 - d1;
        });
    }

    // @TODO: FIX the bug where the hits multiply with repeated searches

    const result = {
        keys: keys,
        results: hits
    }

    res.status(200).json(result)
}
