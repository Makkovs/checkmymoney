import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import Loading from "../../components/Loading/Loading";

import GroupAside from "./GroupAside/GroupAside";
import GroupBankInfo from "./GroupBankInfo/GroupBankInfo";
import GroupBankDiagram from "./GroupBankDiagram/GroupBankDiagram";

import { fetchOneGroup } from "../../http/costGroupAPI";
import { fetchAllCosts } from "../../http/costAPI";

import { IGroup } from "../../types/group";

import styles from "./group-page.module.scss";

const GroupPage: FC = () => {

    const { id } = useParams();

    const [group, setGroup] = useState<IGroup>();
    const [costs, setCosts] = useState<ICost[]>([]);

    const [spendings, setSpendings] = useState<ICost[]>([]);
    const [incomings, setIncomings] = useState<ICost[]>([]);

    const [costType, setCostType] = useState<string>("SPENDING");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchOneGroup(Number(id)).then((data) => setGroup(data.costGroup));

        fetchAllCosts(null, null, Number(id), null, null).then((data) => {
            const sortedCosts = data.costs.rows.sort((a: ICost, b: ICost) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setCosts(sortedCosts);
            setSpendings(sortedCosts.filter((cost: ICost) => cost.type === "SPENDING"));
            setIncomings(sortedCosts.filter((cost: ICost) => cost.type === "INCOMING"));
        }).finally(() => setLoading(false));

    }, []);

    return (
        <main className={styles.content}>
            {loading
                ?
                <Loading loading={loading} />
                :
                <>
                    <GroupAside costs={costs} />
                    <article className={styles.bank}>
                        <GroupBankDiagram costs={costType === "SPENDING" ? spendings : incomings} />
                        <section>
                            <span onClick={() => setCostType("SPENDING")}>
                                <input
                                    className={styles.cost_type_radio}
                                    type="radio"
                                    name="cost"
                                    value={"SPENDING"}
                                    checked={costType === "SPENDING"}
                                    onChange={(e) => setCostType(e.target.value)}
                                /> Витрати
                            </span>
                            <span onClick={() => setCostType("INCOMING")}>
                                <input
                                    className={styles.cost_type_radio}
                                    type="radio"
                                    name="cost"
                                    value={"INCOMING"}
                                    checked={costType === "INCOMING"}
                                    onChange={(e) => setCostType(e.target.value)}
                                />
                                Доходи
                            </span>
                        </section>
                        <GroupBankInfo spendings={spendings} incomings={incomings} />
                    </article>
                </>
            }
        </main>
    );
}

export default GroupPage;