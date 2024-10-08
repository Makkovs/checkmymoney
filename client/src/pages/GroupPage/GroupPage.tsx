import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import useGetCosts from "../../hooks/useGetCosts";
import useSortByType from "../../hooks/useSortByType";
import useGetTotal from "../../hooks/useGetTotal";

import GroupAside from "./GroupAside/GroupAside";
import Loading from "../../components/Loading/Loading";
import GroupBankInfo from "./GroupBankInfo/GroupBankInfo";
import CostCreateModal from "./CostCreateModal/CostCreateModal";
import GroupBankDiagram from "./GroupBankDiagram/GroupBankDiagram";

import { fetchOneGroup } from "../../http/costGroupAPI";

import { IGroup } from "../../types/group";
import { CostTypes, TimePeriods } from "../../types/cost";

import styles from "./group-page.module.scss";

const GroupPage: FC = () => {

    const { id } = useParams<{ id: string }>();

    const [group, setGroup] = useState<IGroup>();

    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [costType, setCostType] = useState<string>(CostTypes.SPENDING);
    const [timePeriod, setTimePeriod] = useState<string>(TimePeriods.ALLTIME);

    const { costs, getCosts, setCosts } = useGetCosts(Number(id), setLoading);
    const { spendings, incomings } = useSortByType(costs);
    const { total, totalSpendings, totalIncomings } = useGetTotal(spendings, incomings);

    useEffect(() => {
        fetchOneGroup(Number(id)).then((data) => setGroup(data.costGroup));
    }, []);

    useEffect(() => {
        switch(timePeriod){
            case TimePeriods.ALLTIME:
                getCosts(null);
                break;
            case TimePeriods.MONTH:
                const firstDateMonth = new Date();
                firstDateMonth.setHours(0, 0, 0);
                firstDateMonth.setDate(1);

                const secondDateMonth = new Date(firstDateMonth);
                secondDateMonth.setMonth(firstDateMonth.getMonth() + 1)
                getCosts([firstDateMonth, secondDateMonth]);
                break;
            case TimePeriods.YEAR:
                const firstDateYear = new Date();
                firstDateYear.setHours(0, 0, 0);
                firstDateYear.setDate(1);
                firstDateYear.setMonth(0);
                
                const secondDateYear = new Date(firstDateYear);
                secondDateYear.setFullYear(firstDateYear.getFullYear() + 1);
                getCosts([firstDateYear, secondDateYear]);
                break;
            default:
                break;
        }
    }, [timePeriod])

    return (
        <main className={styles.content}>
            {loading
                ?
                <Loading loading={loading} />
                :
                <>
                    <CostCreateModal
                        visible={visible}
                        setVisible={setVisible}
                        costGroupId={Number(id)}
                        getCosts={getCosts}
                    />
                    <GroupAside costs={costs} setVisible={setVisible} />
                    <article className={styles.bank}>
                        <h2 className={styles.groupName}>{group?.name}</h2>
                        <GroupBankDiagram costs={costType === CostTypes.SPENDING ? spendings : incomings} />
                        <section>
                            {costType === CostTypes.SPENDING
                                ?
                                <h2 className={styles.total}>
                                    Витрати: <span className={styles.red}>{totalSpendings}</span>
                                </h2>
                                :
                                <h2 className={styles.total}>
                                    Доходи: <span className={styles.green}>{totalIncomings}</span>
                                </h2>
                            }
                            <h2 className={styles.total}>
                                Підсумки: <span className={total >= 0 ? styles.green : styles.red}>{total}</span>
                            </h2>
                        </section>
                        <section>
                            <span
                                className={styles.cost_type_text}
                                onClick={() => setTimePeriod(TimePeriods.MONTH)}
                            >
                                <input 
                                    className={styles.cost_type_radio}
                                    type="radio" 
                                    name="time"
                                    value={TimePeriods.MONTH}
                                    checked={timePeriod === TimePeriods.MONTH}
                                    onChange={(e) => setTimePeriod(e.target.value)}
                                /> Місяць
                            </span>
                            <span
                                className={styles.cost_type_text}
                                onClick={() => setTimePeriod(TimePeriods.YEAR)}
                            >
                                <input 
                                    className={styles.cost_type_radio}
                                    type="radio" 
                                    name="time"
                                    value={TimePeriods.YEAR}
                                    checked={timePeriod === TimePeriods.YEAR}
                                    onChange={(e) => setTimePeriod(e.target.value)}
                                /> Рік
                            </span>
                            <span
                                className={styles.cost_type_text}
                                onClick={() => setTimePeriod(TimePeriods.ALLTIME)}
                            >
                                <input 
                                    className={styles.cost_type_radio}
                                    type="radio" 
                                    name="time"
                                    value={TimePeriods.ALLTIME}
                                    checked={timePeriod === TimePeriods.ALLTIME}
                                    onChange={(e) => setTimePeriod(e.target.value)}
                                /> Весь час
                            </span>
                        </section>
                        <section>
                            <span
                                className={styles.cost_type_text}
                                onClick={() => setCostType(CostTypes.SPENDING)}
                            >
                                <input
                                    className={styles.cost_type_radio}
                                    type="radio"
                                    name="cost"
                                    value={CostTypes.SPENDING}
                                    checked={costType === CostTypes.SPENDING}
                                    onChange={(e) => setCostType(e.target.value)}
                                /> Витрати
                            </span>
                            <span
                                className={styles.cost_type_text}
                                onClick={() => setCostType(CostTypes.INCOMING)}
                            >
                                <input
                                    className={styles.cost_type_radio}
                                    type="radio"
                                    name="cost"
                                    value={CostTypes.INCOMING}
                                    checked={costType === CostTypes.INCOMING}
                                    onChange={(e) => setCostType(e.target.value)}
                                />
                                Доходи
                            </span>
                        </section>
                        <GroupBankInfo
                            costs={costType === CostTypes.SPENDING ? spendings : incomings}
                            setVisible={setVisible}
                        />
                    </article>
                </>
            }
        </main>
    );
}

export default GroupPage;