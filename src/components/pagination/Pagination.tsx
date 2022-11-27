import React from 'react'
import { useState, useEffect } from 'react'
import './pagination.css'

const Pagination = ({ pages, setCurrentPage, itemsPerPage, setItemsPerPage, items }) => {   

    const [currentNumber, setCurrentNumber] = useState<any>(1)
    const pageNumbers = []

    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i)
    }
    
    const [currentNumbers, setCurrentNumbers] = useState([])

    useEffect(() => {        
        let tempPages = [...currentNumbers]

        let dots = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (currentNumber >= 1 && currentNumber <= 3) {
            tempPages = [1, 2, 3, 4, 5, dots, pageNumbers.length]
        } 
        // else if (currentNumber === 4) {
        //     const sliced = pageNumbers.slice(0, 5)
        //     tempPages = [...sliced, dots, pageNumbers.length]
        // } 
        else if (currentNumber > 3 && currentNumber < pageNumbers.length - 2) {
            const sliced1 = pageNumbers.slice(currentNumber - 2, currentNumber)
            const sliced2 = pageNumbers.slice(currentNumber, currentNumber + 1)
            tempPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pageNumbers.length])
        } else if (currentNumber > pageNumbers.length - 3) {
            const sliced = pageNumbers.slice(pageNumbers.length - 5)
            tempPages = ([1, dotsLeft, ...sliced])
        }  else if (currentNumber === dots) {
            setCurrentNumber(currentNumbers[currentNumbers.length - 3] + 1)
        } else if (currentNumber === dotsLeft) {
            setCurrentNumber(currentNumbers[3] - 2)
        } else if (currentNumber === dotsRight) {
            setCurrentNumber(currentNumbers[3] + 2)
        }
        setCurrentNumbers(tempPages)
        setCurrentPage(currentNumber)
    }, [currentNumber, itemsPerPage])

    return (
        <>
            <div className='pagination'>
                <div className="pagination__prev" onClick={() => setCurrentNumber(currentNumber === 1 ? currentNumber : currentNumber - 1)}>prev</div>
                {
                    currentNumbers.map((number, i) => (
                        <div className={`${currentNumber === number ? "pagination__active pagination__number" : "pagination__number"}`} key={i} onClick={() => setCurrentNumber(number)}>
                            {number}
                        </div>
                    ))
                }
                <div className="pagination__next" onClick={() => setCurrentNumber(currentNumber === pageNumbers.length ? currentNumber : currentNumber + 1)}>next</div>
            </div>

            <div className="per_page">
                <div className={`${itemsPerPage === 6 ? "show__active show" : "show"}`} onClick={() => setItemsPerPage(6)} >6 per page</div>
                <div className={`${itemsPerPage === 12 ? "show__active show" : "show"}`} onClick={() => setItemsPerPage(12)} >12 per page</div>
                <div className={`${itemsPerPage === 24 ? "show__active show" : "show"}`} onClick={() => setItemsPerPage(24)} >24 per page</div>
                <div className={`${itemsPerPage === 60 ? "show__active show" : "show"}`} onClick={() => setItemsPerPage(60)} >60 per page</div>
            </div>
        </>
  )
}

export default Pagination