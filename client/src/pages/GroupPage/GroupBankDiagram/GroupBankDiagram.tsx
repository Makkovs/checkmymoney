import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";


import useSortByValue from "../../../hooks/useSortByValues";
import { ICost } from "../../../types/cost";
import { CategoryType, colorCategories } from '../../../utils/imgCategories';

import styles from "./group-bank-diagram.module.scss";

interface GroupBankDiagramProps {
    costs: ICost[];
}

const GroupBankDiagram: FC<GroupBankDiagramProps> = ({ costs }) => {

    Chart.register(ArcElement, Legend, Tooltip, ChartDataLabels);

    const allCosts = useSortByValue(costs);

    const labelsFormatter = (context: any, args: Context): string => {
        if (Math.abs(context) / Math.abs(allCosts.sum) < 0.10) {
            return "";
        }

        const index = args.dataIndex;
        const labels = args.chart.data.labels;
        return `${labels ? labels[index] : ""}:\n${context}`;
    }

    return (
        <section className={styles.diagram_wrapper}>
            {allCosts.costs.length > 0

                ?
                <Pie
                    height={"500px"}
                    width={"500px"}
                    data={
                        {
                            labels: [...Array.from(allCosts.costs.map((cost: ICost) => cost.category?.name))],
                            datasets: [{
                                label: '',
                                data: [...Array.from(allCosts.costs.map((cost: ICost) => cost.value))],
                                backgroundColor: [...Array.from(allCosts.costs.map((cost: ICost) => colorCategories[cost.category?.imgId as CategoryType]))],
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