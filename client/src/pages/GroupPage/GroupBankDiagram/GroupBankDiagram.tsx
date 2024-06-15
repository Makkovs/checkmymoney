import { Pie } from "react-chartjs-2";
import { FC, useEffect, useState } from 'react';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";

import { CategoryType, colorCategories } from '../../../utils/imgCategories';

import { ICost } from "../../../types/cost";

import styles from "./group-bank-diagram.module.scss";

interface GroupBankDiagramProps {
    costs: ICost[];
}

const GroupBankDiagram: FC<GroupBankDiagramProps> = ({ costs }) => {

    Chart.register(ArcElement, Legend, Tooltip, ChartDataLabels);

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

    const labelsFormatter = (context: any, args: Context): string => {
        if (context / allCosts < 0.10) {
            return "";
        }

        const index = args.dataIndex;
        const labels = args.chart.data.labels;
        return `${labels ? labels[index] : ""}:\n${context}`;
    }

    return (
        <section>
            {sortedCosts.length > 0

                ?
                <Pie
                    height={"500px"}
                    width={"500px"}
                    data={
                        {
                            labels: [...Array.from(sortedCosts.map((cost: ICost) => cost.category?.name))],
                            datasets: [{
                                label: '',
                                data: [...Array.from(sortedCosts.map((cost: ICost) => cost.value))],
                                backgroundColor: [...Array.from(sortedCosts.map((cost: ICost) => colorCategories[cost.category?.imgId as CategoryType]))],
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
                :
                <div className={styles.diagram_circle}>
                    <div className={styles.diagram_text}>У вас немає жодних записів</div>
                </div>
            }

        </section>
    );
}

export default GroupBankDiagram;