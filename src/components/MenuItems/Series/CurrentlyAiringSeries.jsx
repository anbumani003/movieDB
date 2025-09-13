import React from 'react'
import  Navbar from '../../Navbar';
import VerticalCardDesign from '../../VerticalCardDesign';
import { getCurrentlyAiringSeries, getPopularSeries } from '../../../services/Api'

const CurrentlyAiringSeries = () => {
  return (
    <>
   <Navbar/>
   <VerticalCardDesign type="series" title="Currently Airing Series"  funName={getCurrentlyAiringSeries}/>
   </>
  )
}

export default CurrentlyAiringSeries
