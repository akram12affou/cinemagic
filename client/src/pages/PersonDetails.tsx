import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import LoadingComp from "../Components/loading/loadingComp";
import KnownBy from "../Components/KnownBy";
import PersonImageDetails from "../Components/PersonImageDetails";
function PersonDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }&language=en-US`,
    null
  );
  const { profile_path, name, birthday, place_of_birth, biography } = data;
  return (
    <div className="second_bg_color text-white  pt-8 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingComp />
        </div>
      ) : (
        <div className="flex sm:w-10/12 w-11/12 justify-center items-start mx-auto  gap-3 ">
          <div className="w-1/3 border-radius bg_color">
            <img
              src={`https://image.tmdb.org/t/p/w400//${profile_path}`}
              className="rounded-lg w-full object-contain bg_color"
              width={100}
              height={200}
            />
          </div>
          <div className="w-2/3 flex flex-col gap-3">
            <h2 className="font-semibold text-2xl">{name}</h2>
            <div className="flex flex-col">
              {birthday && (
                <>
                  <span className="font-semibold tracking-wide">Birthday:</span>
                  <span>{birthday}</span>
                </>
              )}
            </div>
            <div className="flex flex-col">
              {place_of_birth && (
                <>
                  <span className="font-semibold tracking-wide">
                    Place of birth:
                  </span>
                  <span>{place_of_birth}</span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {biography && (
                <>
                  <span className="font-semibold tracking-wide">
                    Biography:
                  </span>
                  <span className="text-sm sm:text-base">{biography}</span>
                </>
              )}
            </div>
            <PersonImageDetails id={id} />
          </div>
        </div>
      )}

      <KnownBy id={id} />
      <br /><br />
    </div>
  );
}

export default PersonDetails;
