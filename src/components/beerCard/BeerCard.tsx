import React, {FC} from 'react'
import {useNavigate} from "react-router-dom";
import cardStyles from './card.module.css'

const BeerCard = ({id, name, image, description}) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/beer/${id}`)}>
        <div className={cardStyles.beerCard}>
            <img className={cardStyles.image} src={image} alt={name} />
            <h3 className={cardStyles.title}>{name}</h3>
            <p className={cardStyles.description}>{description.substring(0,140)}...</p>
        </div>
    </div>
  )
}

export default BeerCard