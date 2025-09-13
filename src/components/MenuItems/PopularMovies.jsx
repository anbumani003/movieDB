import React from 'react'
import  Navbar from '../Navbar';
import VerticalCardDesign from '../VerticalCardDesign';
import { getPopularMovies } from '../../services/Api';

const PopularMovies = () => {
  return (
   <>
   <Navbar/>
   <VerticalCardDesign title="Popular Movies"  funName={getPopularMovies}/>
   </>
  )
}

export default PopularMovies
