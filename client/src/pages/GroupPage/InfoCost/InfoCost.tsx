import { FC } from "react";
import { CategoryType, imgCategories } from "../../../utils/imgCategories";

import styles from "../GroupBankInfo/group-bank-info.module.scss";

interface InfoCostProps {
    cost: ICost;
}

const InfoCost: FC<InfoCostProps> = ({ cost }) => {

    return (
        <div className={styles.cost}>
            <span
                className={styles.cost__text}
                title={cost.category}
            >
                {cost.category}
            </span>
            <img
                className={styles.bank__picture}
                src={imgCategories[cost.category as CategoryType]}
                title={cost.category}
                alt={cost.category}
            />
            <span className={styles.cost__text}>{cost.cost}</span>
        </div>
    );
}

export default InfoCost;