import { MdOutlinePersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Person({ person }: any) {
  const { name, character, profile_path, id } = person;
  const navigate = useNavigate();
  const navigateToPerson = () => {
    window.scroll(0, 0);
    navigate(`/person/${id}`);
  };
  return (
    <div className="flex flex-col gap-2 ">
      {profile_path ? (
        <div className=" overflow-hidden rounded-md">
          <img
            onClick={navigateToPerson}
            width={400}
            height={600}
            src={`https://image.tmdb.org/t/p/w400/${profile_path}`}
            alt=""
            className="w-50 person_img rounded-md cursor-pointer  hover:rotate-2  hover:scale-105 transition duration-500 ease-in-out  bg_color  "
          />
        </div>
      ) : (
        <div className="text-white w-50 h-full h-min-24  person_img bg_color rounded-md cursor-pointer  hover:-translate-y-0.5 transition ease-in-out  flex justify-center items-center">
          <MdOutlinePersonOutline className="text-3xl" />
        </div>
      )}
      <div className="flex flex-col">
        <span
          className="md:text-sm cursor-pointer trans text-xs font-semibold text-white hover:tracking-wide"
          title={name}
          onClick={() => navigate(`/person/${id}`)}
        >
          {name.substring(0, 11)} {name.length > 11 && <>...</>}
        </span>
        <span
          className="md:text-sm text-xs text-white"
          title={character}
          onClick={() => navigate(`/person/${id}`)}
        >
          {character.substring(0, 11)} {character.length > 11 && <>...</>}
        </span>
      </div>
    </div>
  );
}

export default Person;
