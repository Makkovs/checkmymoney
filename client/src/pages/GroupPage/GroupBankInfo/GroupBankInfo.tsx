import { FC } from "react";

import AddButton from "../../../components/AddButton/AddButton";
import InfoCost from "../InfoCost/InfoCost";

import { ICost } from "../../../types/cost";

import styles from "./group-bank-info.module.scss";

interface GroupBankInfoProps {
    costs: ICost[];
}

const GroupBankInfo: FC<GroupBankInfoProps> = ({ costs }) => {

    return (
        <section className={styles.bank__info}>
            <div className={styles.costs}>
                {costs.map((cost: ICost) =>
                    <InfoCost cost={cost} key={`cost-info#${cost.id}`} />
                )}
                <div className={styles.add_button}>
                    <AddButton />
                </div>
            </div>
        </section>
    );
}

export default GroupBankInfo;