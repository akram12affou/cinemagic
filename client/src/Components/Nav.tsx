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
    <div className="bg_color flex header_height justify-center items-center">
      <div className="flex header_gap sm:w-10/12 w-11/12 justify-evenly items-center">
        <div className="font-bold text-white tracking-wider sm:text-2xl text-xl cursor-pointer" onClick={navigateToHome}>CINEMAGIC</div>
        <div className="flex align-items gap-4">
          <input type="text" placeholder="search a movie" value={query} onChange={e => writeQuery(e)} className="p-2 outline-none rounded-sm w-64" />
          <button className="text-white uppercase tracking-wider text-base" onClick={() => navigate('/auth')}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
