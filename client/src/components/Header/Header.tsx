import styles from "./header.module.scss";

const Header = () => {

    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>CheckMyMoney</h1>
            <span className={styles.header__button}>Налаштування</span>
            <span className={styles.header__button}>Увійти</span>
        </header>
    );
}

export default Header;