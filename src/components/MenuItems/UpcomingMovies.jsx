import React from 'react'
import  Navbar from '../Navbar';
import VerticalCardDesign from '../VerticalCardDesign';
import { getPopularMovies, getUpcomingMovies } from '../../services/Api';

const UpcomingMovies = () => {
  return (
   <>
   <Navbar/>
   <VerticalCardDesign title="Upcoming Movies"  funName={getUpcomingMovies}/>
   </>
  )
}

export default UpcomingMovies
