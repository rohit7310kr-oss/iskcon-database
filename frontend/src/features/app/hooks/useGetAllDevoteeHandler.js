import React from "react";
import { useEffect } from "react";
import { getAllDevotee } from "../service/devotees";
import { useState } from "react";

const useGetAllDevoteeHandler = (setToast) => {
  const [devotees, setDevotees] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [count, setCount] = useState(0);

  const reFetch = () => {
    setCount((c) => c + 1);
  };

  const handleGetDevotee = async function () {
    setListLoading(true);
    try {
      const res = await getAllDevotee();
      setDevotees(res.data);
    } catch (err) {
      setToast({ type: "error", message: "Failed to load devotees." });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    handleGetDevotee();
  }, [count]);

  return { devotees, listLoading, reFetch };
};

export default useGetAllDevoteeHandler;
