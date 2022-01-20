import styles from './Search.module.scss';

function Results({results}) {

    return (
        <div className={styles.results}>
            {results.map( (result, i) => {
                return <p key={i}>{result.date}</p>
            })}
        </div>
    )
}

export default Results
