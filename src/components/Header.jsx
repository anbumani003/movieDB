import React, { useEffect, useState } from 'react'
import Style from '../css/Header.module.css';
import Carousel from 'react-bootstrap/Carousel';
import { theatreRunningMovies } from '../services/Api';
import { backdropImageUrl, posterImageUrl } from '../services/ApiConfig';
import { languageMap } from '../configurations/Language';
import { FaStar, FaCalendarAlt, FaPlayCircle, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate=useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await theatreRunningMovies();
            setMovies(data.results);
        };
        fetchData();
    }, []);

    const handleRedirect=(id)=>{
        navigate(`/spotlight/${id}`);
console.log(id);

    }

    return (
        <div className={Style.headerContainer}>
            <div className={Style.titleContainer}>
                <h2>Now Playing in Theatres</h2>
                <p className={Style.desktopOnly}>Experience the magic of cinema with these currently streaming movies</p>
                <p className={Style.mobileOnly}>Swipe to explore current movies</p>
            </div>

            <div className={Style.carouselContainer}>
                <Carousel fade interval={4000} pause={false}>
                    {movies.map((movie) => (
                        <Carousel.Item className={Style.carouselItem} key={movie.id}>
                            <div className={Style.slideContainer}>
                                {/* Desktop Version */}
                                <div className={Style.desktopVersion}>
                                    <div className={Style.backdropContainer}>
                                        <div className={Style.backdropOverlay}></div>
                                        <img
                                            src={`${backdropImageUrl}${movie.backdrop_path}`}
                                            alt="Movie backdrop"
                                            className={Style.backdropImage}
                                        />
                                        <div className={Style.movieInfo}>
                                            <div className={Style.posterContainer}>
                                                <img
                                                    src={`${posterImageUrl}${movie.poster_path}`}
                                                    alt="Movie poster"
                                                    className={Style.posterImage}
                                                />
                                                <div className={Style.ratingBadge}>
                                                    <FaStar className={Style.starIcon} />
                                                    {movie.vote_average.toFixed(1)}
                                                </div>
                                            </div>
                                            <div className={Style.detailsContainer}>
                                                <div className={Style.languageTag}>
                                                    {languageMap[movie.original_language] || movie.original_language}
                                                </div>
                                                <h3 className={Style.movieTitle}>{movie.title}</h3>
                                                <p className={Style.movieOriginalTitle}>{movie.original_title}</p>
                                                
                                                <div className={Style.movieMeta}>
                                                    <span className={Style.metaItem}>
                                                        <FaCalendarAlt className={Style.metaIcon} />
                                                        {movie.release_date}
                                                    </span>
                                                </div>
                                                
                                                <p className={Style.movieOverview}>{movie.overview}</p>
                                                
                                                <div className={Style.buttonGroup} >
                                                    <button className={Style.primaryButton} onClick={()=>handleRedirect(movie.id)}>
                                                        <FaInfoCircle className={Style.buttonIcon} />
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Version */}
                                <div className={Style.mobileVersion}>
                                    <div className={Style.mobilePosterContainer}>
                                        <img
                                            src={`${posterImageUrl}${movie.poster_path}`}
                                            alt="Movie poster"
                                            className={Style.mobilePosterImage}
                                        />
                                        <div className={Style.mobileRatingBadge}>
                                            <FaStar className={Style.starIcon} />
                                            {movie.vote_average.toFixed(1)}
                                        </div>
                                        <div className={Style.mobileContent}>
                                            <h3 className={Style.mobileMovieTitle}>{movie.title}</h3>
                                            <button className={Style.mobileViewButton}>
                                                <FaInfoCircle className={Style.buttonIcon} />
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Header