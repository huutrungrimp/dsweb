import { useState, useEffect } from "react";
import axios from "axios";


export const EpiGraphON = () => {
  const [graphs, setGraghs] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/graphs`).then((res) => {
      const item = res.data;
      setGraghs(item);
    });
  }, []);
  console.log(graphs);

  return graphs;
};




export const EpiMapON = () => {
  const [maps, setMaps] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/maps`).then((res) => {
      const item = res.data;
      setMaps(item);
    });
  }, []);
  console.log(maps);

  return maps;
};





export const EpiDemographyON = () => {
  const [demography, setDemography] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/demography`).then((res) => {
      const item = res.data;
      setDemography(item);
    });
  }, []);
  console.log(demography);

  return demography;
};




export const GetPosts = () => {
  const [posts, setAC] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts`).then((res) => {
      const item = res.data;
      setAC(item);
    });
  }, []);
  console.log(posts);

  return posts;
};
