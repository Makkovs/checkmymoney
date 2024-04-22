import HomeAside from './HomeAside/HomeAside';
import HomeBankDiagram from "./HomeBankDiagram/HomeBankDiagram";
import HomeBankInfo from './HomeBankInfo/HomeBankInfo';

import styles from "./home.module.scss";

const HomePage = () => {

    return (
        <main className={styles.content}>
            <HomeAside />
            <article className={styles.bank}>
                <HomeBankDiagram />
                <HomeBankInfo />
            </article>
        </main>
    );
}

export default HomePage;