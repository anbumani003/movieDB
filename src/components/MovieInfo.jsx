import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Style from '../css/MovieInfo.module.css';
import PopularStyle from '../css/PopularActor.module.css';
import Spinner from 'react-bootstrap/Spinner';
import { getBelongCollection, getCastDetails, getMovieDetails, getPlatformDetails, getTrailer } from '../services/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { backdropImageUrl, posterImageUrl } from '../services/ApiConfig';
import BelongCollection from './BelongCollection';
import VideoCollection from './VideoCollection';
import CardDesign from './CardDesign';

const MovieInfo = () => {
  const navigate=useNavigate();
  const [videos, setVideos] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [movieID, setMovieID] = useState(null);
  const { id } = useParams();


   const handleChange=(id)=>{
        navigate(`/person/${id}`);
console.log(id);

    }
  useEffect(() => {
    const fetchVideos = async () => {
      try {

        const [data, movieData, platformData, castDetails] = await Promise.all([
          getTrailer(id),
          getMovieDetails(id),
          getPlatformDetails(id),
          getCastDetails(id)
        ]);
       

        setVideos(data.results || []);
        setMovieDetails(movieData);
        setPlatform(platformData.results?.IN || {});
        setCastAndCrew(castDetails);

        if (movieData?.belongs_to_collection) {
          setMovieID(movieData.belongs_to_collection.id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVideos();
  }, [id]);

  const selectedVideo = (() => {
    const trailer = videos.find((video) => video.type === 'Trailer');
    if (trailer) return trailer;

    const teaser = videos.find((video) => video.type === 'Teaser');
    return teaser || null;
  })();

  return (
    <>
      <Navbar />

      <div className={Style.movieInfoContainer}>
        {movieDetails.id ? (
          <div className={Style.movieMainContent}>
            <div className={Style.posterContainer}>
              <img
                src={`${backdropImageUrl}${movieDetails.poster_path}`}
                alt={movieDetails.original_title}
                className={Style.moviePoster}
              />
            </div>

            <div className={Style.detailsContainer}>
              <div className={Style.movieHeader}>
                <h1 className={Style.movieTitle}>{movieDetails.title}</h1>
                <div className={Style.movieMeta}>
                  <span className={Style.rating}><span className={Style.star}>★</span> {movieDetails.vote_average?.toFixed(1)}/10</span>
                  <span className={Style.releaseDate}>
                    {movieDetails.release_date
                      ? new Date(movieDetails.release_date).toLocaleDateString('en-GB')
                      : ''}
                  </span>
                  <span className={Style.runtime}>{movieDetails.runtime} min</span>
                </div>
                <div className={Style.genres}>
                  {movieDetails.genres?.map((genre) => (
                    <span key={genre.id} className={Style.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={Style.movieOverview}>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
              </div>
              <div className={Style.platformsRow}>
                {/* Platform */}
                {platform?.flatrate && (
                  <div className={Style.platformsSection}>
                    <h3>Available On</h3>
                    <div className={Style.platformsContainer}>
                      {platform.flatrate.map((data) => (
                        <div key={data.provider_id} className={Style.platformItem}>
                          <img
                            src={`${posterImageUrl}${data.logo_path}`}
                            alt={data.provider_name}
                            className={Style.platformLogo}
                          />
                          <span className={Style.platformName}>{data.provider_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Production Company */}
                {movieDetails?.production_companies && (
                  <div className={Style.platformsSection}>
                    <h3>Production Companies</h3>
                    <div className={Style.platformsContainer}>
                      {movieDetails.production_companies.map((data) => (
                        <div key={data.id} className={Style.platformItem}>
                          <img
                            src={`${posterImageUrl}${data.logo_path}`}
                            alt={data.name}
                            className={Style.platformLogo}
                          />
                          <span className={Style.platformName}>{data.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Spinner animation="border" role="status" className={Style.movieMainContent}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
        }

      </div>

      {selectedVideo?.id && 
      <div
        className={Style.trailerMainContainer}
        style={{
          backgroundImage: `url(${backdropImageUrl}${movieDetails.backdrop_path})`
        }}
      >
        <div className={Style.trailerSection}>
          <h2 className={Style.sectionTitle}>Trailer</h2>
          <div className={Style.trailerContainer}>
            {selectedVideo ? (
              <div className={Style.videoWrapper}>
                <iframe
                  key={selectedVideo.id}
                  src={`https://www.youtube.com/embed/${selectedVideo.key}?rel=0&modestbranding=1&showinfo=0&controls=1&autohide=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.name || 'Video'}
                />
              </div>
            ) : (
              <div className={Style.noTrailer}>
                <p>No trailer available</p>
              </div>
            )}
          </div>
        </div>
      </div>
}
      {/* Cast  */}
      <div className={PopularStyle.genreSection}>
        <div className={`container ${PopularStyle.genreContainer}`} >
          <h3 className={Style.castTitle}> Cast And Crew</h3>
          {castAndCrew.cast? (
              <div className={PopularStyle.genreCarousel}>
            {castAndCrew?.cast?.slice(0,10).map((cast) => (
              <div className={PopularStyle.genreCard} key={cast.id}  onClick={()=>handleChange(cast.id)}>
                <div className={PopularStyle.genreImageWrapper}>
                  <img
                    src={`${posterImageUrl}${cast.profile_path}`}
                    alt={cast.name}
                    className={PopularStyle.genreImage}
                  />
                  <div className={PopularStyle.genreOverlay}></div>
                </div>
                <h4 className={PopularStyle.genreName}>{cast.name}</h4>
                <span style={{ fontStyle: 'italic' }}>{cast.character}</span>
              </div>
            ))}
            {castAndCrew?.crew?.slice(0,10).map((crew) => (
              <div className={PopularStyle.genreCard} key={crew.id}  onClick={()=>handleChange(crew.id)}>
                <div className={PopularStyle.genreImageWrapper}>
                  <img
                    src={`${posterImageUrl}${crew.profile_path}`}
                    alt={crew.name}
                    className={PopularStyle.genreImage}
                  />
                  <div className={PopularStyle.genreOverlay}></div>
                </div>
                <h4 className={PopularStyle.genreName}>{crew.name}</h4>
                <span style={{ fontStyle: 'italic' }}>{crew.job}</span>
              </div>
            ))}
          </div>
          ):(
              <Spinner animation="border" role="status" className={Style.movieMainContent}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          )}
        
        </div>
        {/* <div className={`container ${PopularStyle.genreContainer}`}>
          <h3 className={Style.castTitle}>Movie Crew</h3>
          <div className={PopularStyle.genreCarousel}>
            {castAndCrew?.crew?.slice(0, 12).map((crew) => (
              <div className={PopularStyle.genreCard} key={crew.credit_id}>
                <div className={PopularStyle.genreImageWrapper}>
                  <img
                    src={`${posterImageUrl}${crew.profile_path}`}
                    alt={crew.name}
                    className={PopularStyle.genreImage}
                  />
                  <div className={PopularStyle.genreOverlay}></div>
                </div>
                <h4 className={PopularStyle.genreName}>{crew.name}</h4>
                <span style={{ fontStyle: 'italic' }}>{crew.job}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Only render BelongCollection if movieID exists */}
      {movieDetails.id && (
        <VideoCollection movieId={movieDetails.id} />
      )}
      {movieID && <CardDesign title="Related Collections" movieId={movieID} funName={getBelongCollection} />}
      {/* {movieID && <BelongCollection movieId={movieID} />} */}


    </>
  );
};

export default MovieInfo;