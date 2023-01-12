import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { key } from '../Requests'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const MovieDetails = () => {
    const params = useParams()
    const [movie, setMovie] = useState({})
    const URL = `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${key}&language=en-US`
    const POSTER_URL = `https://image.tmdb.org/t/p/w185${movie?.poster_path}`

    useEffect(()=>{
        axios.get(URL)
        .then(res=>setMovie(res.data))
        .catch(error=>console.log(error))
    },[URL])


    const [like, setLike]= useState(false);
    const {user} = UserAuth();
    const [saved, setSaved] = useState(false);

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () =>{
      if(user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID, {
          savedShows : arrayUnion({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path
          }),
        })
      } else{
        alert('Please log in to save shows!')
      }
    }

    console.log(saved)

  return (
    <>
    <div className='w-full h-[550px] text-white'>
        <div className='w-full h-full'>
            <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
            <div className='absolute top-[20%] right-[20%] shadow-lg'>
            <img className='hidden lg:block border-solid border-white border-4' src={POSTER_URL} alt={movie?.original_title} /></div>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
            <div className='absolute w-full top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
            <div className='my-4'>
                <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                <button className={`border ${like? `text-black bg-slate-300`:  `text-white border-gray-300`} py-2 px-5 ml-4`} onClick={saveShow}>{like? <span>Added</span> : <span>+ Watchlist</span>}</button>
            </div>
            <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{movie?.overview}</p>
            </div>
        </div>
    </div>
    <div className='w-full h-[300px]'>
        <h2 className='text-white font-bold text-3xl mt-10 ml-10'>More Details</h2>
        <hr  className=' w-[300px] sm:w-[600px] mt-3 ml-10'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 ml-10 mt-3 text-white'>
            <p><b>Rating: </b>{movie?.vote_average}</p>
            <p><b>Votes: </b>{movie?.vote_count}</p>
            <p><b>PG: </b>{movie?.adult? 'R': 'PG-10'}</p>
            <p><b>Original Language: </b>{movie?.original_language}</p>
        </div>
    </div>
    </>
  )
}

export default MovieDetails