import styles from "./AddWindow.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addProduct } from "../../../redux/Slices/products";

const AddWindow = ({ add, setAdd, types }: { add: boolean; setAdd: Function, types: string[] }) => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.products.all)

  const closeWindow = () => {
    setAdd(false)
    setName('')
    setImageUrl('')
    setTypeOfSize('')
    setSize('')
    setBarcode('')
    setManufacturer('')
    setBrand('')
    setDescription('')
    setPrice('')
    setType([''])
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }


  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [typeOfSize, setTypeOfSize] = useState("");
  const [size, setSize] = useState('');
  const [barcode, setBarcode] = useState('');
  const [manufacturer, setManufacturer] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('');
  const [type, setType] = useState(['']);

  return (
    <div className={`${styles.addWindow} ${add ? `${styles.show}` : ""}`}>
      <div className={styles.content}>
        <p>Для добавления товара, заполните следующие поля:</p>
        <div>
          <div className={styles.formInput}>
            <label htmlFor="name">Название: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Аватар: </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Тип размера: </label>
            <select
              name="typeOfSize"
              id="typeOfSize"
              onChange={(e) => setTypeOfSize(e.target.value)}
              defaultValue=""
            >
              <option value="">
                {""}
              </option>
              <option value="Объём">Объём</option>
              <option value="Вес">Вес</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Количество: </label>
            <input
              type="text"
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Штрихкод: </label>
            <input
              type="text"
              id="barcode"
              name="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Производитель: </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Бренд: </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Описание: </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="name">Цена (₽): </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <label htmlFor="name">Тип: </label>
            <div className={styles.checkboxList}>
              {types.map((e,i) => {
                const handleType = (val: string, isChecked: boolean) => isChecked ? setType([...type, val].filter(e => e !== '')) : setType(type.filter(e => e !== val))
                return(
                  <div key={e} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id={`type-${i}`}
                    value={e}
                    onChange={el => handleType(el.target.value, el.target.checked)}
                  />
                  <label htmlFor="">{e}</label>
                </div>
                )
              })}
            </div>
          </div>
          <button
            onClick={() => {
              closeWindow();
              dispatch(
                addProduct({
                  id: products.length + 1,
                  name,
                  imageUrl,
                  typeOfSize,
                  size: +size,
                  barcode: +barcode,
                  manufacturer,
                  brand,
                  description,
                  price: +price,
                  type,
                })
              );
            }}
          >
            Добавить
          </button>
        </div>
        <img
          onClick={() => {
            setAdd(false);
            document.getElementsByTagName("body")[0].style.overflowY = "auto";
          }}
          src="/images/x.svg"
          alt="x"
        />
      </div>
    </div>
  );
};

export default AddWindow;
