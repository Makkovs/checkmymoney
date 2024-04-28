import { FC } from "react";
import styles from "./home-bank-info.module.scss";

interface HomeBankInfoProps {
    spendings: cost[];
    incomings: cost[];
}

const HomeBankInfo: FC<HomeBankInfoProps> = ({ spendings, incomings }) => {

    return (
        <section className={styles.bank__info}>
            <div className={styles.costs}>
                {spendings.map((spending: cost, index: number) =>
                    <div className={styles.cost} key={Date.now() * index}>
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
                {incomings.map((incoming: cost, index: number) =>
                    <div className={styles.cost} key={Date.now() * index}>
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