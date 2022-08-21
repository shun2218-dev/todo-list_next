import type { NextPage } from "next";
import { MouseEvent, useEffect, useState } from "react";
import Layout from "../components/layout";
import useStorageData from "../hooks/useStorageData";
import utilStyles from "../styles/utils.module.css";
import { taskObj } from "../types/type";
import DoneIcon from "@mui/icons-material/Done";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { IconButton } from "@mui/material";

export type filteredObj = {
  todo?: taskObj[];
  workInProgress?: taskObj[];
  complete?: taskObj[];
};

const List: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, setTasks } = useStorageData();
  const boxTitles = ["todo", "work in progress", "complete"];

  const statusChange = async (
    e: MouseEvent<HTMLButtonElement>,
    tasks: taskObj[],
    next: boolean
  ) => {
    const target = tasks.find(
      ({ createAt }) => createAt.toLocaleString() === e.currentTarget.id
    );
    const targetIndex = tasks.findIndex(
      ({ createAt }) => createAt.toLocaleString() === e.currentTarget.id
    );
    const nextStatus = next
      ? tasks[targetIndex].status + 1
      : tasks[targetIndex].status - 1;
    tasks[targetIndex].status = nextStatus;
    const newData = JSON.stringify(tasks);
    localStorage.setItem("tasks", newData);
    setTasks(tasks);
  };

  useEffect(() => {
    const strageData = JSON.parse(String(localStorage.getItem("tasks"))) ?? [];
    setTasks(strageData);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [tasks]);

  return (
    <Layout title="List">
      <h1>Task list</h1>
      <ul className={utilStyles.grid}>
        {boxTitles.map((boxTitle, index) => {
          const filteredTasks = tasks.filter(({ status }) => status === index);
          return (
            <li
              className={`${utilStyles.textAlign_center} ${utilStyles.m5}`}
              key={boxTitle}
            >
              <h2>{boxTitle}</h2>
              <div className={utilStyles.card}>
                <ul className={utilStyles.card__item}>
                  {!isLoading &&
                    filteredTasks.map(({ createAt, task, status }) => {
                      return (
                        <li
                          key={createAt.toLocaleString()}
                          className={utilStyles.flex}
                        >
                          <p className={utilStyles.mpNone}>{task}</p>
                          {status === 0 ? (
                            <IconButton
                              color={"success"}
                              onClick={async (e) => {
                                setIsLoading(true);
                                await statusChange(e, tasks, true);
                                setIsLoading(false);
                              }}
                              id={createAt.toLocaleString()}
                            >
                              <DoneIcon />
                            </IconButton>
                          ) : status === 1 ? (
                            <>
                              <IconButton
                                color={"success"}
                                onClick={async (e) => {
                                  setIsLoading(true);
                                  await statusChange(e, tasks, true);
                                  setIsLoading(false);
                                }}
                                id={createAt.toLocaleString()}
                              >
                                <DoneIcon />
                              </IconButton>

                              <IconButton
                                color={"error"}
                                onClick={async (e) => {
                                  setIsLoading(true);
                                  await statusChange(e, tasks, false);
                                  setIsLoading(false);
                                }}
                                id={createAt.toLocaleString()}
                              >
                                <BackspaceIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              color={"error"}
                              onClick={async (e) => {
                                setIsLoading(true);
                                await statusChange(e, tasks, false);
                                setIsLoading(false);
                              }}
                              id={createAt.toLocaleString()}
                            >
                              <BackspaceIcon />
                            </IconButton>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default List;
