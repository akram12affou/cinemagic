import {useNavigate} from 'react-router-dom';

function Nav({query,setQuery}) {
  const navigate = useNavigate()
  const writeQuery = (e) => {
    setQuery(e.target.value)
    navigate('/')
  }
  const navigateToHome = () => {
    setQuery('')
    navigate('/')
  }
  return (
    <div className="bg_color flex  justify-center items-center overflow-hidden header_height p-2 sm:p-0">
      <div className="flex gap-5 header_gap  flex-col sm:flex-row sm:w-10/12 w-11/12 justify-evenly sm:items-center items-start">
        <div className="font-bold text-white tracking-wider text-2xl cursor-pointer" onClick={navigateToHome}>CINEMAGIC</div>
        <div className="flex align-items gap-4">
          <input type="text" placeholder="search a movie" value={query} onChange={e => writeQuery(e)} className="p-2 outline-none rounded-sm w-64" />
          <button className="text-white font-semibold uppercase tracking-wider  sm:text-base text-sm" onClick={() => navigate('/auth')}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
