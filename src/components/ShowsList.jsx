import {useEffect, useState} from 'react'
import ShowCard from './ShowCard'

const ShowsList = ({showsList,error}) => {
  return (
    <div>
    {error?<div className='flex flex-row w-full justify-center items-center bg-darkBlue p-8  md:pb-10 font-bold text-white text-xl'>
      Currently unable to search the required item kindly try again after some time :/
    </div>: 
      <div id="shows-list" className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-darkBlue p-10 items-center justify-items-center'>
          {showsList.map((show)=>
                  <ShowCard key={show.imdbId} show={show}/>     
              )}
      </div>}
    </div>
  )
}

export default ShowsList