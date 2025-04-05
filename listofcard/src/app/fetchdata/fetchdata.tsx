"use client"


import { useState, useEffect } from "react";
import { Opportunity,newvalue,newvalueOfspecific} from "../component/type/type";

type FetchData<T> = {
    data: T| null;
    loading: boolean;
    error: string | null;
};
const useFetchData = <T,>(url: string): FetchData<T> => {
  const [data, setData] = useState<T |null>( null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {data, loading, error };
};

export default useFetchData;
