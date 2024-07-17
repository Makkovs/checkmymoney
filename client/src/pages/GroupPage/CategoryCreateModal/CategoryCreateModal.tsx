import { FC, useState } from "react";

import { createCategory } from "../../../http/categoryAPI";

import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { CategoryType, imgCategories } from "../../../utils/imgCategories";

import styles from "./category-create-modal.module.scss";

interface CategoryCreateModalProps {
    categoryVisible: boolean;
    setCategoryVisible: (state: boolean) => void;
    costGroupId: number;
}

interface inputError {
    status: boolean;
    message: string;
}

const chechInputValid = (name: string, setInputError: (state: inputError) => void): boolean => {
    if (!name) {
        setInputError({
            status: true,
            message: "Вкажіть назву категорії"
        });
        return false;
    }

    if (name.length > 16){
        setInputError({
            status: true,
            message: "Назва не має містити більше 16 символів"
        });
        return false;
    }

    return true;
}

const setLimitedInput = (value: string, limit: number, setValue: (state: string) => void) => {
    if (value.length <= limit){
        setValue(value);
    }
}

const CategoryCreateModal: FC<CategoryCreateModalProps> = ({ categoryVisible, setCategoryVisible, costGroupId }) => {

    const [name, setName] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<string>(imgCategories.OTHER);
    const [iconsToSelectMenu, setIconsToSelectMenu] = useState<boolean>(false);
    const [inputError, setInputError] = useState<inputError>({ status: false, message: "" });

    const iconsToSelect = Object.values(imgCategories);

    const selectIcon = (icon: string) => {
        setSelectedIcon(icon);
        setIconsToSelectMenu(false);
    }

    const addCategory = async () => {
        setInputError({ status: false, message: "" });

        const valid = chechInputValid(name, setInputError);
        if (!valid){
            return;
        }

        const imgId = Object.keys(imgCategories)
            .find((id: string) => imgCategories[id as CategoryType] === selectedIcon);

        if (imgId) {
            createCategory(name, imgId, costGroupId)
                .then(() => {
                    setCategoryVisible(false);
                    setName("");
                    setSelectedIcon(imgCategories.OTHER);
                });
        } else {
            setInputError({
                status: false,
                message: "Помилка із зображенням. Спробуйте інше"
            });
        }
    }

    return (
        <Modal visible={categoryVisible} setVisible={setCategoryVisible}>
            <h2>Створення категорії</h2>
            <div className={styles.row}>
                <Input
                    placeholder="Назва категорії"
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLimitedInput(e.target.value, 16, setName)}
                    inputError={inputError.status}
                />
            </div>
            <div className={[styles.row, styles.red].join(" ")}>
                {inputError.message}
            </div>
            <div className={styles.row}>
                <img
                    className={styles.selectCategory}
                    src={selectedIcon}
                    alt={selectedIcon}
                    onClick={() => setIconsToSelectMenu(!iconsToSelectMenu)}
                />
                <div className={iconsToSelectMenu
                    ? [styles.iconsList, styles.selectCategoryVisible].join(" ")
                    : styles.iconsList
                }>
                    {iconsToSelect.map((icon: string) =>
                        <img
                            className={styles.iconToSelect}
                            src={icon}
                            alt={icon}
                            onClick={() => selectIcon(icon)}
                        />
                    )}
                </div>
                <Button onClick={addCategory}>
                    Створити
                </Button>
            </div>
        </Modal>
    );
}

export default CategoryCreateModal;