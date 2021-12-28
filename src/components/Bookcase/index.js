import './style.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactSortable } from "react-sortablejs";

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
    const revertOrder = useSelector(state => state.revertOrder);

    const [firstGroup, setFirstGroup] = useState([
        {
            letter: 'A',
            color: '2-yellow',
            size: 198,
            src: bookA
        },
        {
            letter: 'B',
            color: '0-red',
            size: 180,
            src: bookB
        },
        {
            letter: 'C',
            color: '1-orange',
            size: 207,
            src: bookC
        },
        {
            letter: 'D',
            color: '7-purple',
            size: 207,
            src: bookD
        },
        {
            letter: 'E',
            color: '4-cyan',
            size: 153,
            src: bookE
        },
        {
            letter: 'F',
            color: '6-magenta',
            size: 171,
            src: bookF
        },
    ]);

    const [secondGroup, setSecondGroup] = useState([
        {
            letter: 'G',
            color: '8-pink',
            size: 171,
            src: bookG
        },
        {
            letter: 'H',
            color: '5-blue',
            size: 207,
            src: bookH
        },
        {
            letter: 'I',
            color: '3-green',
            size: 189,
            src: bookI
        },
    ]);

    const sortShelves = (type) => {
        let _firstShelfSorted = [...firstGroup];
        let _lastShelfSorted = [...secondGroup];
        
        _firstShelfSorted.sort((a, b) => a[type] > b[type] ? 1 : ((b[type] > a[type]) ? -1 : 0));
        _lastShelfSorted.sort((a, b) => a[type] < b[type] ? 1 : ((b[type] < a[type]) ? -1 : 0));    

        if(revertOrder){
            _firstShelfSorted.reverse();
            _lastShelfSorted.reverse();
        }
        
        setFirstGroup(_firstShelfSorted);
        setSecondGroup(_lastShelfSorted);
    };

    useEffect(() => {
        sortShelves(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType, revertOrder])

    return(
        <section className="bookcase-container">
            <img src={bookcase} className="bookcase-background" alt="bookcase" />
            <div className="bookcase-shelves">
                <ul>
                    <ReactSortable
                        list={firstGroup}
                        setList={setFirstGroup}
                        animation={150}
                        group="bookshelf"
                        onChange={(order, sortable, evt) => {}}
                        onEnd={evt => {}}
                    >
                        {firstGroup.map((book) => (
                            <li key={book.letter} item={book}>
                                <img src={book.src} className={"book-" + book.letter.toLowerCase()} alt={"book " + book.letter} />
                            </li>
                        ))}
                    </ReactSortable>
                </ul>
                <ul>
                    <ReactSortable
                        list={secondGroup}
                        setList={setSecondGroup}
                        animation={150}
                        group="bookshelf"
                        onChange={(order, sortable, evt) => {}}
                        onEnd={evt => {}}
                    >
                        {secondGroup.map((book) => (
                            <li key={book.letter} item={book}>
                                <img src={book.src} className={"book-" + book.letter.toLowerCase()} alt={"book " + book.letter} />
                            </li>
                        ))}
                    </ReactSortable>
                </ul>
            </div>
        </section>
    )
}

export default Bookcase;  