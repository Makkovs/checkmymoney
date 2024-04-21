import styles from "./App.module.scss";
import { Chart, ArcElement } from 'chart.js'
import { Pie } from "react-chartjs-2";

const App = () => {

    Chart.register(ArcElement);

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>CheckMyMoney</h1>
                <span className={styles.header__button}>Налаштування</span>
                <span className={styles.header__button}>Увійти</span>
            </header>
            <main className={styles.content}>
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
                <article className={styles.bank}>
                    <section className={styles.bank__diagram}>
                        <Pie
                            data={
                                {
                                    labels: [
                                        'Red',
                                        'Blue',
                                        'Yellow'
                                    ],
                                    datasets: [{
                                        label: 'My First Dataset',
                                        data: [200, 50, 100],
                                        backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(255, 205, 86)'
                                        ],
                                        hoverOffset: 4,
                                    }]
                                }
                            }
                            height={"450px"}
                            width={"450px"}
                            options={{ maintainAspectRatio: false }}
                        />

                    </section>
                    <section className={styles.bank__info}>
                        <div className={styles.spendings}>
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/8280/8280802.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/9534/9534217.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/5013/5013582.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/9332/9332769.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/4315/4315512.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/6572/6572826.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/8285/8285619.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/5724/5724367.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/9331/9331677.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/7570/7570964.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/455/455801.png" alt="" />
                        </div>
                        <div className={styles.incomings}>
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/9242/9242802.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/4763/4763161.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/12741/12741685.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/8320/8320156.png" alt="" />
                            <img className={styles.bank__picture} src="https://cdn-icons-png.flaticon.com/512/455/455801.png" alt="" />
                        </div>
                    </section>
                </article>
            </main>
        </>
    );
}

export default App
