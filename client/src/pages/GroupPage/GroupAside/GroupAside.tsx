import { FC } from "react";

import { CategoryType, imgCategories } from "../../../utils/imgCategories";
import { ICost } from "../../../types/cost";

import styles from "./group-aside.module.scss";

interface GroupAsideProps {
    costs: ICost[];
    setVisible: (state: boolean) => void;
}

const GroupAside: FC<GroupAsideProps> = ({ costs, setVisible }) => {

    return (
        <aside className={styles.aside}>
            <h2>Останні зміни</h2>
            {costs.length > 0
                ?
                <>
                    {costs.slice(0, 8).map((cost: ICost) =>
                        <div className={styles.last_change} key={`cost-aside#${cost.id}`}>
                            <img
                                className={styles.last_change__picture}
                                src={imgCategories[cost.category?.imgId as CategoryType]}
                                alt={cost.category?.name}
                            />
                            <div className={styles.last_spending__info}>
                                <h4>{cost.category?.name}</h4>
                                <span>{cost.value}</span>
                            </div>
                        </div>
                    )}
                </>
                :
                <div className={styles.nothing}>
                    У вас немає змін
                </div>
            }
            <div
                className={styles.add_button}
                onClick={() => setVisible(true)}
            >
                +
            </div>
        </aside>
    );
}

export default GroupAside;