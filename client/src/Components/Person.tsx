import { MdOutlinePersonOutline } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
function Person({ person }) {
  const { name,character, profile_path,id} = person;
  const navigate = useNavigate()
  const navigateToPerson = () => {
    window.scroll(0,0)
    navigate(`/person/${id}`)
  }
  return (
    <div className="flex flex-col gap-2 ">
      {profile_path ? (
        <img
        onClick={navigateToPerson}
          width={100} height={150}
          src={`https://image.tmdb.org/t/p/w400/${profile_path}`}
          alt=""
          className="w-50 person_img rounded-md cursor-pointer  hover:-translate-y-0.5 transition ease-in-out hover:sepia-[.5] bg_color "
        />
      ) : (
          <MdOutlinePersonOutline className="text-white w-50 h-full  person_img bg_color rounded-md cursor-pointer  hover:-translate-y-0.5 transition ease-in-out  flex justify-center items-center" />
      )}
      <div className="flex flex-col">
        <span className="sm:text-sm cursor-pointer trans text-xs font-semibold text-white hover:tracking-wide"  onClick={() => navigate(`/person/${id}`)}>
          {name.substring(0, 16)}
        </span>
        <span className="sm:text-sm text-xs text-white"  onClick={() => navigate(`/person/${id}`)}>
          {character.substring(0, 20)}
        </span>
      </div>
    </div>
  );
}

export default Person;
