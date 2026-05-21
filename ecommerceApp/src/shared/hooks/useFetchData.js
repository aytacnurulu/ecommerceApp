import { useState } from "react";

export default function useFetchData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (apiCall) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    request,
  };
}

