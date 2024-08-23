import {useState} from 'react'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import ShowsList from '../components/ShowsList';


const HomePage = ({error,seterror}) => {

  const [showsList, setshowsList] = useState([]);

  return (
    <>
    <Hero/>
    <SearchBar setshowsList={setshowsList} seterror={seterror}/>
    <ShowsList showsList={showsList} error={error}/>
    </>
  )
}

export default HomePage