import React, { useEffect, useState } from 'react';
import styles from '../css/CardDesign.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLanguage, faUserFriends, faCalendarAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { posterImageUrl } from '../services/ApiConfig';
import { genreImageMap } from '../configurations/GenreImage';
import { movieGenreMapping, tvGenreMapping } from '../configurations/GenreMapping';
import { FaStar, FaCalendarAlt, FaPlayCircle, FaInfoCircle } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';


const SeasonCards = (props) => {
  const navigate=useNavigate();
const [dataList,setDataList]=useState([]);
const [path, setPath] = useState("");
  useEffect(() => {
    const tvShow = async () => {
      try {
        const data = await props.funName(props.movieId);
        setDataList(data.results?data.results:data.parts);
      setPath(props.type=="series" ? "series" : "spotlight");
        console.log(data.results);

      } catch (err) {
        console.log(err);

      }
    }
    tvShow();
  }, []);

  const handleRedirect=(id)=>{
        navigate(`/${path}/${id}`);
console.log(id);

    }
  const renderStars = (count) => {
    return '⭐'.repeat(count);
  };

  return (
    <div className={styles.moviesSection}>
      <h2 className={styles.sectionHeading}>{props.title}
         {/* <FaRankingStar className={styles.iconDesign}/> */}
         </h2>
      <div className={styles.horizontalScrollContainer}>
        <div className={styles.moviesRow}>
          {dataList?.map((movie) => (
            <div className={styles.movieCard} key={movie.id}>
              {movie.vote_average && <div className={styles.movieRibbon}>{movie.vote_average.toFixed(1)}</div>}
              <div className={styles.moviePoster}>
                <img src={`${posterImageUrl}${movie.poster_path}`} alt={movie.name} />
              </div>
              <div className={styles.movieCardBody}>
                <h3 className={styles.movieTitle}>{movie.name?movie.name: movie.title}</h3>
                <div className={styles.movieGenre}>
                  {movie.genre_ids.map((genre, index) => (
                    <span key={index}>{movie.name?tvGenreMapping[genre]:movieGenreMapping[genre]}</span>
                  ))}
                </div>
                {/* {movie.release_date && 
                <div className={styles.movieDetails}>
                  <div>
                    <FontAwesomeIcon icon={faCalendar} className={styles.detailIcon} />
                    <span>{movie.release_date}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faLanguage} className={styles.detailIcon} />
                    <span>{movie.original_language}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faUserFriends} className={styles.detailIcon} />
                    <span>{movie.vote_count}</span>
                  </div>
                </div>
} */}
                <div className={styles.movieViewDetails}>
                  <button className={styles.viewDetailsButton} onClick={()=>handleRedirect(movie.id)}> <FaInfoCircle className={styles.buttonIcon} />View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonCards;