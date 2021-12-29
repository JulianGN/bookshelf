import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css'

import lady from '../../imgs/lady.svg';


function Ground() {
  const [data, setState] = useState({active: 'letter'});
  const dispatch = useDispatch();
  
  const sortType = useSelector(state => state.sortType);
  const revertOrder = useSelector(state => state.revertOrder);

  const buttons = [
      'letter',
      'color',
      'size',
      'release',
  ]

  const activeBtn = (btn) => {
    setState({ active: btn });
  }

  const selectSortType = () => {
    if(sortType !== data.active) {
      dispatch({type: 'revertOrderSelected', payload: false })
    }

    if(sortType === data.active) {
      dispatch({type: 'revertOrderSelected', payload: !revertOrder })
    }

    dispatch({ type: 'sortSelected', payload: data.active })
  }

  return(
    <section className="ground-container">
          <article className="filter-container">
            <div className="filter-board">
              <div className="filter-controls">
                <h3>Sort by</h3>
                <ul>
                    {buttons.map((btn) => (
                      <li key={'btn_' + btn}>
                          <button
                              className={'sort-by-' + btn + (data.active === btn ? ' active' : '')}
                              onClick={() => activeBtn(btn)}>
                          </button>
                      </li>
                    ))}
                </ul>
                <hr />
                <button
                  className="sort-button"
                  onClick={() => selectSortType()}
                >
                    Organize
                </button>
              </div>
            </div>
            <img src={lady} className="filter-lady" alt="lady" />
          </article>        
        </section>
  )
}

export default Ground;  