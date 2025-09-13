import React from 'react'
import  Navbar from '../../Navbar';
import VerticalCardDesign from '../../VerticalCardDesign';
import { getPopularSeries, getTodayAiringSeries } from '../../../services/Api'

const AiringTodaySeries = () => {
  return (
    <>
   <Navbar/>
   <VerticalCardDesign type="series" title="Today Airing Series"  funName={getTodayAiringSeries}/>
   </>
  )
}

export default AiringTodaySeries
