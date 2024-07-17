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
import { CostTypes } from "../../types/cost";

import styles from "./group-page.module.scss";

const GroupPage: FC = () => {

    const { id } = useParams<{ id: string }>();

    const [group, setGroup] = useState<IGroup>();

    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [costType, setCostType] = useState<string>(CostTypes.SPENDING);

    const { costs, getCosts } = useGetCosts(Number(id), setLoading);
    const { spendings, incomings } = useSortByType(costs);
    const { total, totalSpendings, totalIncomings } = useGetTotal(spendings, incomings);

    useEffect(() => {
        fetchOneGroup(Number(id)).then((data) => setGroup(data.costGroup));
    }, []);

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