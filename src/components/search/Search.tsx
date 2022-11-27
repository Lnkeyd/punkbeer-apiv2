import React, {useEffect, useState} from 'react'
import inputStyles from './search.module.css'
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Search = ({ setSearch }) => {

  //https://api.punkapi.com/v2/beers?beer_name=punk

    const handleInput = (e) => {
      setSearch(e.target.value)
    }

  return (
    <div className={inputStyles.search}>
          <form>
            <input onChange={(e) => handleInput(e)} className={inputStyles.input} type="text" placeholder="type beer..."/>
          </form>
          <div className={inputStyles.icon}>
            <FontAwesomeIcon icon={faBeerMugEmpty} className='fa-xl'/>
          </div>
    </div>
  )
}

export default Search