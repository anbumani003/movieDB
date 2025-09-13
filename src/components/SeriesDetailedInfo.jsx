import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Style from '../css/MovieInfo.module.css';
import styles from '../css/CardDesign.module.css';

import PopularStyle from '../css/PopularActor.module.css';
import Spinner from 'react-bootstrap/Spinner';
import {  getEpisodeDetails } from '../services/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { backdropImageUrl, posterImageUrl } from '../services/ApiConfig';
import { FaInfoCircle } from 'react-icons/fa';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFilm, faListOl } from "@fortawesome/free-solid-svg-icons";
import EpisodesCard from './EpisodesCard';



const SeriesDetailedInfo = () => {
  const navigate=useNavigate();
  const [videos, setVideos] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [movieID, setMovieID] = useState(null);
  const { id,seasonId } = useParams();


   const handleChange=(id)=>{
        navigate(`/person/${id}`);
// console.log(id);

    }
  useEffect(() => {
    const fetchVideos = async () => {
      try {

        const [movieData] = await Promise.all([
        getEpisodeDetails(id,seasonId)
       
        ]);

        setMovieDetails(movieData);
        // console.log(movieData);
        
      } catch (error) {
        console.error('Error fetching data:', error.message);
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
        {movieDetails ? (
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
                <h1 className={Style.movieTitle}>{movieDetails.name}</h1>
                <div className={Style.movieMeta}>
                  <span className={Style.rating}><span className={Style.star}>★</span> {movieDetails.vote_average?.toFixed(1)}/10</span>
                  <span className={Style.releaseDate}>
                    {movieDetails.release_date
                      ? new Date(movieDetails.release_date).toLocaleDateString('en-GB')
                      : ''}
                  </span>
                  {/* <span className={Style.runtime}>{movieDetails.runtime} min</span> */}
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
                {movieDetails?.networks && (
                  <div className={Style.platformsSection}>
                    <h3>Available On</h3>
                    <div className={Style.platformsContainer}>
                      {movieDetails.networks.map((data) => (
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
     
      <EpisodesCard title="Episode Details" id={id} seasonId={seasonId} funName={getEpisodeDetails}/>
   
    </>
  );
};

export default SeriesDetailedInfo;