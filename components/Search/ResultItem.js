import styles from './Search.module.scss';

function ResultItem({result}) {

    const formatDate = (dateString) => {

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const tokens = dateString.split('-');
        const year = tokens[0];
        const month = tokens[1];
        const day = tokens[2];

        return `${months[parseInt(month, 10) - 1]} ${day}, ${year}`;
    }

    return (
        <div className={styles["result-item"]}>
            <p className={styles["result-item-title"]}>{formatDate(result["xword"]["print_date"])}</p>
            <p>{result["text"]}</p>
            <hr />
        </div>
    )
}

export default ResultItem
