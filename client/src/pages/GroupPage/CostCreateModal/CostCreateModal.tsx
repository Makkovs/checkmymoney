import React, { FC, useEffect, useRef, useState } from "react";

import CategoryCreateModal from "../CategoryCreateModal/CategoryCreateModal";

import { fetchCategories } from "../../../http/categoryAPI";
import { createCost } from "../../../http/costAPI";

import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

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

    const [categoryVisible, setCategoryVisible] = useState<boolean>(false)

    useEffect(() => {
        if (visible) {
            setLoading(true);
            fetchCategories(costGroupId).then((data) => {
                setCategories(data);
            }).finally(() => setLoading(false));
        }
    }, [visible]);

    const addCost = () => {
        if (selectRef.current) {
            if (!value) {
                setValueError(true);
                return;
            }

            setVisible(false);
            const type = Number(value) < 0 ? CostTypes.SPENDING : CostTypes.INCOMING;
            createCost(Number(value), Number(selectRef.current.value), type, costGroupId)
                .then(() => {
                    getCosts()
                    setValue("");
                });
        }
    }

    const checkIsAddCategory = () => {
        if (selectRef.current) {
            if (selectRef.current.value === "add-category") {
                selectRef.current.value = "default";
                setVisible(false);
                setCategoryVisible(true);
            }
        }
    }

    if (!loading) {
        return (
            <>
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
                            onChange={checkIsAddCategory}
                        >
                            <option value={"default"} disabled>
                                Категорія
                            </option>
                            {categories.map((category: ICategory) =>
                                <option value={category.id} key={`category-select#${category.id}`}>
                                    {category.name}
                                </option>
                            )}
                            <option value={"add-category"}>
                                Додати категорію
                            </option>
                        </select>
                        <Button
                            onClick={() => addCost()}
                            style={{ "marginTop": "15px" }}
                        >
                            Додати
                        </Button>
                    </div>
                </Modal>
                <CategoryCreateModal
                    categoryVisible={categoryVisible}
                    setCategoryVisible={setCategoryVisible}
                    costGroupId={costGroupId}
                />
            </>
        );
    }
}

export default CostCreateModal;