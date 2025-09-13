import { Api } from './ApiConfig';


// Theatre Running Movies
export const theatreRunningMovies = async () => {
  try {
    const response = await Api.get('movie/now_playing', {
      params: { language: 'en-US', page: 1, region: 'IN' }
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
};


// Movie Genres
export const movieGenre = async () => {
  try {
    const response = await Api.get('genre/movie/list', {
      params: {
        language: 'en-US'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
}

//Popular Actor
export const popularActor = async () => {
  try {
    const response = await Api.get('person/popular', {
      params: {
        language: 'en-US',
        page: 1
      }
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
}


// Get Trailer

export const getTrailer = async (id) => {
  try {
    const response = await Api.get(`movie/${id}/videos`);
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}


// Movie Details based on ID
export const getMovieDetails = async (movieID) => {
  try {
    const response = await Api.get(`movie/${movieID}`);
    return response.data;
  } catch (err) {
    throw err;
  }

}

//Get Streaming Platform Details
export const getPlatformDetails = async (movieId) => {
  try {
    const response = await Api.get(`movie/${movieId}/watch/providers`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

//Cast And Crew
export const getCastDetails = async (movieId) => {
  try {
    const response = await Api.get(`movie/${movieId}/credits`);
    return response.data;
  } catch (err) {
    throw err;
  }
}


//Belongs To Collection
export const getBelongCollection =async (movieID) => {
  try {
    // const response =await Api.get('collection/1231053');
    const response =await Api.get(`collection/${movieID}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}


//Get TV Shows
export const getTvShow=async()=>{
try {
    const response =await Api.get(`tv/popular`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
//Get Top Rated Movies
export const getTopRatedMovies=async()=>{
try {
    const response =await Api.get(`movie/top_rated`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

//Get Movie Details By Actor ID
export const getMovieByActorID=async (actorID)=>{
try {
    // const response =await Api.get(`person/91547/movie_credits`);
    const response =await Api.get(`person/${actorID}/movie_credits`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

                    ///////// -----------------------MENU------------------------------------   //////////////

//Popular Movies
export const getPopularMovies=async ()=>{
try {
    const response =await Api.get(`movie/popular`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

//Upcoming Movies
export const getUpcomingMovies=async ()=>{
try {
    const response =await Api.get(`movie/upcoming`);
    return response.data;
  } catch (err) {
    throw err;
  }
}


            /////////------------------------------TV SHOWS-----------------------------------/////////

// Series Details based on ID
export const getSeriesDetails = async (seriesID) => {
  try {
    // const response = await Api.get(`tv/119051`);
    const response = await Api.get(`tv/${seriesID}`);
    return response.data;
  } catch (err) {
    throw err;
  }

}


// Cast And Crew in Tv Series
export const getSeriesCastCrew = async (seriesID) => {
  try {
    // const response = await Api.get(`tv/119051`);
    const response = await Api.get(`tv/${seriesID}/credits`);
    return response.data;
  } catch (err) {
    throw err;
  }

}


// Get TV Series Trailer

export const getSeriesTrailer = async (id) => {
  try {
    const response = await Api.get(`tv/${id}/videos`);
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}


// Get Popular TV Series 

export const getPopularSeries = async () => {
  try {
    const response = await Api.get(`tv/popular`);
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}
// Get Top Rated TV Series 

export const getTopRatedSeries = async () => {
  try {
    const response = await Api.get(`tv/top_rated`);
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }



}
// Get Airing Today TV Series 

export const getTodayAiringSeries = async () => {
  try {
    const response = await Api.get(`tv/airing_today`);
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}
// Get Airing Currently TV Series 

export const getCurrentlyAiringSeries = async () => {
  try {
    const response = await Api.get(`tv/on_the_air`);
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}



// Get Movies Based On Genre

export const getGenreBasedMovies = async (genreID) => {
  try {
    const response = await Api.get(`/discover/movie`,{
      params: {
        with_genres:genreID,
        language: 'en-US',
        page: 1
      }
    });
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}


// Get Episode Details for Season

export const getEpisodeDetails = async (seriesId,seasonId) => {
  try {
    // const response = await Api.get(`tv/93405/season/1`,{
    const response = await Api.get(`tv/${seriesId}/season/${seasonId}`,{
      params: {
        language: 'en-US',
        page: 1
      }
    });
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}


// Multiple Search

export const getSearchDetails = async (query) => {
  try {
    // const response = await Api.get(`tv/93405/season/1`,{
    const response = await Api.get(`search/multi`,{
      params: {
          query: query,
        language: 'en-US',
        page: 1
      }
    });
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}


// Actor BioData 

export const getBioDataDetails = async (actorID) => {
  try {
    // const response = await Api.get(`tv/93405/season/1`,{
    const response = await Api.get(`person/${actorID}`,{
      params: {
        language: 'en-US',
        page: 1
      }
    });
    return response.data;

  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }

}