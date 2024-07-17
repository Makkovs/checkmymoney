import { useEffect, useState } from "react";
import { CostTypes, ICost } from "../types/cost";

function useSortByType(costs: ICost[]): { spendings: ICost[], incomings: ICost[] } {

    const [spendings, setSpendings] = useState<ICost[]>([]);
    const [incomings, setIncomings] = useState<ICost[]>([]);

    useEffect(() => {
        const fetchedSpendings = costs.filter((cost: ICost) => cost.type == CostTypes.SPENDING);
        const fetchedIncomings = costs.filter((cost: ICost) => cost.type == CostTypes.INCOMING);

        setSpendings(fetchedSpendings);
        setIncomings(fetchedIncomings);
    }, [costs]);

    return { spendings, incomings };
}

export default useSortByType;