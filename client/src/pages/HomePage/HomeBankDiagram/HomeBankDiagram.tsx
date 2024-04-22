import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

import styles from "./home-bank-diagram.module.scss";

const HomeBankDiagram = () => {

    Chart.register(ArcElement, Legend, Tooltip, ChartDataLabels);

    return (
        <section className={styles.bank__diagram}>
            <Pie
                height={"500px"}
                width={"500px"}
                data={
                    {
                        labels: [
                            'Їжа',
                            'Житло',
                            'Транспорт'
                        ],
                        datasets: [{
                            label: '',
                            data: [200, 50, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
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
                                formatter: ((context, args) => {
                                    const index = args.dataIndex;
                                    const labels = args.chart.data.labels
                                    return `${labels ? labels[index] : ""}: ${context}`
                                }),
                                color: "black",
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