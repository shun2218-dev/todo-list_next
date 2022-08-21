import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/Layout.module.css";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <ul className={styles.grid}>
        <li>
          <Link href="/list">
            <a className={styles.card}>Task List</a>
          </Link>
        </li>
        <li>
          <Link href="form">
            <a className={styles.card}>Task Form</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Home;
