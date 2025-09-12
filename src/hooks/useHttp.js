import { useEffect, useState, useCallback } from "react";
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  // IF THERE IS AN ISSUE WITH THE RESPONSE, CREATES ERROR MESSAGE THAT EITHER PULLS FROM RESDATA JSON ON THE BACKEND OR DISPLAYS MORE GENERIC MESSAGE IF THAT IS UNAVAILABLE
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request"
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest };
}
