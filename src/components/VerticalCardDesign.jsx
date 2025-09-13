import React, { useEffect, useState } from 'react';
import styles from '../css/VerticalCardDesign.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLanguage, faUserFriends, faCalendarAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { posterImageUrl } from '../services/ApiConfig';
import { genreImageMap } from '../configurations/GenreImage';
import { movieGenreMapping, tvGenreMapping } from '../configurations/GenreMapping';
import { FaStar, FaCalendarAlt, FaPlayCircle, FaInfoCircle } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const VerticalCardDesign = (props) => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  
  useEffect(() => {
    const tvShow = async () => {
      try {
        const data = await props.funName(props.actorID);
        setDataList(data.cast ? data.cast : data.results);
        // console.log(dataList);
        // console.log(data.results);
      } catch (err) {
        console.log(err);
      }
    }
    tvShow();
  }, [props.actorID]);

  const handleRedirect = (id) => {
  
    props.type=="series"?navigate(`/series/${id}/`):navigate(`/spotlight/${id}`);
    console.log(id);
  }

  const renderStars = (count) => {
    return '⭐'.repeat(count);
  };

  return (
  <div className={styles.moviesSection}>
  <h2 className={styles.sectionHeading}>{props.title}</h2>
  <div className={styles.moviesGrid}>
    {dataList
      ?.slice() // copy to avoid mutating original
      .sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || "1900-01-01");
        const dateB = new Date(b.release_date || b.first_air_date || "1900-01-01");
        return dateA - dateB; // Ascending (newest first)
      })
      .map((movie) => (
        <div className={styles.movieCard} key={movie.id}>
          {movie.vote_average && (
            <div className={styles.movieRibbon}>
              {movie.vote_average.toFixed(1)}
            </div>
          )}
          <div className={styles.moviePoster}>
            <img
              src={`${posterImageUrl}${movie.poster_path}`}
              alt={movie.name}
            />
          </div>
          <div className={styles.movieCardBody}>
            <h3 className={styles.movieTitle}>
              {movie.name ? movie.name : movie.title}
            </h3>
            <div className={styles.movieGenre}>
              {movie.genre_ids?.map((genre, index) => (
                <span key={index}>
                  {movie.name ? tvGenreMapping[genre] : movieGenreMapping[genre]}
                </span>
              ))}
            </div>
            <div className={styles.movieViewDetails}>
              <button
                className={styles.viewDetailsButton}
                onClick={() => handleRedirect(movie.id)}
              >
                <FaInfoCircle className={styles.buttonIcon} /> View Details
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>

  );
};

export default VerticalCardDesign;