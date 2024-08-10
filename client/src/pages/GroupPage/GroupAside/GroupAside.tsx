import { FC, useEffect, useState } from "react";

import getDate from "../../../utils/getDate";

import { ICost } from "../../../types/cost";
import { CategoryType, imgCategories } from "../../../utils/imgCategories";

import AddButton from "../../../components/AddButton/AddButton";

import styles from "./group-aside.module.scss";

interface GroupAsideProps {
    costs: ICost[];
    setVisible: (state: boolean) => void;
}

const GroupAside: FC<GroupAsideProps> = ({ costs, setVisible }) => {

    const [categoryFilter, setCategoryFilter] = useState<string | null | undefined>(null);
    const [typeFilter, setTypeFilter] = useState<string | null | undefined>(null);
    const [filteredCosts, setFilteredCosts] = useState<ICost[]>([]);

    const filterCosts = () => {
        if (categoryFilter) {
            setFilteredCosts(costs.filter((cost: ICost) => cost.category?.name === categoryFilter));
        } else {
            setFilteredCosts(costs);
        }

        if (typeFilter) {
            setFilteredCosts(prevState => prevState.filter((cost: ICost) => cost.type === typeFilter));
        }
    }

    useEffect(() => {
        filterCosts();
    }, [categoryFilter, typeFilter])

    return (
        <aside className={styles.aside}>
            <h2>Останні зміни</h2>
            {categoryFilter &&
                <h3>
                    Лише: {categoryFilter}
                    <span
                        className={styles.delete_button}
                        onClick={() => setCategoryFilter(null)}
                    >X</span>
                </h3>
            }
            {typeFilter &&
                <h3>
                    Лише: {typeFilter === "SPENDING" ? "Витрати" : "Доходи"}
                    <span
                        className={styles.delete_button}
                        onClick={() => setTypeFilter(null)}
                    >X</span>
                </h3>
            }
            <div className={styles.end_row}>
                <AddButton onClick={() => setVisible(true)} />
            </div>
            {costs.length > 0
                ?
                <>
                    {filteredCosts.map((cost: ICost) =>
                        <div className={styles.last_change} key={`cost-aside#${cost.id}`}>
                            <img
                                className={styles.last_change__picture}
                                src={imgCategories[cost.category?.imgId as CategoryType]}
                                alt={cost.category?.name}
                                onClick={() => setCategoryFilter(cost?.category?.name)}
                            />
                            <div className={styles.last_spending__info}>
                                <h4
                                    onClick={() => setCategoryFilter(cost?.category?.name)}
                                >
                                    {cost.category?.name}
                                </h4>
                                <h5 className={styles.date}>{getDate(cost.createdAt)}</h5>
                            </div>
                            <div
                                className={cost.value >= 0
                                    ? [styles.last_spending__info, styles.green].join(" ")
                                    : [styles.last_spending__info, styles.red].join(" ")
                                }
                                onClick={() => setTypeFilter(cost?.type)}
                            >
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