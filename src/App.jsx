import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import MovieInfo from './components/MovieInfo'
import ScrollToTop from './helpers/ScrollToTop'
import Person from './components/Person'
import PopularMovies from './components/MenuItems/PopularMovies'
import UpcomingMovies from './components/MenuItems/UpcomingMovies'
import TopRatedMovies from './components/MenuItems/TopRatedMovies'
import NowPlayingMovies from './components/MenuItems/NowPlayingMovies'
import SeriesInfo from './components/SeriesInfo'
import PopularSeries from './components/MenuItems/Series/PopularSeries'
import TopRatedSeries from './components/MenuItems/Series/TopRatedSeries'
import AiringTodaySeries from './components/MenuItems/Series/AiringTodaySeries'
import CurrentlyAiringSeries from './components/MenuItems/Series/CurrentlyAiringSeries'
import GenreCollection from './components/GenreCollection'
import SeriesDetailedInfo from './components/SeriesDetailedInfo'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/spotlight/:id' element={<MovieInfo />} />
        <Route path='/series/:id' element={<SeriesInfo />} />
        <Route path='/season/:id/:seasonId' element={<SeriesDetailedInfo />} />
        <Route path='/person/:id' element={<Person />} />

        {/* --------------     Movies ------------------------- */}

        <Route path="/movies">
          <Route path="popular" element={<PopularMovies />} />
          <Route path="upcoming" element={<UpcomingMovies />} />
          <Route path="top-rated" element={<TopRatedMovies />} />
          <Route path="playing" element={<NowPlayingMovies />} />
        </Route>


        {/* --------------     SERIES ------------------------- */}
        <Route path='/series'>
          <Route path='popular' element={<PopularSeries />} />
          <Route path='top-rated' element={<TopRatedSeries />} />
          <Route path='today-airing' element={<AiringTodaySeries />} />
          <Route path='on-the-air' element={<CurrentlyAiringSeries />} />
        </Route>

             <Route path='genre/:id' element={<GenreCollection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
