import style from './Pagination.module.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {getAll} from '../../../redux/actions';

export default function Pagination(){
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAll(page));
  }, [page]);

  const handlePrev = () =>{
    setPage(page-1);
  }

  const handleNext = () =>{
    setPage(page+1);
  }

  return(
    <div>
      <button className={style.prev} onClick={handlePrev} disabled={page === 1}>Anterior</button>
      <p>{page}</p>
      <button className={style.next} onClick={handleNext}>Siguiente</button>
    </div>
  )
}