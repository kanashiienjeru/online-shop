import styles from "./EditWindow.module.scss";
import React, { useState } from "react";
import { deleteProduct, editProduct, Product } from "../../../redux/Slices/products";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";

const EditWindow = ({ edit, setEdit, types }: { edit: boolean, setEdit: Function, types: string[] }) => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string>("");
  const products = useAppSelector((state) => state.products.all);
  const [product, setProduct] = useState<Product | null | undefined>();

  const closeWindow = () => {
    setEdit(false)
    setProduct(undefined)
    setId('')
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [typeOfSize, setTypeOfSize] = useState("");
  const [size, setSize] = useState(0);
  const [barcode, setBarcode] = useState(0);
  const [manufacturer, setManufacturer] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState([""]);

  const [showError, setShowError] = useState(false)

  return (
    <div className={`${styles.editWindow} ${edit ? `${styles.show}` : ""}`}>
      <div className={styles.content}>
        <div className={styles.input}>
          <input
            type="text"
            id="productId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Укажите ID продукта."
          />
          <img
            className="searchByIdButton"
            onClick={() => {
              const newProduct = products.find((e) => e.id === +id);
              if (newProduct) {
                setProduct(newProduct);
                setName(newProduct.name);
                setImageUrl(newProduct.imageUrl);
                setTypeOfSize(newProduct.typeOfSize);
                setSize(newProduct.size);
                setBarcode(newProduct.barcode);
                setManufacturer(newProduct.manufacturer);
                setBrand(newProduct.brand);
                setDescription(newProduct.description);
                setPrice(newProduct.price);
                setType(newProduct.type);
              } else setProduct(null);
            }}
            src="/images/icons/search.svg"
            alt="search"
          />
        </div>
        {product ? (
          <>
            <div className={styles.editForm}>
              <div className={styles.preview}>
                <p>Предпросмотр карточки товара:</p>
                <Card id={product.id} onlyWatch={true} />
              </div>
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
                  <label htmlFor="imageUrl">Аватар: </label>
                  <input
                    placeholder="Вставьте ссылку на изображение"
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
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
                    defaultValue={typeOfSize === 'Объём' ? 'Объём' : 'Вес'}
                  >
                    <option value="Объём">
                      Объём
                    </option>
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
                    onChange={(e) => setSize(+e.target.value)}
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
                    onChange={(e) => setBarcode(+e.target.value)}
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
                  <textarea style={{ resize: 'none' }} rows={7} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="price">Цена (₽): </label>
                  <input
                    placeholder="Укажите цену в числовом формате"
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                  />
                </div>
                <div className={styles.checkboxContainer}>
                  <label htmlFor="">Тип продукции: </label>
                  <div className={styles.checkboxList}>
                    {types.map((e, i) => {
                      const handleType = (val: string, isChecked: boolean) =>
                        isChecked
                          ? setType([...type, val].filter((e) => e !== ""))
                          : setType(type.filter((e) => e !== val))
                      return (
                        <div key={e} className={styles.checkboxItem}>
                          <input
                            type="checkbox"
                            id={`type-${i}`}
                            name={e}
                            value={e}
                            defaultChecked={product.type.includes(e)}
                            onChange={(el) =>
                              handleType(el.target.value, el.target.checked)
                            }
                          />
                          <label htmlFor={`type-${i}`}>{e}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {showError && <p className={styles.error}>Ошибка при редактировании. Каждое из полей должно быть заполнено!</p>}
            <div className={styles.buttons}>
              <Link to={`/catalog/${product.id}`} onClick={() => document.getElementsByTagName("body")[0].style.overflowY = "auto"}>
                <button>Перейти к странице товара в каталоге</button>
              </Link>
              <button
                onClick={() => {
                  if (name && imageUrl && typeOfSize && size && barcode && manufacturer && brand && description && price && type.length) {
                    dispatch(
                      editProduct({
                        id: product.id,
                        name,
                        imageUrl,
                        typeOfSize,
                        size,
                        barcode,
                        manufacturer,
                        brand,
                        description,
                        price,
                        type,
                      })
                    )
                    setShowError(false)
                  } else setShowError(true)

                }
                }
              >
                Изменить
              </button>
              <button
                onClick={async () => {
                  dispatch(deleteProduct(product.id));
                  closeWindow();
                }}
              >
                Удалить
              </button>
            </div>
          </>
        ) : product === null && (
          <p>not found</p>
        )}
        <img onClick={() => closeWindow()} src="/images/x.svg" alt="x" id="closeEditWindow" />
      </div>
    </div>
  );
}

export default EditWindow