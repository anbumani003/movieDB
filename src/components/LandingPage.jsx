import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Genre from './Genre'
import PopularActor from './popularActor'
import CardDesign from './CardDesign'
import { getTopRatedMovies, getTvShow } from '../services/Api';
import Footer from './Footer'


const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <CardDesign title="Top Rated Movies" funName={getTopRatedMovies}/>
    <PopularActor/>
    <CardDesign title="Most Popular Series" funName={getTvShow} type="series"/>
    <Genre/>
    <Footer/>
    </>
  )
}

export default LandingPage
