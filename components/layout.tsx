import React, { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { useRouter } from "next/router";

const Layout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const pageLists = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Task List",
      link: "/list",
    },
    {
      title: "Task Form",
      link: "/form",
    },
  ];
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <hr />
      <header>
        <nav>
          <ul className={styles.header__list}>
            {pageLists.map((pageList) => {
              const { link, title } = pageList;
              const classes =
                router.pathname === link
                  ? `${styles.header__link} ${styles.activeLink}`
                  : styles.header__link;
              return (
                <li key={title}>
                  <Link href={link}>
                    <a className={classes}>{title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <hr />

      <main className={styles.main}>
        {children}
        {title !== "Home" && (
          <Link href={"/"}>
            <a className={styles.homeLink}>← Home</a>
          </Link>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;