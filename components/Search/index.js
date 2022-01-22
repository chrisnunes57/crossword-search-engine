import styles from './Search.module.scss';
import { useState } from "react";
import Results from './Results';
import { server } from '../../config';

function Search() {

    const [matchingPuzzles, updateMatchingPuzzles] = useState([]);
    const [matchingKeys, updateMatchingKeys] = useState([]);

    const handleInput = async (e) => {

        let query = e.target.value;
        query = query.replaceAll(' ', '');

        const resp = await fetch(`${server}/api/query?term=${query.toLowerCase()}`);
        const data = await resp.json();

        updateMatchingPuzzles(data["results"] ? data["results"] : []);
        updateMatchingKeys(data["keys"] ? data["keys"] : []);
    }

    return (
        <div className={styles.search}>
            <input type="text" placeholder="Enter a query..." onInput={handleInput} />
            <Results results={matchingPuzzles} keys={matchingKeys} />
        </div>
    )
}

export default Search
