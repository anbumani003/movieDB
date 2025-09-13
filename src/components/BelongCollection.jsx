import React, { useEffect, useState } from 'react';
import Style from '../css/BelongCollection.module.css';
import { getBelongCollection } from '../services/Api';
import { posterImageUrl } from '../services/ApiConfig';

const BelongCollection = (props) => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
   
    const collectionDetails = async () => {
      try {
        //  const id = 1231053;
         const id = props.movieId;
        const data = await getBelongCollection(id);
        setCollections(data.parts);
        // console.log(data.parts);

      } catch (err) {
        console.log(err);

      }
    }
    collectionDetails();
  },[]);


  return (
    <div className={Style.container}>
      <h4 className={Style.sectionTitle}>Related Collections</h4>
      <div className={Style.movieGrid}>
        {collections.map(collection => (
          <div key={collection.id} className={Style.movieCard}>
            <div className={Style.imageContainer}>
              <img
                src={`${posterImageUrl}${collection.poster_path}`}
                alt={collection.original_title}
                className={Style.moviePoster}
                loading="lazy" // For better performance
              />
            </div>
            <div className={Style.movieContent}>
              <h3 className={Style.movieTitle}>{collection.original_title}</h3>
              <p className={Style.movieOverview}>{collection.overview}</p>
              <button className={Style.detailsButton}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BelongCollection;