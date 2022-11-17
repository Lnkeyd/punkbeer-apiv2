import React, {useState, useEffect} from 'react';
import BeerCard from '../beerCard/BeerCard';
import Nav from '../nav/Nav';
import Pagination from '../pagination/Pagination';
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Search from '../search/Search';

function App() {

  const [beers, setBeers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) //1
  const [beersPerPage] = useState(12) //12
  

  const totalBeers = 325 
  //API does not have his own amount included, so I've decided to add my own local version
  //https://github.com/sammdec/punkapi/issues/44


  useEffect(() => {
    setLoading(true)
    getBeers();
    setLoading(false)
}, [currentPage]);

  const getBeers = async () => {
    try {
      const res = await fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${beersPerPage}`)

      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }
      const data = await res.json()
      setBeers(data)
      const total = res.headers.get('x-ratelimit-remaining')
      console.log(total)
    } catch (err) {
      console.log(err);
    }
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <Search/>
      {/* 
      <Pagination 
        beersPerPage={beersPerPage}
        totalBeers={totalBeers}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        /> */}

      <div className="cards">
        {
          !loading ?
          beers.map(beer => (
            <BeerCard
              key={beer.id}
              id={beer.id}
              name={beer.name} 
              description={beer.description} 
              image={beer.image_url}
              />
          )) : (
            <h3 className="loading">Loading...</h3>
          )
        }
      </div>
    </>
  );
}

export default App;
