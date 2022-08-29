import type { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import useStrageData from "../hooks/useStorageData";
import styles from "../styles/form.module.css";
import utilStyles from "../styles/utils.module.css";

const Form: NextPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { tasks, setTasks } = useStrageData();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = inputRef.current?.value;
    if (task) {
      const todo = {
        task: inputRef.current?.value,
        createAt: new Date(),
        status: 0,
      };
      const addData = JSON.stringify([...tasks, todo]);
      localStorage.setItem("tasks", addData);
      router.push("/list");
    } else {
      alert("Invalid value");
    }
  };

  useEffect(() => {
    const strageData = JSON.parse(String(localStorage.getItem("tasks"))) ?? [];
    setTasks(strageData);
  }, []);
  return (
    <Layout title="Form">
      <h1>Task form</h1>
      <form
        className={`${styles.taskForm} ${utilStyles.flex_center}`}
        action=""
        onSubmit={(e) => submitHandler(e)}
      >
        <input
          type="text"
          name="task"
          ref={inputRef}
          autoFocus
          className={`${styles.input}`}
        />
        <button type="submit" className={`${styles.addBtn}`}>
          追加
        </button>
      </form>
    </Layout>
  );
};

export default Form;
