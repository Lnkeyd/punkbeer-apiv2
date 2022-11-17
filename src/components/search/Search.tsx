import React, {useState} from 'react'
import inputStyles from './search.module.css'
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Search = () => {
    const [input, setInput] = useState('')
    const handleInput = (e) => {
        setInput(e.target.value)
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