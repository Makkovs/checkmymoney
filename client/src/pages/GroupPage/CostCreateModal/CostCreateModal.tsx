import React, { FC, useEffect, useRef, useState } from "react";

import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

import { fetchCategories } from "../../../http/categoryAPI";
import { createCost } from "../../../http/costAPI";

import { ICategory } from "../../../types/category";
import { CostTypes } from "../../../types/cost";

import styles from "./cost-create-modal.module.scss";

interface CostCreateModalProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
    costGroupId: number;
    getCosts: () => void;
}

const CostCreateModal: FC<CostCreateModalProps> = ({ visible, setVisible, costGroupId, getCosts }) => {

    const [value, setValue] = useState<string>("");
    const [valueError, setValueError] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement | null>(null);

    const [categories, setCategories] = useState<ICategory[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetchCategories(costGroupId).then((data) => {
            setCategories(data);
        }).finally(() => setLoading(false));
    }, []);

    const addCost = () => {
        if (selectRef.current) {
            if (!value) {
                setValueError(true);
                return;
            }

            setVisible(false);
            const type = Number(value) < 0 ? CostTypes.SPENDING : CostTypes.INCOMING;
            createCost(Number(value), Number(selectRef.current.value), type, costGroupId)
                .then(() => getCosts());
        }
    }

    if (!loading) {
        return (
            <Modal visible={visible} setVisible={setVisible}>
                <h2>Додати запис</h2>
                <div className={styles.row}>
                    <Input
                        placeholder="Готівка"
                        type="number"
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                        style={valueError ? { borderColor: "red" } : {}}
                    />
                </div>
                <div className={styles.row}>
                    <select
                        className={styles.select}
                        name="category"
                        defaultValue={"default"}
                        ref={selectRef}
                    >
                        <option value={"default"} disabled>
                            Категорія
                        </option>
                        {categories.map((category: ICategory) =>
                            <option value={category.id} key={`category-select#${category.id}`}>
                                {category.name}
                            </option>
                        )}
                    </select>
                    <Button onClick={() => addCost()}>Додати</Button>
                </div>
            </Modal>
        );
    }
}

export default CostCreateModal;