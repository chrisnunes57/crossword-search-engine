import DefaultHead from '../components/DefaultHead';
import Search from '../components/Search';


export default function HomePage(props) {
  return (
    <>
      <DefaultHead />

      <h3>NYT Mini Crossword Search</h3>
      <Search />
    </>
  )
}