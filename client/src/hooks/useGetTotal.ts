import { useEffect, useState } from "react";
import { ICost } from "../types/cost";

function useGetTotal(spendings: ICost[], incomings: ICost[]): {
    total: number, totalSpendings: number, totalIncomings: number
} {

    const [total, setTotal] = useState<number>(0);
    const [totalSpendings, setTotalSpendings] = useState<number>(0);
    const [totalIncomings, setTotalIncomings] = useState<number>(0);

    useEffect(() => {
        const spendingsSum = spendings.reduce((sum, spending) => sum + spending.value, 0);
        const incomingsSum = incomings.reduce((sum, incoming) => sum + incoming.value, 0);

        setTotalSpendings(spendingsSum);
        setTotalIncomings(incomingsSum);
        setTotal(incomingsSum + spendingsSum);
    }, [spendings, incomings]);

    return {
        total,
        totalSpendings,
        totalIncomings
    }
}

export default useGetTotal;