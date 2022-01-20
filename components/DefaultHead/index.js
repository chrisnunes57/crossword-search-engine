import Head from 'next/head'

function DefaultHead() {
    return (
        <Head>
            <title>&apos;Allo, world!</title>
            <meta property="og:title" content="'Allo, world!" key="title" />
        </Head>
    )
}

export default DefaultHead;
