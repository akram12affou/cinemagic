import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useFetch } from "../hooks/useFetch";
import LoadingComp from "../Components/loading/loadingComp";
import Cast from "../Components/Cast";
import axios from "axios";
import Toastify from "toastify-js";
import { useGetToken } from "../hooks/useGetToken";
import Images from "../Components/Images";
import { useWatchedList } from "../hooks/getWatchedListContext";
import Recomendation from "../Components/Recomendation";
import { motion } from "framer-motion";
import { InFavorite } from "../hooks/existInWatchedList";
import { useNavigate } from "react-router-dom";
function MovieDetails() {
  const token = useGetToken();
  const navigate = useNavigate();
  const { dispatchl } = useWatchedList();
  const { id } = useParams();
  const [personNumber, setPersonNumber] = useState<boolean>(true);
  const { data } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }&language=en-US`,
    id
  );
  const { data :data2 } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }&language=en-US`,
    id
  );
  const { data : data3 ,loading } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }`,
    id
  );
  const { data :data4 } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
      import.meta.env.VITE_REACT_APP_TMDB_KEY
    }&language=en-US&page=${1}`,
    id
  );
  const {
    original_title,
    overview,
    poster_path,
    release_date,
    budget,
    runtime,
    revenue,
    vote_average,
  } = data;
  const bg_color = vote_average < 7 ? " bg_rating_bad" : " bg_rating_good";
  const removeFromFavorite = (movie: { id: any }) => {
    dispatchl({ type: "REMOVE_FROM_WATCHEDLIST", payload: movie });
    axios
      .delete(`http://localhost:8888/movie/remove/${movie.id}`, token)
      .then(() => {
        // console.log(res.data);
      });
  };
  const addToFavorite = () => {
    if (token.headers.token) {
      dispatchl({
        type: "ADD_TO_WATCHEDLIST",
        payload: {
          title: original_title,
          poster_path,
          vote_average,
          id,
        },
      });
      axios
        .post(
          "http://localhost:8888/movie/add",
          {
            title: original_title,
            poster_path,
            vote_average,
            id,
          },
          token
        )
        .then(() => {
          // console.log(res.data);
        });
    } else {
      navigate("/auth");
      scrollTo(0, 0);
      Toastify({
        text: "login to Add to your watch List",
        className: "info",
        style: {
          background: "linear-gradient(to right, #1f1f1f, #141414)",
        },
        duration: 2000,
        offset: {
          x: 20,
          y: 70,
        },
      }).showToast();
    }
  };
  
  return (
    <div className="second_bg_color min-h-screen ">
      {loading ? (
        <div className="flex justify-center relative top-20">
          <LoadingComp />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex flex-row justify-center mx-auto items-start text-white relative top-5 gap-3">
              <div className="relative ">
                
                <img
                  src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
                  className="rounded-md img_details"
                />
                <span
                  className={
                    "absolute font-semibold tracking-wide top-3 rounded-r-lg p-1 text-white" +
                    bg_color
                  }
                >
                  {vote_average}
                </span>
              </div>
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  title:
                  <h2 className="font-semibold text-xl tracking-wide flex justify-between">
                    <div>{original_title}</div>
                    <div className="hover:cursor-pointer">
                      {InFavorite(id) ? (
                        <FaStar
                          className="text-white text-base lg:text-xl cursor-pointer active:scale-105"
                          onClick={() => removeFromFavorite(data)}
                        />
                      ) : (
                        <FiStar
                          title="add to your watch List"
                          onClick={addToFavorite}
                          className="text-white text-base lg:text-xl cursor-pointer active:scale-105"
                        />
                      )}
                    </div>
                  </h2>
                </div>
                <div className="flex flex-col ">
                  overflow:
                  <span className="text-sm sm:text-base">{overview}</span>
                </div>
                <div className="sm:flex flex-col hidden">
                  <span className="text-sm">Release date:</span>
                  <span className="text-sm sm:text-base">{release_date}</span>
                </div>
                {budget !== 0 && (
                  <div className="sm:flex flex-col hidden">
                    <span className="text-sm">Budget:</span>
                    <span className="text-sm sm:text-base">{budget} $</span>
                  </div>
                )}
                {revenue !== 0 && (
                  <div className="sm:flex flex-col hidden">
                    <span className="text-sm">Revenue:</span>
                    <span className="text-sm sm:text-base">{revenue} $</span>
                  </div>
                )}
                <div className="sm:flex flex-col hidden ">
                  <span className="text-sm">Duration:</span>
                  <span className="text-sm sm:text-base">{runtime} mn</span>
                </div>
                <div className="sm:flex flex-col hidden ">
                  <div className="flex flex-wrap gap-2">
                    {data.genres?.map(
                      (e: {
                        name:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      }) => {
                        return (
                          <div className="p-1 bg_rating_good font-semibold tracking-wide rounded-md text-sm sm:text-base">
                            {e.name}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="flex justify-evenly relative top-3 items-center flex-wrap gap-2">
              <div className="flex flex-col sm:hidden text-white">
                <span className="text-sm">Release date:</span>
                <span className="text-sm">{release_date}</span>
              </div>
              {budget !== 0 && (
                <div className="flex flex-col sm:hidden text-white">
                  <span className="text-sm">Budget:</span>
                  <span className="text-sm sm:text-base">{budget} $</span>
                </div>
              )}
              {revenue !== 0 && (
                <div className="flex flex-col sm:hidden text-white">
                  <span className="text-sm">Revenue:</span>
                  <span className="text-sm sm:text-base">{revenue} $</span>
                </div>
              )}
              <div className="flex flex-col sm:hidden text-white">
                <span className="text-sm">Duration:</span>
                <span className="text-sm sm:text-base">{runtime} mn</span>
              </div>
              <div className="flex flex-col flex-wrap w-1/4 sm:hidden text-white justify-center">
                <div className="flex flex-wrap  gap-2 mx-auto">
                  {data.genres?.map(
                    (e: {
                      name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                    }) => {
                      return (
                        <div className="p-1 bg_rating_good rounded-md text-xs sm:text-base font-semibold tracking-wide ">
                          {e.name}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <Cast
              data2={data2}
              personNumber={personNumber}
              setPersonNumber={setPersonNumber}
            />
            <Images id={id} data3={data3} />
            <Recomendation id={id} data4={data4} />
          </motion.div>
        </>
      )}
      <br />
      <br />
    </div>
  );
}

export default MovieDetails;
