import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Group from "./Group/Group";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";

import { fetchOneUser } from "../../http/userAPI";
import { fetchAllCosts } from "../../http/costAPI";
import { createGroup, fetchAllGroups } from "../../http/costGroupAPI";

import { ICost } from "../../types/cost";
import { IGroup } from "../../types/group";
import { GROUP_ROUTE } from "../../utils/paths";

import styles from "./groups-page.module.scss";

const GroupsPage: FC = () => {

    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [inputName, setInputName] = useState<string>("");

    const getGroups = async () => {
        setLoading(true);

        try {
            const data = await fetchAllGroups();
            const costGroups: IGroup[] = data.costGroups;

            const updatedGroups = await Promise.all(costGroups.map(async (costGroup: IGroup) => {
                const userData = await fetchOneUser(costGroup.ownerId);
                const costData = await fetchAllCosts(null, null, costGroup.id, null, null);
                const costs: number[] = Array.from(costData.costs.rows.map((cost: ICost) => cost.value));
                const allCosts: number = costs.reduce((a: number, c: number) => a + c, 0);

                return {
                    ...costGroup,
                    ownerName: userData.user.name,
                    cost: allCosts
                }
            }));

            setGroups(updatedGroups);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createNewGroup = async () => {
        try {
            createGroup(inputName).then(() => {
                setModalVisible(false);
                getGroups();
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGroups();
    }, []);

    return (
        <article className={styles.groups}>
            {loading
                ?
                <Loading
                    loading={loading}
                    style={{ left: "0" }} /
                >
                :
                <>
                    <Modal visible={modalVisible} setVisible={setModalVisible}>
                        <div className={styles.modal_container}>
                            <h2>Нова група</h2>
                            <Input
                                type="text"
                                value={inputName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
                                placeholder="назва"
                            />
                            <Button
                                onClick={createNewGroup}
                            >
                                Створити
                            </Button>
                        </div>
                    </Modal>
                    {groups.map((group: IGroup) =>
                        <NavLink
                            className={styles.group_link}
                            to={GROUP_ROUTE + `/${group.id}`}
                            key={group.id}
                        >
                            <Group group={group} />
                        </NavLink>
                    )}
                    <div
                        className={styles.plus_container}
                        onClick={() => setModalVisible(true)}
                    >
                        +
                    </div>
                </>
            }
        </article>
    );
}

export default GroupsPage;