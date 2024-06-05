import { FC, useEffect, useState } from "react";
import { fetchOneGroup } from "../../http/costGroupAPI";
import { IGroup } from "../../types/group";
import { useParams } from "react-router-dom";

const GroupPage: FC = () => {

    const { id } = useParams();
    const [group, setGroup] = useState<IGroup>();

    useEffect(() => {
        fetchOneGroup(Number(id)).then((data) => setGroup(data.costGroup))
    }, [])

    return (
        <>
            {JSON.stringify(group)}
        </>
    );
}

export default GroupPage;