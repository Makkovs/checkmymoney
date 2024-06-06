import { Pie } from "react-chartjs-2";
import { FC, useEffect, useState } from 'react';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";

import { CategoryType, colorCategories } from '../../../utils/imgCategories';

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
                findend.cost = Math.abs(findend.cost) + Math.abs(cost.cost);
            } else {
                groupedCosts.push({ ...cost });
            }
        });

        setAllCosts(
            Array.from(costs.map((cost: ICost) => cost.cost))
                .reduce((prev: number, next: number) => Math.abs(prev) + Math.abs(next), 0)
        );

        setSortedCosts(groupedCosts.sort((a, b) => a.cost - b.cost));
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
            <Pie
                height={"500px"}
                width={"500px"}
                data={
                    {
                        labels: [...Array.from(sortedCosts.map((cost: ICost) => cost.category))],
                        datasets: [{
                            label: '',
                            data: [...Array.from(sortedCosts.map((cost: ICost) => cost.cost))],
                            backgroundColor: [...Array.from(sortedCosts.map((cost: ICost) => colorCategories[cost.category as CategoryType]))],
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

export default GroupBankDiagram;