import { useState, useEffect } from "react";

const useGetUserIngredients = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (
      url === undefined ||
      typeof url !== "string" ||
      url.trim().length === 0
    ) {
      console.log("please provide a valid url");
      return { error: "please provide a valid url" };
    } else {
      // can be used to authenticate users or fetch data
      const res = async () => {
        try {
          let res = await fetch(url, { signal: abortController.signal }, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          let resJson = await res.json();
          setData(resJson);
          setIsPending(false);
          setError(null);
        
        } catch (err) {
          if (err.name === "AbortController") {
            console.log("Fetch aborted");

            // clean up function
            // James - the error is not thrown here, make sure to review after
            // when learning about React Router
            return () => abortController.abort();
          } else {
            setIsPending(false);
            setError(err.message);
          }
        }
      };
    }
  }, [url]);

  return { data, isPending, error };
};

export default useGetUserIngredients;
