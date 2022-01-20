import { getReverseIndex } from '../../lib/reverse-index';

const index = getReverseIndex();

export default function handler(req, res) {
    const result = {
        results: index[req.query.term]
    }

    res.status(200).json(result)
}
