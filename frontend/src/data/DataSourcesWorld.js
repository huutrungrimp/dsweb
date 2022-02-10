import { useState, useEffect } from "react";
import axios from "axios";


export const AcMapData = () => {
  const [ac, setAC] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/active_cases`).then((res) => {
      const item = res.data;
      setAC(item);
    });
  }, []);
  console.log(ac);

  return ac;
};

export const DeathMapData = () => {
    const [death, setDeath] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ontario/deaths`).then((res) => {
      const item = res.data;
      setDeath(item);
    });
  }, []);
  console.log(death);
  
  return death;
};

export const RecoveryMapData = () => {
    const [recovery, setRecovery] = useState({});
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/ontario/resolved_cases`).then((res) => {
        const item = res.data;
        setRecovery(item);
      });
    }, []);
    console.log(recovery);
    
    return recovery;
};
