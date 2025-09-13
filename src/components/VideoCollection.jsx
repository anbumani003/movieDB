import React, { useEffect, useState } from 'react';
import { getSeriesTrailer, getTrailer } from '../services/Api';
import Style from '../css/VideoCollection.module.css';

const VideoCollection = ({ movieId,info }) => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

useEffect(() => {
  const getVideoCollection = async () => {
    try {
      let data;
      console.log(info);
      
      if (info === 'series') {
        data = await getSeriesTrailer(movieId);
      } else {
        data = await getTrailer(movieId);
      }
      
      setVideos(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  if (movieId) {
    getVideoCollection();
  }
}, [movieId, info]); // Added 'info' to dependency array

  return (
    <div className={Style.videoCollectionContainer}>
      {videos.length > 0 && (
        <>
          <h3 className={Style.videoCollectionTitle}>Trailers & Clips</h3>
          <div className={Style.videoCollectionRow}>
            {videos.slice(0, 10).map((video) => (
              <div key={video.id} className={Style.card}>
                {activeVideo === video.id ? (
                  <iframe
                    className={Style.videoIframe}
                    src={`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0&modestbranding=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.name}
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className={Style.poster}
                    />
                    <div
                      className={Style.playBtn}
                      onClick={() => setActiveVideo(video.id)}
                    ></div>
                  </>
                )}

                <div className={Style.cardBody}>
                  <div className={Style.info}>
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      alt="thumb"
                      className={Style.thumb}
                    />
                    <div>
                      <h3>{video.name}</h3>
                      <div className={Style.stars}>⭐⭐⭐⭐</div>
                    </div>
                  </div>

                  <div className={Style.details}>
                    <div>Type<span>{video.type}</span></div>
                    <div>Site<span>{video.site}</span></div>
                    <div>Size<span>{video.size}p</span></div>
                    <div>Lang<span>{video.iso_639_1}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCollection;
