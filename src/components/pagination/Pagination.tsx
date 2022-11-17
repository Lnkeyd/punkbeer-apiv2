import React from 'react'
import paginationStyles from './pagination.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ beersPerPage, totalBeers, paginate, currentPage}) => {

  //TODO: Left and Right Boundaries, if (currentItem - 2 === firstItem) {
  //  prevButton = disabled
  //  } and similar to the nextButton

  const [pageNumberLimit, setPageNumberLimit] = useState(3)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const pageNumbers = []

  for(let i = 1; i<=Math.ceil(totalBeers / beersPerPage); i++) {
    pageNumbers.push(i)
  }

  const firstPage = 1
  const totalPages = Math.ceil(totalBeers / beersPerPage) //28

  // const range = (from, to, step = 1) => {
  //   let i = from;
  //   const range = [];

  //   while (i <= to) {
  //     range.push(i);
  //     i += step;
  //   }

  //   return range;
  // };

  let tempPages = [...pageNumbers]

  useEffect(() => {
    tempPages = tempPages.slice(minPageNumberLimit, maxPageNumberLimit)
  }, [])


  const handlePrevButton = () => {
    paginate(currentPage => currentPage - 1)
    if (currentPage - 1 < minPageNumberLimit) {
      setMaxPageNumberLimit(currentPage + 1)
      setMinPageNumberLimit(currentPage - 1)
    }
  }

  const handleNextButton = () => {
    paginate(currentPage => currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(currentPage + 1)
      setMinPageNumberLimit(currentPage - 1)
    }
  }
 
  return (
    <div>
      <ul className={paginationStyles.pagination}>
        {/* <button 
          className={`${paginationStyles.button}
          ${currentPage === 1 ? paginationStyles.active : ""}`} 
          onClick={() => paginate(1)}
          >{1}</button> */}
        <button 
          className={`${paginationStyles.button}`} 
          onClick={handlePrevButton}
          disabled={currentPage === firstPage}
          >
            <FontAwesomeIcon icon={faAngleLeft} className='fa-lg' />
          </button>
        {
          tempPages.map(number => {
            if (number < maxPageNumberLimit + 1 && number >= minPageNumberLimit) 
            return (
              <li className={paginationStyles.list} key={number}>
                <button 
                  className={`${paginationStyles.button} ${currentPage === number ? paginationStyles.active : ""}`} 
                  onClick={() => paginate(number)}
                  >
                  {number}
                </button>
              </li>
          )})
        }
        <button 
          className={`${paginationStyles.button}`} 
          onClick={handleNextButton}
          disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAngleRight} className='fa-lg' />
          </button>
        {/* <button 
          className={`${paginationStyles.button}
          ${currentPage === totalPages ? paginationStyles.active : ""}`} 
          onClick={() => paginate(totalPages)}
          >{totalPages}</button> */}
      </ul>
    </div>
  )
}

export default Pagination