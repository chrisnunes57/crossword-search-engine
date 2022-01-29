import Head from 'next/head'

function DefaultHead() {
    return (
        <Head>
            <title>Mini Crossword Search</title>
            <meta property="og:title" content="Mini Crossword Search" key="title" />

            <meta charSet="utf-8" />
            <meta name="description" content="Search 1000+ mini crosswords for clues and answers" />
            <meta name="author" content="Chris Nunes" />
            <meta name="keywords" content="NYT mini crossword crosswords search engine clue answer" />

            <meta property="og:url" content="https://crossword-search-engine.vercel.app/" />
            <meta property="og:image" content="/img/screencap.png" />
        </Head>
    )
}

export default DefaultHead;
