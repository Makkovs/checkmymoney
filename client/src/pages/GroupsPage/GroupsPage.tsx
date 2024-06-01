import { FC, useEffect, useState } from "react";

import Group from "./Group/Group";
import Loading from "../../components/Loading/Loading";

import { fetchOneUser } from "../../http/userAPI";
import { createGroup, fetchAllGroups } from "../../http/costGroupAPI";

import { IGroup } from "../../types/group";

import styles from "./groups-page.module.scss";

const GroupsPage: FC = () => {

    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getGroups = async () => {
        setLoading(true);

        try {
            const data = await fetchAllGroups();
            const costGroups: IGroup[] = data.costGroups;

            const updatedGroups = await Promise.all(costGroups.map(async (costGroup: IGroup) => {
                const userData = await fetchOneUser(costGroup.ownerId);
                return {
                    ...costGroup,
                    ownerName: userData.user.name,
                    cost: Math.round(1000 * Math.random())
                }
            }));

            setGroups(updatedGroups);
        } catch (error: unknown) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createNewGroup = () => {
        createGroup("test").then(() => getGroups());
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
                    {groups.map((group: IGroup) =>
                        <Group group={group} key={group.id} />
                    )}
                    <div
                        className={styles.plus_container}
                        onClick={createNewGroup}
                    >
                        +
                    </div>
                </>
            }
        </article>
    );
}

export default GroupsPage;