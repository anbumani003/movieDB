import React, { useEffect, useState } from 'react'
import { popularActor } from '../services/Api';
import Style from '../css/PopularActor.module.css';
import { posterImageUrl } from '../services/ApiConfig';
import { useNavigate } from 'react-router-dom';
// import { genreImageMap } from '../configurations/GenreImage';

const PopularActor = () => {
    const navigate=useNavigate();
    const [actor, setActor] = useState([]);
    const handleChange=(id)=>{
        navigate(`person/${id}`);
console.log(id);

    }
    useEffect(() => {
        const fetchActor = async () => {
            const data = await popularActor();
            console.log(data.results);
            
            setActor(data.results);
        }
        fetchActor();
    }, []);

    return (
        // <></>
        <div className={Style.genreSection}>
            <div className={`container ${Style.genreContainer}`}>
                <h3 className={Style.title}>Trending Stars</h3>
                <div className={Style.genreCarousel}>
                    {actor.map((genreItem) => (
                        <div className={Style.genreCard} key={genreItem.id} onClick={()=>handleChange(genreItem.id)}>
                            <div className={Style.genreImageWrapper}>
                                <img 
                                    src={`${posterImageUrl}${genreItem.profile_path}`} 
                                    alt={genreItem.name} 
                                    className={Style.genreImage}
                                />
                                <div className={Style.genreOverlay}></div>
                            </div>
                            <h4 className={Style.genreName}>{genreItem.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PopularActor