import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import useGetGroups from "../../hooks/useGetGroups";
import { createGroup } from "../../http/costGroupAPI";

import Group from "./Group/Group";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";

import { IGroup } from "../../types/group";
import { GROUP_ROUTE } from "../../utils/paths";

import styles from "./groups-page.module.scss";

const GroupsPage: FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { groups, getGroups } = useGetGroups(setLoading);

    const [inputName, setInputName] = useState<string>("");

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