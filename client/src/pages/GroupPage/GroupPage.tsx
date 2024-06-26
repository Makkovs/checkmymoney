import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import Loading from "../../components/Loading/Loading";

import GroupAside from "./GroupAside/GroupAside";
import GroupBankInfo from "./GroupBankInfo/GroupBankInfo";
import CostCreateModal from "./CostCreateModal/CostCreateModal";
import GroupBankDiagram from "./GroupBankDiagram/GroupBankDiagram";

import { fetchOneCategory } from "../../http/categoryAPI";
import { fetchOneGroup } from "../../http/costGroupAPI";
import { fetchAllCosts } from "../../http/costAPI";

import { IGroup } from "../../types/group";
import { CostTypes, ICost } from "../../types/cost";

import styles from "./group-page.module.scss";

const GroupPage: FC = () => {

    const { id } = useParams();

    const [group, setGroup] = useState<IGroup>();
    const [costs, setCosts] = useState<ICost[]>([]);

    const [spendings, setSpendings] = useState<ICost[]>([]);
    const [incomings, setIncomings] = useState<ICost[]>([]);

    const [costType, setCostType] = useState<string>(CostTypes.SPENDING);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);

    const getCosts = async () => {
        try {
            const data = await fetchAllCosts(null, null, Number(id), null, null);
            const sortedCosts: ICost[] = data.costs.rows.sort((a: ICost, b: ICost) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            const updatedCosts = await Promise.all(sortedCosts.map(async (cost: ICost) => {
                const categoryData = await fetchOneCategory(cost.categoryId);
                return {
                    ...cost,
                    category: categoryData
                }
            }));

            setCosts(updatedCosts);
            setSpendings(updatedCosts.filter((cost: ICost) => cost.type === CostTypes.SPENDING));
            setIncomings(updatedCosts.filter((cost: ICost) => cost.type == CostTypes.INCOMING));

        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOneGroup(Number(id)).then((data) => setGroup(data.costGroup));
        getCosts()
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
                        <GroupBankDiagram costs={costType === CostTypes.SPENDING ? spendings : incomings} />
                        <section>
                            <span onClick={() => setCostType(CostTypes.SPENDING)}>
                                <input
                                    className={styles.cost_type_radio}
                                    type="radio"
                                    name="cost"
                                    value={CostTypes.SPENDING}
                                    checked={costType === CostTypes.SPENDING}
                                    onChange={(e) => setCostType(e.target.value)}
                                /> Витрати
                            </span>
                            <span onClick={() => setCostType(CostTypes.INCOMING)}>
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
                        <GroupBankInfo spendings={spendings} incomings={incomings} />
                    </article>
                </>
            }
        </main>
    );
}

export default GroupPage;