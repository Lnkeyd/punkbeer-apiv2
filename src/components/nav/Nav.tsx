import React from 'react'
import navStyles from './nav.module.css'

const Nav = () => {
  return (
    <>
        <h1 className="h1">PunkBeer App</h1>
        <p className={navStyles.description}>Find your best companion for insane alcohol journey</p>
    </>
  )
}

export default Nav