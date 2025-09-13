import React from 'react'
import  Navbar from '../../Navbar';
import VerticalCardDesign from '../../VerticalCardDesign';
import { getPopularSeries, getTopRatedSeries } from '../../../services/Api'

const TopRatedSeries = () => {
  return (
    <>
   <Navbar/>
   <VerticalCardDesign type="series" title="Top Rated Series"  funName={getTopRatedSeries}/>
   </>
  )
}

export default TopRatedSeries
