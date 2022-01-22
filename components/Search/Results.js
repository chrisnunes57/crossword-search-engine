import ResultItem from './ResultItem';
import styles from './Search.module.scss';

function Results({keys, results}) {

    console.log(keys)

    return (
        <div className={styles.results}>
            {results.map( (result, i) => {
                return <ResultItem result={result} key={i} />
            })}
            {results.length === 0 && 
                <p>No results found</p>}
        </div>
    )
}

export default Results
