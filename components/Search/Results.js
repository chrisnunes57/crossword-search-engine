import ResultItem from './ResultItem';
import styles from './Search.module.scss';

function Results({keys, results, query}) {
    return (
        <div className={styles.results}>
            {results.map( (result, i) => {
                return <ResultItem result={result} term={query} key={i} />
            })}
            {results.length < 3 && 
                (query.length < 3 ? <p> Enter a query longer than 2 letters</p> : <p>No results found</p>)}
        </div>
    )
}
export default Results
