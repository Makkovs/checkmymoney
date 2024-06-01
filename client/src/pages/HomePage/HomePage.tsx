import { FC, useEffect, useState } from 'react';
import HomeAside from './HomeAside/HomeAside';
import HomeBankDiagram from "./HomeBankDiagram/HomeBankDiagram";
import HomeBankInfo from './HomeBankInfo/HomeBankInfo';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';

import { AUTH_ROUTE } from '../../utils/paths';

import styles from "./home.module.scss";

enum CostTypes {
    SPENDING = "SPENDING",
    INCOMING = "INCOMING"
}

const HomePage: FC = () => {

    const navigate = useNavigate();

    const isAuth: boolean = useTypedSelector(state => state.userReducer.isAuth);
    const [costType, setCostType] = useState<CostTypes | string>(CostTypes.SPENDING);

    const spendings: ICost[] = [
        {
            name: "Їжа",
            icon: "https://cdn-icons-png.flaticon.com/512/8280/8280802.png",
            cost: -3430,
            color: 'rgb(229,99,83)'
        },
        {
            name: "Житло",
            icon: "https://cdn-icons-png.flaticon.com/512/9534/9534217.png",
            cost: -12000,
            color: 'rgb(47,128,237)'
        },
        {
            name: "Транспорт",
            icon: "https://cdn-icons-png.flaticon.com/512/5013/5013582.png",
            cost: -1000,
            color: 'rgb(247,187,56)'
        },
        {
            name: "Медицина",
            icon: "https://cdn-icons-png.flaticon.com/512/9332/9332769.png",
            cost: -500,
            color: 'rgb(254,224,18)'
        },
        {
            name: "Розваги",
            icon: "https://cdn-icons-png.flaticon.com/512/4315/4315512.png",
            cost: -300,
            color: 'rgb(33,150,243)'
        },
        {
            name: "Одяг",
            icon: "https://cdn-icons-png.flaticon.com/512/6572/6572826.png",
            cost: -1500,
            color: 'rgb(2,145,247)'
        },
        {
            name: "Подорожі",
            icon: "https://cdn-icons-png.flaticon.com/512/8285/8285619.png",
            cost: -2000,
            color: 'rgb(68,196,161)'
        },
        {
            name: "Комунальні послуги",
            icon: "https://cdn-icons-png.flaticon.com/512/5724/5724367.png",
            cost: -8000,
            color: 'rgb(255,205,0)'
        },
        {
            name: "Виплати боргів",
            icon: "https://cdn-icons-png.flaticon.com/512/9331/9331677.png",
            cost: -3500,
            color: 'rgb(0,0,0)'
        },
        {
            name: "Побутова техніка",
            icon: "https://cdn-icons-png.flaticon.com/512/7570/7570964.png",
            cost: -1000,
            color: 'rgb(172,38,20)'
        },
        {
            name: "Інше",
            icon: "https://cdn-icons-png.flaticon.com/512/455/455801.png",
            cost: -500,
            color: 'rgb(149,165,165)'
        }
    ];

    const incomings: ICost[] = [
        {
            name: "Зарплатня",
            icon: "https://cdn-icons-png.flaticon.com/512/9242/9242802.png",
            cost: 34300,
            color: 'rgb(140,76,209)'
        },
        {
            name: "Оренда",
            icon: "https://cdn-icons-png.flaticon.com/512/4763/4763161.png",
            cost: 12000,
            color: 'rgb(101,177,252)'
        },
        {
            name: "Премії",
            icon: "https://cdn-icons-png.flaticon.com/512/12741/12741685.png",
            cost: 1000,
            color: 'rgb(250,169,64)'
        },
        {
            name: "Продаж майна",
            icon: "https://cdn-icons-png.flaticon.com/512/8320/8320156.png",
            cost: 5000,
            color: 'rgb(45,137,189)'
        },
        {
            name: "Інше",
            icon: "https://cdn-icons-png.flaticon.com/512/455/455801.png",
            cost: 300,
            color: 'rgb(149,165,165)'
        }
    ];

    useEffect(() => {
        if (!isAuth) {
            navigate(AUTH_ROUTE);
        }
    }, [isAuth]);

    return (
        <main className={styles.content}>
            <HomeAside />
            <article className={styles.bank}>
                <HomeBankDiagram costs={costType === CostTypes.SPENDING ? spendings : incomings} />
                <section>
                    <span onClick={() => setCostType(CostTypes.SPENDING)}>
                        <input
                            className={styles.cost_type_radio}
                            type="radio"
                            name="cost"
                            value={CostTypes.SPENDING}
                            checked={costType === CostTypes.SPENDING}
                            onChange={(e) => setCostType(e.target.value)}
                        /> Витрати
                    </span>
                    <span onClick={() => setCostType(CostTypes.INCOMING)}>
                        <input
                            className={styles.cost_type_radio}
                            type="radio"
                            name="cost"
                            value={CostTypes.INCOMING}
                            checked={costType === CostTypes.INCOMING}
                            onChange={(e) => setCostType(e.target.value)}
                        />
                        Доходи
                    </span>
                </section>
                <HomeBankInfo spendings={spendings} incomings={incomings} />
            </article>
        </main>
    );
}

export default HomePage;