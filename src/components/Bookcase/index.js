import './style.css'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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

const originalFirstGroup = [
    {
        id: 1,
        letter: 'A',
        color: '2-yellow',
        size: 198,
        src: bookA,
        release: 1999
    },
    {
        id: 2,
        letter: 'B',
        color: '0-red',
        size: 180,
        src: bookB,
        release: 2010
    },
    {
        id: 3,
        letter: 'C',
        color: '1-orange',
        size: 207,
        src: bookC,
        release: 2005
    },
    {
        id: 4,
        letter: 'D',
        color: '7-purple',
        size: 207,
        src: bookD,
        release: 2001
    },
    {
        id: 5,
        letter: 'E',
        color: '4-cyan',
        size: 153,
        src: bookE,
        release: 2000
    },
    {
        id: 6,
        letter: 'F',
        color: '6-magenta',
        size: 171,
        src: bookF,
        release: 1989
    },
]

const originalLastGroup = [
    {
        id: 7,
        letter: 'G',
        color: '8-pink',
        size: 171,
        src: bookG,
        release: 2021
    },
    {
        id: 8,
        letter: 'H',
        color: '5-blue',
        size: 207,
        src: bookH,
        release: 1898
    },
    {
        id: 9,
        letter: 'I',
        color: '3-green',
        size: 189,
        src: bookI,
        release: 2010
    },
]


function Bookcase(){
    const sortType = useSelector(state => state.sortType);
    const revertOrder = useSelector(state => state.revertOrder);

    const [firstGroup, setFirstGroup] = useState([...originalFirstGroup]);

    const [secondGroup, setSecondGroup] = useState([...originalLastGroup]);

    const [isfull, setIsfull] = useState(false)

    const sortShelves = (type) => {
        let firstShelfSorted = [...firstGroup];
        let lastShelfSorted = [...secondGroup];
        
        firstShelfSorted.sort((a, b) => a[type] > b[type] ? 1 : ((b[type] > a[type]) ? -1 : 0));
        lastShelfSorted.sort((a, b) => a[type] < b[type] ? 1 : ((b[type] < a[type]) ? -1 : 0));    

        if(revertOrder){
            firstShelfSorted.reverse();
            lastShelfSorted.reverse();
        }
        
        setFirstGroup(firstShelfSorted);
        setSecondGroup(lastShelfSorted);
    };

    const addRandomBook = () => {
        let firstShelf = [...firstGroup];
        let lastShelf = [...secondGroup];

        const originalBooks = [...originalFirstGroup, ...originalLastGroup]
        const allBooks = [...firstShelf, ...lastShelf]

        if(firstShelf.length === 10 && lastShelf.length === 10)
            return

        const randomBook = originalBooks[Math.floor(Math.random() * originalBooks.length)]
        let randomBookAdd = {...randomBook}
        
        randomBookAdd.id = allBooks.length + 1

        if(firstShelf.length < lastShelf.length)
            firstShelf.push(randomBookAdd)
        else
            lastShelf.push(randomBookAdd)

        if(firstShelf.length === 10 && lastShelf.length === 10)
            setIsfull(true)

        setFirstGroup(firstShelf);
        setSecondGroup(lastShelf);
    }

    const removeBook = (book) => {
        let firstShelf = [...firstGroup];
        let lastShelf = [...secondGroup];

        const findOnFirst = firstShelf.find(b => b.id === book.id) ? true : false;
        
        if(findOnFirst) {
            const index = firstShelf.map((b) => b.id).indexOf(book.id);
            firstShelf.splice(index, 1);
        }
        else {
            const index = lastShelf.map((b) => b.id).indexOf(book.id);
            lastShelf.splice(index, 1);
        }

        setIsfull(false)
        setFirstGroup(firstShelf);
        setSecondGroup(lastShelf);
    }

    const fullShelf = (pos) => {
        console.log(`The ${pos} shelf is full`)
    }

    useEffect(() => {
        sortShelves(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType, revertOrder])

    return(
        <section className="bookcase-container">
            <img src={bookcase} className="bookcase-background" alt="bookcase" />
            <div className="bookcase-shelves">
                <ul className='first-shelf'>
                    <ReactSortable
                        list={firstGroup}
                        setList={firstGroup.length <= 9 ? setFirstGroup : () => fullShelf('first')}
                        animation={150}
                        group="bookshelf"
                    >
                        {firstGroup.map((book) => (
                            <li key={book.letter + book.id} item={book.id}>
                                <button onClick={() => removeBook(book)} className='remove-book'>
                                    <span>-</span>
                                </button>
                                <img src={book.src} className={"book-" + book.letter.toLowerCase()} alt={"book " + book.letter} />
                            </li>
                        ))}
                    </ReactSortable>
                </ul>
                <ul className='last-shelf'>
                    <ReactSortable
                        list={secondGroup}
                        setList={secondGroup.length <= 9 ? setSecondGroup : () => fullShelf('second')}
                        animation={150}
                        group="bookshelf"
                    >
                        {secondGroup.map((book) => (
                            <li key={book.letter + book.id} item={book.id}>
                                <button onClick={() => removeBook(book)} className='remove-book'>
                                    <span>-</span>
                                </button>
                                <img src={book.src} className={"book-" + book.letter.toLowerCase()} alt={"book " + book.letter} />
                            </li>
                        ))}
                    </ReactSortable>
                </ul>
            </div>
            {!isfull ? <button onClick={() => addRandomBook()} className='add-book'><span>+</span></button> : null}
        </section>
    )
}

export default Bookcase;  