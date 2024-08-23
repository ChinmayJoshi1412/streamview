import {useState} from 'react'
import { fetchData, options } from '../utils/fetchData';
import Spinner from './Spinner';

const SearchBar = ({setshowsList, seterror}) => {
  const [loading, setloading] = useState(false)
const [search, setsearch] = useState("");

  const onSearchHandle = async()=>{
    console.log(search)
       if(search)
       {
          setloading(true)
          try{ 
           const res = await fetchData(`https://streaming-availability.p.rapidapi.com/shows/search/title?country=in&title=${search}&output_language=en`,options)
           console.log(res);
           if(res){
            setshowsList(res);
           }
           else
           {
              throw new Error(`Error: ${res.status} - ${res.statusText}`);
           }
          }catch(error){
              seterror(error.message);
          }finally{
            setloading(false);
            window.scrollTo({ top: 2000, left: 100, behavior: 'smooth' });
          }
      }
  }

  return (
    <div className='bg-darkBlue'>
      <div className='flex flex-row w-full justify-center items-center bg-darkBlue p-8  md:pb-10 font-bold'>
          <input type='text' value={search} className='rounded-lg p-4 w-1/2 text-lg text-darkBlue' placeholder='Type in..' onChange={(e)=>{setsearch(e.target.value)}} />
          <button className='ml-5 bg-orange p-4 rounded-lg text-white text-lg' onClick={onSearchHandle} > {loading? <Spinner loading={loading}/>:<div>Search</div>}</button>
      </div>
    </div>
  )
}

export default SearchBar