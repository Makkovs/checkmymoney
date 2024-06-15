import { FC } from "react";

import InfoCost from "../InfoCost/InfoCost";
import { ICost } from "../../../types/cost";

import styles from "./group-bank-info.module.scss";

interface GroupBankInfoProps {
    spendings: ICost[];
    incomings: ICost[];
}

const GroupBankInfo: FC<GroupBankInfoProps> = ({ spendings, incomings }) => {

    return (
        <section className={styles.bank__info}>
            <div className={styles.costs}>
                {spendings.map((spending: ICost) =>
                    <InfoCost cost={spending} key={`cost-info#${spending.id}`} />
                )}
            </div>
            <div className={styles.costs}>
                {incomings.map((incoming: ICost) =>
                    <InfoCost cost={incoming} key={`cost-info#${incoming.id}`} />
                )}
            </div>
        </section>
    );
}

export default GroupBankInfo;