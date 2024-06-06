import { FC } from "react";

import styles from "./loading.module.scss";

interface LoadingProps {
    loading: boolean;
    style?: React.CSSProperties;
};

const Loading: FC<LoadingProps> = ({ loading, style }) => {

    if (loading) {
        return (
            <div className={styles.loading__animation} style={style}></div>
        );
    };
};

export default Loading;