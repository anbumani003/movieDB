import React, { useEffect, useState, useRef } from 'react'
import { movieGenre } from '../services/Api';
import { genreImageMap } from '../configurations/GenreImage';
import Style from '../css/Genre.module.css';
import { useNavigate } from 'react-router-dom';

const Genre = () => {
    const navigate=useNavigate();
    const [genre, setGenre] = useState([]);
    const scrollRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchGenre = async () => {
            const data = await movieGenre();
            setGenre(data.genres);
        }
        fetchGenre();
    }, []);

    const handleChange=(id)=>{
       navigate(`/genre/${id}`);
    }

    // Auto scroll effect
    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const startAutoScroll = () => {
            intervalRef.current = setInterval(() => {
                if (scrollContainer) {
                    scrollContainer.scrollBy({ 
                        left: 2, // scroll speed
                        behavior: "smooth" 
                    });

                    // Reset scroll to start when reaching end
                    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
                    }
                }
            }, 30); // adjust timing for smoothness
        };

        startAutoScroll();

        // Pause on hover or manual scroll
        const stopScroll = () => clearInterval(intervalRef.current);

        scrollContainer.addEventListener("mouseenter", stopScroll);
        scrollContainer.addEventListener("mouseleave", startAutoScroll);
        scrollContainer.addEventListener("wheel", stopScroll); // pause if user scrolls

        return () => {
            clearInterval(intervalRef.current);
            scrollContainer.removeEventListener("mouseenter", stopScroll);
            scrollContainer.removeEventListener("mouseleave", startAutoScroll);
            scrollContainer.removeEventListener("wheel", stopScroll);
        };
    }, []);

    return (
        <div className={`container ${Style.genreContainer}`}>
            <h3 className={Style.title}>Choose Your Favorite Genre</h3>
            <div className={Style.genreRow} ref={scrollRef}>
                {
                    genre.map((g) => (
                        <div className={`card ${Style.card}`} key={g.id}>
                            <div className={Style.imageWrapper}>
                                <img src={genreImageMap[g.id]} alt={g.name} className={Style.cardImage} />
                                <span className={Style.tag}>{g.name}</span>
                            </div>
                            <div className={`card-body text-center ${Style.cardBody}`}>
                                <h5 className="card-title">{g.name}</h5>
                                <button className={Style.detailsBtn} onClick={()=>handleChange(g.id)}>
                                    View Movies
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Genre
