import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string,alignment: unknown) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });

   
  }, [alignment]);
  return { data, loading, error };
};
