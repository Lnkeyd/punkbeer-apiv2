import React, {FC, useState, useEffect} from 'react'
import Link, {useNavigate, useParams} from 'react-router-dom'
import beerPageStyles from './beerItem.module.css'

//при нажатии на элемент должна открываться страница конкретного пива содержащая подробную 
//информацию (изображение, name, tagline, description, abv, food_pairing)

interface ISingleBeer {
    id: string,
    image_url: string,
    name: string,
    tagline: string,
    description: string,
    abv: string,
    food_pairing: string[],
}

interface BeerPageParams {
    id: string
}

const BeerPage: FC = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    
    const [beer, setBeer] = useState<ISingleBeer | null>(null)

    useEffect(() => {
      // setLoading(true)
      getBeer();
      // setLoading(false)
  }, []);

    const getBeer = async () => {
      try {
        const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
  
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        const data = await res.json()
        console.log(data)
        const beer = data[0]
        setBeer(beer)
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <>
        <img src={beer?.image_url} alt={beer?.name} className={beerPageStyles.image} />
        <h1 className='h1'>{beer?.name}</h1>
        <h2>{beer?.tagline}</h2>
        <p>{beer?.description}</p>
        <h3 className='ABV'>ABV: {beer?.abv}</h3>
        <div className='foodPairing' >
          <h3>Pairings:</h3>
          <ul className={beerPageStyles.ul}>
            { 
              beer?.food_pairing ?
              (
                beer?.food_pairing.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <p>No actual pairings</p>
              )
            }
          </ul>
        </div>
        <br />
        <div className={beerPageStyles.back} onClick={() => navigate('/')}>Go Back</div>
    </>
  )
}

export default BeerPage