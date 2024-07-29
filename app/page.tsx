import Header from "./components/Header";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.main_video__container}>
        <video autoPlay muted playsInline loop>
          <source src="/presentation.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
}
