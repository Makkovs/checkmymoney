import { FC } from "react";

import { IGroup } from "../../../types/group";

import styles from "../groups-page.module.scss";

interface GroupProps {
    group: IGroup;
}

const Group: FC<GroupProps> = ({ group }) => {

    return (
        <div className={styles.group}>
            <h2>{group.name}</h2>
            <div className={styles.group__row}>Власник: {group?.ownerName}</div>
            <div className={styles.group__row}>Підсумок за 30 днів: {group?.cost}</div>
        </div>
    );
}

export default Group;