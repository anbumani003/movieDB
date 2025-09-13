import React, { useEffect, useState } from 'react';
import styles from '../css/EpisodeDesign.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLanguage, faUserFriends, faCalendarAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { posterImageUrl } from '../services/ApiConfig';
import { genreImageMap } from '../configurations/GenreImage';
import { movieGenreMapping, tvGenreMapping } from '../configurations/GenreMapping';
import { FaStar, FaCalendarAlt, FaPlayCircle, FaInfoCircle } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const EpisodesCard = (props) => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [path, setPath] = useState("");

  useEffect(() => {
    const tvShow = async () => {
      try {
        const data = await props.funName(props.id,props.seasonId);
        setDataList(data.episodes);
        console.log(data.episodes);
      } catch (err) {
        console.log(err);
      }
    }
    tvShow();
  }, []);

  const handleRedirect = (id) => {
    navigate(`/${path}/${id}`);
    console.log(id);
  };

  return (
    <div className={styles.episodesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionHeading}>{props.title}</h2>
        {/* <div className={styles.controls}>
          <button className={styles.scrollButton} aria-label="Scroll left">
            &lt;
          </button>
          <button className={styles.scrollButton} aria-label="Scroll right">
            &gt;
          </button>
        </div> */}
      </div>
      
      <div className={styles.horizontalScrollContainer}>
        <div className={styles.episodesRow}>
          {dataList?.map((episode) => (
            <div className={styles.episodeCard} key={episode.id}>
              <div className={styles.episodePoster}>
                <img 
                  src={episode.still_path ? `${posterImageUrl}${episode.still_path}` : '/placeholder-episode.jpg'} 
                  alt={episode.name} 
                  onError={(e) => {
                    e.target.src = '/placeholder-episode.jpg';
                  }}
                />
                
                {/* Episode Number Badge */}
                <div className={styles.episodeNumberBadge}>
                  Episode {episode.episode_number}
                </div>
                
                {/* Rating Badge */}
                {episode.vote_average && (
                  <div className={styles.ratingBadge}>
                    <FaStar className={styles.starIcon} />
                    <span>{episode.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                {/* <div className={styles.overlay}>
                  <button 
                    className={styles.playButton}
                    onClick={() => handleRedirect(episode.id)}
                    aria-label="View details"
                  >
                    <FaInfoCircle />
                  </button>
                </div> */}
              </div>
              
              <div className={styles.episodeCardBody}>
                <h3 className={styles.episodeTitle}>{episode.name || 'Untitled Episode'}</h3>
                
                {episode.overview && (
                  <p className={styles.episodeOverview}>
                    {episode.overview.length > 100 
                      ? `${episode.overview.substring(0, 100)}...` 
                      : episode.overview
                    }
                  </p>
                )}
                
                <div className={styles.episodeDetails}>
                  {episode.air_date && (
                    <div className={styles.detailItem}>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>
                        {new Date(episode.air_date).toLocaleDateString("en-GB", {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  
                  {episode.runtime && (
                    <div className={styles.detailItem}>
                      <FontAwesomeIcon icon={faClock} />
                      <span>{episode.runtime} min</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.episodeActions}>
                  <button 
                    className={styles.detailsButton}
                    onClick={() => handleRedirect(episode.id)}
                  >
                    <FaInfoCircle className={styles.buttonIcon} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodesCard;