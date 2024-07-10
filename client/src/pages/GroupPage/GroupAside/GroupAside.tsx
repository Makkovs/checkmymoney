import { FC } from "react";

import { CategoryType, imgCategories } from "../../../utils/imgCategories";
import { ICost } from "../../../types/cost";

import styles from "./group-aside.module.scss";
import AddButton from "../../../components/AddButton/AddButton";

interface GroupAsideProps {
    costs: ICost[];
    setVisible: (state: boolean) => void;
}

const GroupAside: FC<GroupAsideProps> = ({ costs, setVisible }) => {

    return (
        <aside className={styles.aside}>
            <h2>Останні зміни</h2>
            <div className={styles.end_row}>
                <AddButton onClick={() => setVisible(true)} />
            </div>
            {costs.length > 0
                ?
                <>
                    {costs.map((cost: ICost) =>
                        <div className={styles.last_change} key={`cost-aside#${cost.id}`}>
                            <img
                                className={styles.last_change__picture}
                                src={imgCategories[cost.category?.imgId as CategoryType]}
                                alt={cost.category?.name}
                            />
                            <div className={styles.last_spending__info}>
                                <h4>{cost.category?.name}</h4>
                            </div>
                            <div className={cost.value >= 0
                                ? [styles.last_spending__info, styles.green].join(" ")
                                : [styles.last_spending__info, styles.red].join(" ")
                            }>
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
        </aside>
    );
}

export default GroupAside;