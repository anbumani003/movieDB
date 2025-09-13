import React from 'react'
import  Navbar from '../Navbar';
import VerticalCardDesign from '../VerticalCardDesign';
import { getPopularMovies, getTopRatedMovies } from '../../services/Api';

const TopRatedMovies = () => {
  return (
   <>
   <Navbar/>
   <VerticalCardDesign title="Top Rated Movies"  funName={getTopRatedMovies}/>
   </>
  )
}

export default TopRatedMovies
