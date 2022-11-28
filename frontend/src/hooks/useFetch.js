import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);

      try {
        const results = await axios.get(url).then((res) => res.data);
        setData(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData(url);
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
