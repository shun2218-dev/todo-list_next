import { useEffect, useState } from "react";
import { taskObj } from "../types/type";

const useStorageData = () => {
  const [tasks, setTasks] = useState<taskObj[]>([]);
  useEffect(() => {
    const strageData = JSON.parse(String(localStorage.getItem("tasks"))) ?? [];
    setTasks(strageData);
  }, []);
  return { tasks, setTasks };
};

export default useStorageData;
