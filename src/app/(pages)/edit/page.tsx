"use client";
import EditPage from "@/components/Edit";
import Mask from "@/components/Mask";
import { useEffect } from "react";

const Edit = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/api/html");
      const data = await response.json();
      console.log(data);
    };

    fetchMovies();
  }, []);
  return (
    <>
      {/* <Mask /> */}
      <EditPage />
    </>
  );
};
export default Edit;
