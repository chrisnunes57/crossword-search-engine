import DefaultHead from '../components/DefaultHead';
import Search from '../components/Search';
import { getWords } from '../lib/reverse-index';

function HomePage(props) {
  return (
    <>
      <DefaultHead />

      <h3>NYT Mini Crossword Search</h3>
      <Search words={props.words}/>
    </>
  )
}

export async function getStaticProps(context) {

  const words = getWords();

  return {
    props: {
      "words": words
    }
  }
}

export default HomePage
