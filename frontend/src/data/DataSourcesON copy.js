import { useState, useEffect } from "react";
import axios from "axios";


export const ConfirmGraphDataON = () => {
  const [confirm, setConfirm] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/graphs/confirmed`).then((res) => {
      const item = res.data;
      setConfirm(item);
    });
  }, []);
  console.log(confirm);

  return confirm;
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



export const ActiveGraphDataON = () => {
  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/graphs/active_cases`).then((res) => {
      const item = res.data;
      setGraphData(item);
    });
  }, []);
  console.log(graphData);

  return graphData;
};

export const DeathGraphDataON = () => {
  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/graphs/deaths`).then((res) => {
      const item = res.data;
      setGraphData(item);
    });
  }, []);
  console.log(graphData);

  return graphData;
};

export const RecoveryGraphDataON = () => {
  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/graphs/resolved_cases`).then((res) => {
      const item = res.data;
      setGraphData(item);
    });
  }, []);
  console.log(graphData);

  return graphData;
};


export const MapDataON = () => {
  const [confirm, setAC] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/maps`).then((res) => {
      const item = res.data;
      setAC(item);
    });
  }, []);
  console.log(confirm);

  return confirm;
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
