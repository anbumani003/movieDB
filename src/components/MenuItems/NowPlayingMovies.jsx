import React from 'react'
import  Navbar from '../Navbar';
import VerticalCardDesign from '../VerticalCardDesign';
import { getPopularMovies, theatreRunningMovies } from '../../services/Api';

const NowPlayingMovies = () => {
  return (
   <>
   <Navbar/>
   <VerticalCardDesign title="Theatre Running Movies"  funName={theatreRunningMovies}/>
   </>
  )
}

export default NowPlayingMovies
