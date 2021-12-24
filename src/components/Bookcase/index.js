import './style.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import bookcase from '../../imgs/bookcase.svg';

import bookA from '../../imgs/book_a.svg';
import bookB from '../../imgs/book_b.svg';
import bookC from '../../imgs/book_c.svg';
import bookD from '../../imgs/book_d.svg';
import bookE from '../../imgs/book_e.svg';
import bookF from '../../imgs/book_f.svg';
import bookG from '../../imgs/book_g.svg';
import bookH from '../../imgs/book_h.svg';
import bookI from '../../imgs/book_i.svg';


function Bookcase(){
    const sortType = useSelector(state => state.sortType);
    const firstShelfSorted = useSelector(state => state.firstShelfSorted);
    const lastShelfSorted = useSelector(state => state.lastShelfSorted);
    const revertOrder = useSelector(state => state.revertOrder);

    const dispatch = useDispatch();

    const originalFirstShelf = [
        {
            letter: 'A',
            color: '2-yellow',
            size: 4,
            src: bookA
        },
        {
            letter: 'B',
            color: '0-red',
            size: 3,
            src: bookB
        },
        {
            letter: 'C',
            color: '1-orange',
            size: 5,
            src: bookC
        },
        {
            letter: 'D',
            color: '7-purple',
            size: 5,
            src: bookD
        },
        {
            letter: 'E',
            color: '4-cyan',
            size: 0,
            src: bookE
        },
        {
            letter: 'F',
            color: '6-magenta',
            size: 2,
            src: bookF
        },
    ];
    
    const originalLastShelf = [
        {
            letter: 'G',
            color: '8-pink',
            size: 1,
            src: bookG
        },
        {
            letter: 'H',
            color: '5-blue',
            size: 5,
            src: bookH
        },
        {
            letter: 'I',
            color: '3-green',
            size: 5,
            src: bookI
        },
    ];

    const sortedFirstShelf = firstShelfSorted.length > 0 ? firstShelfSorted : originalFirstShelf; 
    const sortedLastShelf = lastShelfSorted.length > 0 ? lastShelfSorted : originalLastShelf; 

    const sortShelves = (type) => {
        let firstShelfSorted = [...sortedFirstShelf].sort((a, b) => a[type] > b[type] ? 1 : ((b[type] > a[type]) ? -1 : 0));
        let lastShelfSorted = [...sortedLastShelf].sort((a, b) => a[type] < b[type] ? 1 : ((b[type] < a[type]) ? -1 : 0));
        
        if(revertOrder){
            firstShelfSorted.reverse();
            lastShelfSorted.reverse();
        } else {
            dispatch({type: 'revertOrderSelected', payload: false })
            firstShelfSorted = [...sortedFirstShelf].sort((a, b) => a[type] > b[type] ? 1 : ((b[type] > a[type]) ? -1 : 0));
            lastShelfSorted = [...sortedLastShelf].sort((a, b) => a[type] < b[type] ? 1 : ((b[type] < a[type]) ? -1 : 0));
        }          
        
        dispatch({ type: 'firstShelfChanged', payload: firstShelfSorted, })
        dispatch({ type: 'lastShelfChanged', payload: lastShelfSorted, })
    };

    useEffect(() => {
        sortShelves(sortType);
    }, [sortType, revertOrder])

    return(
      <section className="bookcase-container">
            <img src={bookcase} className="bookcase-background" alt="bookcase" />
            <div className="bookcase-shelves">
              <ul className="first-shelf">
                {sortedFirstShelf.map((book, i) => (
                    <li key={'book' + i}>
                        <img src={book.src} className={"book-" + book.letter.toLowerCase()} alt={"book " + book.letter} />
                    </li>
                ))}                                                                              
              </ul>
  
              <ul className="last-shelf">
                {sortedLastShelf.map((book, i) => (
                    <li key={'book' + i}>
                        <img src={book.src} className={"book-" + book.letter.toLowerCase()} alt={"book " + book.letter} />
                    </li>
                ))}                                                                              
              </ul>
            </div>
          </section>
    )
}

export default Bookcase;  