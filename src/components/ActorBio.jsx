import React, { useEffect, useState } from 'react'
import Style from '../css/ActorBio.module.css';
import Spinner from 'react-bootstrap/Spinner';
import { getBioDataDetails } from '../services/Api';
import { backdropImageUrl } from '../services/ApiConfig';


const ActorBio = ({actorID}) => {
    const [movieDetails, setMovieDetails] = useState([]);

    useEffect(() => {
        const fetchFun =async () => {
            try {
                const data =await getBioDataDetails(actorID);
                setMovieDetails(data);
                console.log(data);

            } catch (err) {
                console.log(err);

            }
        }
        fetchFun();
    }, [actorID]);

    return (
        <>
            <div className={Style.movieInfoContainer}>
                {movieDetails.id ? (
                    <div className={Style.movieMainContent}>
                        <div className={Style.posterContainer}>
                            <img
                                src={`${backdropImageUrl}${movieDetails.profile_path}`}
                                alt={movieDetails.original_title}
                                className={Style.moviePoster}
                            />
                        </div>

                        <div className={Style.detailsContainer}>
                            <div className={Style.movieHeader}>
                                <h1 className={Style.movieTitle}>{movieDetails.name}</h1>
                                <p>{movieDetails.also_known_as}</p>
                               
                            </div>

                            <div className={Style.movieOverview}>
                                <h3>Biography</h3>
                                <p>{movieDetails.biography}</p>
                            </div>
                            <div className={Style.movieOverview}>
                                <span>Birth Place</span>
                                <p>{movieDetails.place_of_birth}</p>
                                <span>DOB</span>
                                <p>  {new Date(movieDetails.birthday).toLocaleDateString("en-GB")}
</p>
                                {
                                    movieDetails.deathday && (
                                        <>
                                     <span>DOD</span>
                                <p>{movieDetails.deathday}</p>
                                </>
                                    )
                                }
                               
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
        </>
    )
}

export default ActorBio
