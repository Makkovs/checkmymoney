import { FC } from "react";

import { CategoryType, imgCategories } from "../../../utils/imgCategories";
import { ICost } from "../../../types/cost";

import styles from "../GroupBankInfo/group-bank-info.module.scss";

interface InfoCostProps {
    cost: ICost;
}

const InfoCost: FC<InfoCostProps> = ({ cost }) => {

    return (
        <div className={styles.cost}>
            <span
                className={styles.cost__text}
                title={cost.category?.name}
            >
                {cost.category?.name}
            </span>
            <img
                className={styles.bank__picture}
                src={imgCategories[cost.category?.imgId as CategoryType]}
                title={cost.category?.name}
                alt={cost.category?.name}
            />
            <span className={styles.cost__text}>{cost.value}</span>
        </div>
    );
}

export default InfoCost;