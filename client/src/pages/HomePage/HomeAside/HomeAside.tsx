import styles from "./home-aside.module.scss";

const HomeAside = () => {

    return (
        <aside className={styles.aside}>
            <h2>Останні зміни</h2>
            <div className={styles.last_change}>
                <img className={styles.last_change__picture} src="https://cdn-icons-png.flaticon.com/512/5013/5013582.png" alt="" />
                <div className={styles.last_spending__info}>
                    <h4>Транспрот</h4>
                    <span>-120</span>
                </div>
            </div>
            <div className={styles.last_change}>
                <img className={styles.last_change__picture} src="https://cdn-icons-png.flaticon.com/512/5013/5013582.png" alt="" />
                <div className={styles.last_spending__info}>
                    <h4>Транспрот</h4>
                    <span>-22</span>
                </div>
            </div>
            <div className={styles.last_change}>
                <img className={styles.last_change__picture} src="https://cdn-icons-png.flaticon.com/512/5013/5013582.png" alt="" />
                <div className={styles.last_spending__info}>
                    <h4>Транспрот</h4>
                    <span>-42</span>
                </div>
            </div>
            <div className={styles.last_change}>
                <img className={styles.last_change__picture} src="https://cdn-icons-png.flaticon.com/512/5013/5013582.png" alt="" />
                <div className={styles.last_spending__info}>
                    <h4>Транспрот</h4>
                    <span>-85</span>
                </div>
            </div>
        </aside>
    );
}

export default HomeAside;