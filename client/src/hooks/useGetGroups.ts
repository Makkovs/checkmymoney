import { useEffect, useState } from "react";
import { fetchAllGroups } from "../http/costGroupAPI";
import { fetchOneUser } from "../http/userAPI";
import { fetchAllCosts } from "../http/costAPI";

import { ICost } from "../types/cost";
import { IGroup } from "../types/group";

function useGetGroups(setLoading: (state: boolean) => void): { groups: IGroup[], getGroups: () => void } {
    const [groups, setGroups] = useState<IGroup[]>([]);

    const getGroups = async () => {
        setLoading(true);

        try {
            const data = await fetchAllGroups();
            const costGroups: IGroup[] = data.costGroups;

            const updatedGroups = await Promise.all(costGroups.map(async (costGroup: IGroup) => {
                const userData = await fetchOneUser(costGroup.ownerId);
                const costData = await fetchAllCosts(null, null, costGroup.id, null, null);

                const costs: number[] = Array.from(costData.costs.rows.map((cost: ICost) => cost.value));
                const allCosts: number = costs.reduce((a: number, c: number) => a + c, 0);

                return {
                    ...costGroup,
                    ownerName: userData.user.name,
                    cost: allCosts
                }
            }));

            setGroups(updatedGroups);
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getGroups();
    }, []);

    return { groups, getGroups };
}

export default useGetGroups;