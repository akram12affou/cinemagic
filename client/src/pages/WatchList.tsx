import {useEffect , useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function WatchList() {
  const [cookie,removeCookie,setCookie] = useCookies(['accestoken']);
  const [watchedList , setWatchedList]= useState([])
  useEffect(() => {
     axios.get('http://localhost:8888/movie' , {
     headers : {
      token : cookie?.accestoken
     }
     }).then(res => {
      setWatchedList(res.data);
      console.log(res.data)
     }).catch(err => {
      console.log(err)
     })
  },[])
  return (
    <div>
        {JSON.stringify(watchedList)}
    </div>
  )
};

export default WatchList