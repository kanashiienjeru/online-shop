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

  const [showError, setShowError] = useState(false)

  return (
    <div className={`${styles.addWindow} ${add ? `${styles.show}` : ""}`}>
      <div className={styles.content}>
        <p>Для добавления товара, заполните следующие поля:</p>
        <div className={styles.form}>
          <div className={styles.formInput}>
            <label htmlFor="name">Название: </label>
            <input
              placeholder="Введите название"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="avatar">Аватар: </label>
            <input
              placeholder="Вставьте ссылку на изображение"
              type="text"
              id="avatar"
              name="avatar"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="typeOfSize">Тип размера: </label>
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
            <label htmlFor="size">Количество: </label>
            <input
              placeholder="Укажите число"
              type="text"
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="barcode">Штрихкод: </label>
            <input
              placeholder="Укажите код в числовом формате"
              type="text"
              id="barcode"
              name="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="manufacturer">Производитель: </label>
            <input
              placeholder="Укажите страну-производителя"
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="brand">Бренд: </label>
            <input
              placeholder="Укажите название бренда"
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="description">Описание: </label>
            <textarea placeholder="Напишите описание, которое будет отображаться на главной странице товара" name="description" rows={7} style={{ resize: 'none'}} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className={styles.formInput}>
            <label htmlFor="price">Цена (₽): </label>
            <input
              placeholder="Укажите цену в числовом формате"
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <label htmlFor="">Тип продукции: </label>
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
                  <label htmlFor={`type-${i}`}>{e}</label>
                </div>
                )
              })}
            </div>
          </div>
          {showError && <p className={styles.error}>Ошибка при редактировании. Каждое из полей должно быть заполнено!</p>}
          <button
            onClick={() => {
              if (name && imageUrl && typeOfSize && +size && +barcode && manufacturer && brand && description && +price && type.length ) {
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
              setShowError(false)
              } else setShowError(true)
            }}
          >
            Добавить
          </button>
        </div>
        <img
          id="closeAddWindow"
          onClick={() => {
            setAdd(false);
            document.getElementsByTagName("body")[0].style.overflowY = "auto";
          }}
          src="/images/x.svg"
          alt="x"
          role="button"
        />
      </div>
    </div>
  );
};

export default AddWindow;
