import styles from "./home-bank-info.module.scss";

const HomeBankInfo = () => {

    const spendings = [
        {
            name: "Їжа",
            icon: "https://cdn-icons-png.flaticon.com/512/8280/8280802.png",
            cost: -3430
        },
        {
            name: "Житло",
            icon: "https://cdn-icons-png.flaticon.com/512/9534/9534217.png",
            cost: -12000
        },
        {
            name: "Транспорт",
            icon: "https://cdn-icons-png.flaticon.com/512/5013/5013582.png",
            cost: -1000
        },
        {
            name: "Медицина",
            icon: "https://cdn-icons-png.flaticon.com/512/9332/9332769.png",
            cost: -5000
        },
        {
            name: "Розваги",
            icon: "https://cdn-icons-png.flaticon.com/512/4315/4315512.png",
            cost: -300
        },
        {
            name: "Одяг",
            icon: "https://cdn-icons-png.flaticon.com/512/6572/6572826.png",
            cost: -1500
        },
        {
            name: "Подорожі",
            icon: "https://cdn-icons-png.flaticon.com/512/8285/8285619.png",
            cost: -2000
        },
        {
            name: "Комунальні послуги",
            icon: "https://cdn-icons-png.flaticon.com/512/5724/5724367.png",
            cost: -800
        },
        {
            name: "Виплати боргів",
            icon: "https://cdn-icons-png.flaticon.com/512/9331/9331677.png",
            cost: -3500
        },
        {
            name: "Побутова техніка",
            icon: "https://cdn-icons-png.flaticon.com/512/7570/7570964.png",
            cost: -1000
        },
        {
            name: "Інше",
            icon: "https://cdn-icons-png.flaticon.com/512/455/455801.png",
            cost: -500
        }
    ];

    const incomings = [
        {
            name: "Зарплатня",
            icon: "https://cdn-icons-png.flaticon.com/512/9242/9242802.png",
            cost: 34300
        },
        {
            name: "Оренда",
            icon: "https://cdn-icons-png.flaticon.com/512/4763/4763161.png",
            cost: 12000
        },
        {
            name: "Премії",
            icon: "https://cdn-icons-png.flaticon.com/512/12741/12741685.png",
            cost: 1000
        },
        {
            name: "Продаж майна",
            icon: "https://cdn-icons-png.flaticon.com/512/8320/8320156.png",
            cost: 5000
        },
        {
            name: "Інше",
            icon: "https://cdn-icons-png.flaticon.com/512/455/455801.png",
            cost: 300
        }
    ];

    return (
        <section className={styles.bank__info}>
            <div className={styles.costs}>
                {spendings.map(spending =>
                    <div className={styles.cost}>
                        <span
                            className={styles.cost__text}
                            title={spending.name}
                        >
                            {spending.name}
                        </span>
                        <img
                            className={styles.bank__picture}
                            src={spending.icon}
                            title={spending.name}
                            alt={spending.name}
                        />
                        <span className={styles.cost__text}>{spending.cost}</span>
                    </div>
                )}
            </div>
            <div className={styles.costs}>
                {incomings.map(incoming =>
                    <div className={styles.cost}>
                        <span
                            className={styles.cost__text}
                            title={incoming.name}
                        >
                            {incoming.name}
                        </span>
                        <img
                            className={styles.bank__picture}
                            src={incoming.icon}
                            title={incoming.name}
                            alt={incoming.name}
                        />
                        <span className={styles.cost__text}>{incoming.cost}</span>
                    </div>
                )}
            </div>
        </section>
    );
}

export default HomeBankInfo;