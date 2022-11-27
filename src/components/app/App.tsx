import React, {FC, useState, useEffect} from 'react';
import BeerCard from '../beerCard/BeerCard';
// import Nav from '../nav/Nav';
import Pagination from '../pagination/Pagination';
// import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import useDebounce from '../../hooks/useDebounce'
import Search from '../search/Search';

//Интерфейсы отвечают только за доменную логику приложения
//для объектов, которые приходят к нам по API, 
//а Типы мы используем для взаимодействие с этими объектами


//Generic можно рассмотреть как ф-ци, которую мы вызываем с опр. типом
//и она нам возвращает новую структуру с использованием данного типа

/*
  interface State<T> {
    loading: boolean;
    error: Error | null;
    data: T;
  }
*/

const App: FC = () => {

  const totalBeers = 325
  //API does not have his own amount included, so I've decided to add my own local version
  //https://github.com/sammdec/punkapi/issues/44

  const [beers, setBeers] = useState([])
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) //1
  const [beersPerPage, setBeersPerPage] = useState(12) //12

  const [search, setSearch] = useState<any>('')
  const [searchResult, setSearchResult] = useState<any>(null)

  const debouncedValue = useDebounce<string>(search, 500)

  
  //https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${beersPerPage}
  //that approach also seems good

  // const firstBeerIndex = (currentPage - 1) * beersPerPage
  // const lastBeerIndex = currentPage * beersPerPage
  // const currentBeers = beers.slice(firstBeerIndex, lastBeerIndex)
  const pages = totalBeers/beersPerPage

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
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  const getSearch = async () => {
    if (!search) {
      console.log('NO')
      setSearchResult(null)
      return
    }

    try {
      const res = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${search}`)

      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }
      const data = await res.json()
      setSearchResult(data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSearch()
    //eslint-disable-next-line
  }, [debouncedValue])

  

  useEffect(() => {
    setLoading(true)
    getBeers();
    setLoading(false)
    //eslint-disable-next-line
}, [currentPage, beersPerPage]);

  console.log(searchResult)

  return (
    <>
      <Search setSearch={setSearch}/>
      <Pagination
        pages={pages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={beersPerPage} 
        setItemsPerPage={setBeersPerPage}
        items={beers}
        />

      <div className="cards">
        {
          !!searchResult ? searchResult.map(beer => (
            <BeerCard
            key={beer.id}
            id={beer.id}
            name={beer.name} 
            description={beer.description} 
              image={beer.image_url}
              />
              ))
            : beers.map(beer => (
              <BeerCard
              key={beer.id}
              id={beer.id}
              name={beer.name} 
              description={beer.description} 
                image={beer.image_url}
                />
                ))
        }
      </div>
    </>
  );
}

export default App;