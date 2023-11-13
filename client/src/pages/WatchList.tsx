import {useEffect , useState} from 'react';
import axios from 'axios';

function WatchList() {
  const [watchedList , setWatchedList]= useState([])
  useEffect(() => {
     axios.get('http://localhost:8888/movie').then(res => {
      setWatchedList(res.data)
     });
  },[])
  return (
    <div>
        {JSON.stringify(watchedList)}
    </div>
  )
};

export default WatchList