import React from 'react'
import  Navbar from '../../Navbar';
import VerticalCardDesign from '../../VerticalCardDesign';
import { getPopularSeries } from '../../../services/Api'

const PopularSeries = () => {
  return (
    <>
   <Navbar/>
   <VerticalCardDesign type="series" title="Popular Series"  funName={getPopularSeries}/>
   </>
  )
}

export default PopularSeries
