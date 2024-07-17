import { FC } from "react";
    
import AddButton from "../../../components/AddButton/AddButton";
import InfoCost from "../InfoCost/InfoCost";

import { ICost } from "../../../types/cost";

import styles from "./group-bank-info.module.scss";

interface GroupBankInfoProps {
    costs: ICost[];
    setVisible: (state: boolean) => void;
}

const GroupBankInfo: FC<GroupBankInfoProps> = ({ costs, setVisible }) => {

    return (
        <section className={styles.bank__info}>
            <div className={styles.costs}>
                {costs.map((cost: ICost) =>
                    <InfoCost cost={cost} key={`cost-info#${cost.id}`} />
                )}
                <div className={styles.add_button}>
                    <AddButton onClick={() => setVisible(true)}/>
                </div>
            </div>
        </section>
    );
}

export default GroupBankInfo;