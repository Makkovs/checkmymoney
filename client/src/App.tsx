import styles from "./App.module.scss";

function App() {

    return (
        <>
            <header className={styles.header}>
                <h2 className={styles.header__title}>CheckMoney</h2>
                <span className={styles.header__button}>Налаштування</span>
                <span className={styles.header__button}>Увійти</span>
            </header>
            <main className={styles.content}>
                <aside className={styles.aside}>
                    <div className={styles.last_changes}>
                        <div className={styles.last_spending__img}></div>
                        <div className={styles.last_spending__info}>
                            <h4>Транспрот</h4>
                            <span>12</span>
                        </div>
                    </div>
                    <div className={styles.last_changes}>
                        <div className={styles.last_spending__img}></div>
                        <div className={styles.last_spending__info}>
                            <h4>Транспрот</h4>
                            <span>12</span>
                        </div>
                    </div>
                    <div className={styles.last_changes}>
                        <div className={styles.last_spending__img}></div>
                        <div className={styles.last_spending__info}>
                            <h4>Транспрот</h4>
                            <span>12</span>
                        </div>
                    </div>
                    <div className={styles.last_changes}>
                        <div className={styles.last_spending__img}></div>
                        <div className={styles.last_spending__info}>
                            <h4>Транспрот</h4>
                            <span>12</span>
                        </div>
                    </div>
                </aside>
                <article className={styles.spendings}>
                    
                </article>
            </main>
        </>
    );
}

export default App
