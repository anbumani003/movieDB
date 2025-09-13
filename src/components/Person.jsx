import React from 'react'
import Navbar from './Navbar'
import VerticalCardDesign from './VerticalCardDesign'
import { getMovieByActorID } from '../services/Api'
import { useParams } from 'react-router-dom'
import ActorBio from './ActorBio'

const Person = () => {
    const {id}=useParams();
  return (
   <>
   <Navbar/>
   <ActorBio actorID={id}/>
   <VerticalCardDesign title="Related Collections" actorID={id} funName={getMovieByActorID} />
   </>
  )
}

export default Person
