import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, options } from '../utils/fetchData';
import ClipLoader from 'react-spinners/ClipLoader';

const ShowDetails = () => {
  const [error, seterror] = useState(false)
  const [showInfo, setShowInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [bg1, setBg1] = useState(false);
  const [bg2, setBg2] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 200, left: 100, behavior: 'smooth' });

    const getshowInfo = async () => {
      try {
        const res = await fetchData(`https://streaming-availability.p.rapidapi.com/shows/${id}?output_language=en&country=in`, options);
        if(!res){
        throw new Error();
        }
        else
        {
        setShowInfo(res);
      }
      } catch (error) {
        seterror(true);
      } finally {
        setLoading(false);
      }
    };

    getshowInfo();
  }, [id]);

  useEffect(() => {
    if (Object.keys(showInfo).length > 0) {
      // Check if the horizontalBackdrop exists
      setBg1(!!showInfo.imageSet?.horizontalBackdrop?.w720);
      // Check if the verticalBackdrop exists
      setBg2(!!showInfo.imageSet?.verticalBackdrop?.w360);
    }
  }, [showInfo]);

  return (
    loading ? (
      <div className='flex bg-darkBlue p-10 w-full justify-center items-center h-[800px]'>
        <ClipLoader
          color='#fff'
          loading={loading}
          cssOverride={{ display: 'block' }}
          size={200}
        />
      </div>
    ) : ( error?<div className='flex bg-darkBlue p-10 w-full justify-center items-center h-[800px]'>
      <div className=" text-white text-xl">Can't seem to load data please try again after some time :/</div>
    </div>:<div className='flex flex-col w-full h-full bg-[#000]'>
        {/* Background Images */}
        {!bg1 ? <div className='flex w-[720px] h-[800px] bg-[#000] hidden lg:block'></div> : <img src={showInfo.imageSet.horizontalBackdrop.w720} alt="" className='opacity-25 hidden lg:block' />}
        {!bg2 ? <div className='flex w-[360px] h-[1400px] bg-[#000] lg:hidden'></div> : <img src={showInfo.imageSet.verticalBackdrop.w360} alt="" className='opacity-25 lg:hidden' />}

        <div className="flex flex-col absolute p-8 justify-start items-start space-y-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:items-center sm:space-y-8">
            <div className="flex flex-col mt-20 text-white justify-start space-y-8">
              <div className="lg:text-7xl font-bold text-6xl show-title-text">{showInfo.title}</div>
              <div className="text-2xl font-bold"> <span className='text-pink'>Rating: </span>{showInfo.rating}</div>
              {showInfo.showType === "movie" ? (
                <div className='text-lg lg:text-xl lg: font-bold'>
                  <div> <span className='text-pink'>Release Year: </span>{showInfo.releaseYear}</div>
                  <div className=""> <span className='text-pink'>Runtime: </span>{showInfo.runtime} mins</div>
                </div>
              ) : (
                <div className='text-lg lg:text-xl lg: font-bold'>
                  <div> <span className='text-pink'>Release Year: </span>{showInfo.firstAirYear}</div>
                  <div className=""> <span className='text-pink'>Number of seasons: </span>{showInfo.seasonCount}</div>
                  <div className=""> <span className='text-pink'>Number of episodes: </span>{showInfo.episodeCount}</div>
                </div>
              )}
            </div>
            <div className="flex mt-20 text-white text-justify w-full items-end">
              <p className='lg:text-xl lg:font-bold lg:ml-32 text-md'>{showInfo.overview}</p>
            </div>
          </div>

          {showInfo.showType === "movie" ? (
            <div className="flex flex-col my-5 font-bold text-white justify-start lg:text-xl text-lg">
              <span className='text-pink'>Director(s): </span>{showInfo.directors.map((dir, index) => <span key={index}>{dir}</span>)}
            </div>
          ) : null}

          <div className="flex flex-col font-bold text-white justify-start lg:text-xl text-lg">
            <span className='text-pink lg:text-xl'>
              Cast:
            </span>
            <div className="lg:flex-row">
              {showInfo.cast.map((actor, index) => <span key={index}>{actor}, </span>)}
            </div>
          </div>

          <div className="flex flex-col my-5 font-bold text-white justify-start">
            <span className='text-pink lg:text-xl text-lg mb-3'>Streaming Availability:</span>
            <div className="flex flex-col space-x-3 lg:flex-row lg:space-x-8 md:pb-10">
              {showInfo.streamingOptions?.in ? [...new Map(showInfo.streamingOptions.in.map(stream => [stream.service.id, stream])).values()]
                .slice(0, 4)
                .map((stream) => (
                  <a href={stream.link} key={stream.service.id} className='flex rounded-lg p-2 transform transition-transform duration-300 hover:-translate-y-2  hover:shadow-xl hover:shadow-pink justify-center' target="_blank" rel="noopener noreferrer">
                    <img src={stream.service.imageSet.darkThemeImage} alt={stream.service.name} className='' />
                  </a>
                )) : <div className='text-lg lg:text-xl lg: font-bold'>Can't seem to find any available streaming options :/</div>}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ShowDetails;
