import { useEffect, useState } from "react";
import { ICost } from "../types/cost";

function useSortByValue(costs: ICost[]): { costs: ICost[], sum: number } {

    const [allCosts, setAllCosts] = useState<number>(0);
    const [sortedCosts, setSortedCosts] = useState<ICost[]>([]);

    useEffect(() => {
        const groupedCosts: ICost[] = [];
        costs.forEach((cost: ICost) => {
            const findend = groupedCosts.find((costG: ICost) => costG.category === cost.category);
            if (findend) {
                findend.value = Math.abs(findend.value) + Math.abs(cost.value);
            } else {
                groupedCosts.push({ ...cost });
            }
        });

        setAllCosts(
            Array.from(costs.map((cost: ICost) => cost.value))
                .reduce((prev: number, next: number) => Math.abs(prev) + Math.abs(next), 0)
        );

        setSortedCosts(groupedCosts.sort((a, b) => a.value - b.value));
    }, [costs]);

    return { costs: sortedCosts, sum: allCosts };
}

export default useSortByValue;