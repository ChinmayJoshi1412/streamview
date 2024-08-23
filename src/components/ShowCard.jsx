import React from 'react'
import { Link } from 'react-router-dom';
import { fetchData,options } from '../utils/fetchData';

const ShowCard = ({show}) => {
    const year = show.showType=='series'?show.firstAirYear:show.releaseYear;
  return (
    <Link to={`/show/${show.imdbId}`}>
        <div className='flex flex-col w-150 h-78 bg-lightBlue rounded-md p-4 transform transition-transform duration-300 hover:-translate-y-2  hover:shadow-xl hover:shadow-pink space-y-2 text-white font-bold'>
        <img src={show.imageSet.horizontalPoster.w360} alt={show.title} className=''/>
        
            <div className="title-text">{show.title}</div>
            <div className='text-sm'>{year}</div>    
        </div>
    </Link>
  )
}

export default ShowCard