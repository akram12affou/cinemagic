
import MovieCart from "./MovieCart";
function Recomendation({ data4 }: any) {

  return (
    <>
      {data4?.results?.length !== 0 && (
        <div className="flex flex-col mx-auto justify-between text-white mt-8  gap-3 ">
          <div className="sm:w-8/12 w-9/12 flex mx-auto ">
            <h2 className="font-semibold sm:text-2xl text-xl  decoration-1 text-white">
              Recommendations
            </h2>
            <div></div>
          </div>
          <div className="sm:w-10/12 w-11/12 mx-auto">
            <div className="flex flex-wrap gap-x-7 gap-y-10 justify-center">
              {data4.results?.map((movie: any) => {
                return <MovieCart movie={movie} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Recomendation;
