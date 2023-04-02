import styles from "./EditWindow.module.scss";
import React, { useState } from "react";
import { deleteProduct, editProduct, Product } from "../../../redux/Slices/products";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";

const EditWindow = ({ edit, setEdit, types } : {edit: boolean, setEdit: Function, types: string[]}) => {
    const [id, setId] = useState<string>("");
    const products = useAppSelector((state) => state.products.all);
    const [product, setProduct] = useState<Product | null | undefined>();


    const dispatch = useAppDispatch();

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
              <Card id={product.id} />
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
                  <label htmlFor="imageUrl">Аватар: </label>
                  <input
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
                    type="text"
                    id="brand"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="description">Описание: </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="price">Цена (₽): </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                  />
                </div>
                <div className={styles.checkboxContainer}>
                  <label htmlFor="">Тип: </label>
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
                            value={e}
                            defaultChecked={product.type.includes(e)}
                            onChange={(el) =>
                              handleType(el.target.value, el.target.checked)
                            }
                          />
                          <label htmlFor="">{e}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
              <div className={styles.buttons}>
                  <Link to={`/catalog/${product.id}`} onClick={() => document.getElementsByTagName("body")[0].style.overflowY = "auto"}>
                  <button>Перейти к странице товара в каталоге</button>
                  </Link>
                  <button
                    onClick={() =>
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
          ) : product === null ? (
            <p>not found</p>
          ) : null}
          <img onClick={() => closeWindow()} src="/images/x.svg" alt="x" />
        </div>
      </div>
    );
}

export default EditWindow