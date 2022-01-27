import styles from './Search.module.scss';

function ResultItem({result, term}) {

    const formatDate = (dateString) => {

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const tokens = dateString.split('-');
        const year = tokens[0];
        const month = tokens[1];
        const day = tokens[2];

        return `${months[parseInt(month, 10) - 1]} ${day}, ${year}`;
    }

    const getHighlightedHtml = (text) => {
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(term);
        return `${text.substr(0, index)}<span class="${styles.highlight}">${text.substr(index, term.length)}</span>${text.substr(index + term.length)}`
    };

    return (
        <div className={styles["result-item"]}>
            <p className={styles["result-item-title"]}>{formatDate(result["xword"]["print_date"])}</p>
            <p dangerouslySetInnerHTML={{ __html: getHighlightedHtml(result["text"]) }}></p>
            <hr />
        </div>
    )
}

export default ResultItem
