import styles from "./home-bank-info.module.scss";

const HomeBankInfo = () => {

    return (
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
    );
}

export default HomeBankInfo;