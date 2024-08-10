import { useEffect, useState } from "react";
import { fetchAllCosts } from "../http/costAPI";
import { fetchOneCategory } from "../http/categoryAPI";
import { ICost } from "../types/cost";


function useGetCosts(id: number, setLoading: (state: boolean) => void): { costs: ICost[], getCosts: (date: Date[] | null) => void, setCosts: (state: ICost[]) => void } {

    const [costs, setCosts] = useState<ICost[]>([]);

    const getCosts = async (date: Date[] | null) => {
        try {
            setLoading(true);
            
            const data = await fetchAllCosts(null, null, id, null, date);
            const sortedCosts: ICost[] = data.costs.rows.sort((a: ICost, b: ICost) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            const updatedCosts = await Promise.all(sortedCosts.map(async (cost: ICost) => {
                const categoryData = await fetchOneCategory(cost.categoryId);
                return {
                    ...cost,
                    category: categoryData
                }
            }));
            console.log("settted")
            setCosts(updatedCosts);
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCosts(null);
    }, []);

    return { costs, getCosts, setCosts };
}

export default useGetCosts;