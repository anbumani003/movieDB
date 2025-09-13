import React from 'react'
import  Navbar from './Navbar';
import VerticalCardDesign from './VerticalCardDesign';
import { getGenreBasedMovies } from '../services/Api';
import { useParams } from 'react-router-dom';

const GenreCollection = () => {
     const {id}=useParams();
  return (
   <>
   <Navbar/>
   <VerticalCardDesign title="Genre Based Movies" actorID={id} funName={getGenreBasedMovies}/>
   </>
  )
}

export default GenreCollection
