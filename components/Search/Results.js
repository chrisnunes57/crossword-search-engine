import ResultItem from './ResultItem';
import styles from './Search.module.scss';

function Results({keys, results, query}) {
    return (
        <div className={styles.results}>
            {results.map( (result, i) => {
                return <ResultItem result={result} term={query} key={i} />
            })}
            {results.length < 3 && 
                (query.length < 3 ? <p>Enter a word longer than 2 letters to see when it has appeared in the NYT mini crossword!</p> : <p>No results found</p>)}
        </div>
    )
}
export default Results
