import styles from './Search.module.scss';
import { useState } from "react";
import Results from './Results';
import { server } from '../../config';

function Search({words}) {

    const [matchingPuzzles, updateMatchingPuzzles] = useState([]);

    const handleInput = async (e) => {
        // const newWords = index[e.target.value] ? index[e.target.value] : [];
        // updateMatchingPuzzles(newWords);

        const resp = await fetch(`${server}/api/query?term=${e.target.value}`);
        console.log(await resp.json());
    }

    return (
        <div className={styles.search}>
            <input type="text" placeholder="Enter a query..." onInput={handleInput} />
            <Results results={matchingPuzzles} />
        </div>
    )
}

export default Search
