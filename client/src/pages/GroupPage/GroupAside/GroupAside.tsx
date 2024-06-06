import { FC } from "react";

import { CategoryType, imgCategories } from "../../../utils/imgCategories";

import styles from "./group-aside.module.scss";

interface GroupAsideProps {
    costs: ICost[];
}

const GroupAside: FC<GroupAsideProps> = ({ costs }) => {

    return (
        <aside className={styles.aside}>
            <h2>Останні зміни</h2>
            {costs.slice(0, 8).map((cost: ICost) =>
                <div className={styles.last_change} key={`cost-aside#${cost.id}`}>
                    <img
                        className={styles.last_change__picture}
                        src={imgCategories[cost.category as CategoryType]}
                        alt={cost.category}
                    />
                    <div className={styles.last_spending__info}>
                        <h4>{cost.category}</h4>
                        <span>{cost.cost}</span>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default GroupAside;