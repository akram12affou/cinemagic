import MovieCart from "../Components/MovieCart";
import Moviefilter from "../Components/Moviefilter";
import { useFetch } from "../hooks/useFetch";
import LoadingComp from "../Components/loading/loadingComp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { motion } from "framer-motion";
import { useWatchedList } from "../hooks/getWatchedListContext";
function Home() {
  const token = useGetToken();
  const [loadingWatched, setLoadingWatched] = useState<boolean>(false);
  const { watchedList, dispatchl } = useWatchedList();
  const [alignment, setAlignment] = useState<string>("popular");
  useEffect(() => {
    setLoadingWatched(true);
    axios
      .get("http://localhost:8888/movie", token)
      .then((res) => {
        setLoadingWatched(false);
        dispatchl({ type: "FETCH_WATCHEDLIST", payload: res.data });
      })
      .catch(() => {
        setLoadingWatched(false);
      });
  }, []);
  const { data } = useFetch(
    `https://api.themoviedb.org/3/movie/${alignment}?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }&language=en-US}`,
    alignment
  );
  return (
    <div className="second_bg_color min-h-screen">
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="sm:w-10/12 w-11/12 mx-auto">
          <Moviefilter alignment={alignment} setAlignment={setAlignment} />
          <br />
          <div className="relative top-2">
            <div className="flex flex-wrap gap-x-7 gap-y-10 justify-center">
              {loadingWatched ? (
                <div className="relative top-20 mt-10">
                  <LoadingComp />
                </div>
              ) : (
                <>
                  {data?.results?.map((movie: any) => {
                    return (
                      <MovieCart movie={movie} watchedList={watchedList} />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <br />
          <br />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
