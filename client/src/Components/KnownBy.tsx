import { useFetch } from "../hooks/useFetch";
import MovieCart from "./MovieCart";

function KnownBy({ id }: any) {
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }&language=en-US`,
    null
  );

  return (
    <>
      {!loading && (
        <div className="flex flex-col gap-2 mt-8">
          <div className="sm:w-8/12 w-9/12  flex  mx-auto">
            <h2 className="font-semibold sm:text-2xl text-xl decoration-1 ">
              Known By
            </h2>
            <div></div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-10 justify-center sm:w-10/12 w-11/12 mx-auto">
            {data?.cast?.map((movie: any) => {
              return <MovieCart movie={movie} setQuery={undefined} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default KnownBy;
