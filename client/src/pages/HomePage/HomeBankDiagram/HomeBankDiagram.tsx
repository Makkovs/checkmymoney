import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { FC, useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";

import styles from "./home-bank-diagram.module.scss";

interface HomeBankDiagramProps {
    costs: ICost[]
}

const HomeBankDiagram: FC<HomeBankDiagramProps> = ({ costs }) => {

    Chart.register(ArcElement, Legend, Tooltip, ChartDataLabels);

    const [allCosts, setAllCosts] = useState<number>(0);
    const [sortedCosts, setSortedCosts] = useState<ICost[]>([]);

    useEffect(() => {
        setAllCosts(
            Array.from(costs.map((cost: ICost) => cost.cost))
                .reduce((prev: number, next: number) => prev + next, 0)
        );
        setSortedCosts(costs.sort((a, b) => a.cost - b.cost));
    }, [costs]);

    const labelsFormatter = (context: any, args: Context): string => {
        if (context / allCosts < 0.10) {
            return "";
        }

        const index = args.dataIndex;
        const labels = args.chart.data.labels;
        return `${labels ? labels[index] : ""}:\n${context}`;
    }

    return (
        <section className={styles.bank__diagram}>
            <Pie
                height={"500px"}
                width={"500px"}
                data={
                    {
                        labels: [...Array.from(sortedCosts.map((cost: ICost) => cost.name))],
                        datasets: [{
                            label: '',
                            data: [...Array.from(sortedCosts.map((cost: ICost) => cost.cost))],
                            backgroundColor: [...Array.from(sortedCosts.map((cost: ICost) => cost.color))],
                            hoverOffset: 4,
                            borderWidth: 0,
                        }]

                    }
                }
                options={
                    {
                        plugins: {
                            legend: {
                                display: false
                            },
                            datalabels: {
                                formatter: labelsFormatter,
                                color: "white",
                                textAlign: "center",
                                font: {
                                    size: 15,
                                }
                            }
                        },
                        devicePixelRatio: 2,
                        maintainAspectRatio: false,
                    }
                }
            />
        </section>
    );
}
export default HomeBankDiagram;