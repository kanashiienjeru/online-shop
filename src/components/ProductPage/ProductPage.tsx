import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, deleteFromCart } from "../../redux/Slices/products";

const ProductPage = ({ width }: { width: number }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const products = useAppSelector(state => state.products.all);
  const product = products.find((e) => e.id == Number(id));
  const cart = useAppSelector(state => state.products.cartItems);


  const [count, setCount] = useState(1);
  const [isDescOpen, setIsDescOpen] = useState(false)
  const [isSpecOpen, setIsSpecOpen] = useState(false)

  return (
    <div>
      {product && (
        <div className={styles.container}>
          {width > 680 ? (
            <ul className={styles.navigation}>
              <Link to="/" className={styles.navigationItem}>
                Главная
              </Link>
              <Link to="/catalog" className={styles.navigationItem}>
                Каталог
              </Link>
              <Link
                to={`/catalog/${product.id}`}
                className={styles.navigationItem}
              >
                {product.name}
              </Link>
            </ul>
          ) : (
            <Link to="/catalog" className={styles.backButton}>
              <img src="/images/arrows/dark-arrow-left.svg" alt="arrow" />
              <p>Назад</p>
            </Link>
          )}

          <div data-testid="product" className={styles.product}>
            <img src={product.imageUrl} height={470} alt="productImage" />
            <div className={styles.content}>
              <span>В наличии</span>
              <h1>{product.name}</h1>
              {width > 680 && (
                <p>
                  <img
                    src={
                      product.typeOfSize === "Объём"
                        ? "/images/icons/bottle.svg"
                        : product.typeOfSize === "Вес"
                          ? "/images/icons/box.svg"
                          : ""
                    }
                    alt="size"
                  />
                  {product.size}
                  {product.typeOfSize === "Объём"
                    ? " мл"
                    : product.typeOfSize === "Вес"
                      ? " г"
                      : ""}
                </p>
              )}
              {width > 680 ? (
                <>
                  <div className={styles.adding}>
                    <p>{product.price * count} ₽</p>
                    <div className={styles.countBlock}>
                      <button
                        onClick={() =>
                          setCount(() => (count > 1 ? count - 1 : count))
                        }
                        id="minus"
                      >
                        -
                      </button>
                      <p id="count">{count}</p>
                      <button onClick={() => setCount(() => count + 1)} id="plus">
                        +
                      </button>
                    </div>
                    {cart.find((e) => e.id === product.id) ? (
                      <button
                        className={styles.alreadyAdd}
                        onClick={() => dispatch(deleteFromCart(product.id))}
                      >
                        Добавлено!
                      </button>
                    ) : (
                      <button
                        className={styles.add}
                        onClick={() => {
                          dispatch(addToCart({ ...product, count: count }));
                        }}
                        data-testid="addButton"
                      >
                        В корзину
                        <img src="/images/icons/product-cart.svg" alt="cart" />
                      </button>
                    )}
                  </div>
                  <div className={styles.ad}>
                    <button>
                      <img src="/images/icons/share.svg" alt="share" />
                    </button>
                    <button>
                      При покупке от 10 000 ₽ бесплатная доставка по Кокчетаву и
                      области{" "}
                    </button>
                    <button>
                      Прайс-лист
                      <img src="/images/icons/download-black.svg" alt="download" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.adding}>
                    <p>{product.price * count} ₽</p>
                    <div className={styles.countBlock}>
                      <button
                        onClick={() =>
                          setCount(() => (count > 1 ? count - 1 : count))
                        }
                      >
                        -
                      </button>
                      <p>{count}</p>
                      <button onClick={() => setCount(() => count + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.ad}>
                    <div className={styles.adHead}>
                      {cart.find((e) => e.id === product.id) ? (
                        <button
                          className={`${styles.alreadyAdd}`}
                          onClick={() => dispatch(deleteFromCart(product.id))}
                          data-testid="alreadyAddButton"
                        >
                          Добавлено!
                        </button>
                      ) : (
                        <button
                          className={`${styles.add}`}
                          onClick={() => {
                            dispatch(addToCart({ ...product, count: count }));
                          }}
                        >
                          В корзину
                          <img src="/images/icons/product-cart.svg" alt="cart" />
                        </button>
                      )}
                      <button>
                        <img src="/images/icons/share.svg" alt="share" />
                      </button>
                    </div>
                    <button>
                      При покупке от 10 000 ₽ бесплатная доставка по Кокчетаву и
                      области{" "}
                    </button>
                    <button >
                      Прайс-лист
                      <img src="/images/icons/download-black.svg" alt="download" />
                    </button>
                  </div>
                </>
              )}

              <div className={styles.info}>
                <p>
                  Производитель: <span>{product.manufacturer}</span>
                </p>
                <p>
                  Бренд: <span>{product.brand}</span>
                </p>
                <p>
                  Арткул: <span>{product.barcode.toString().slice(0, 6)}</span>
                </p>
                <p>
                  Штрихкод: <span>{product.barcode}</span>
                </p>
              </div>

              <div className={styles.description}>
                {width > 680 ? (
                  <>
                    <h3>Описание</h3>
                    <p>{product.description}</p>
                  </>
                ) : (
                  <>
                    <h3 onClick={() => setIsDescOpen(!isDescOpen)} className={`${isDescOpen ? `${styles.show}` : ''}`}>Описание</h3>
                    {isDescOpen && <p>{product.description}</p>}
                  </>
                )}
              </div>

              {width > 680 ? (
                <div className={styles.specifications}>
                  <h3>Характеристики</h3>
                  <p>
                    Назначение: <span>{product.manufacturer}</span>
                  </p>
                  <p>
                    Тип: <span>{product.type.join(", ")}</span>
                  </p>
                  <p>
                    Производитель: <span>{product.manufacturer}</span>
                  </p>
                  <p>
                    Бренд: <span>{product.brand}</span>
                  </p>
                  <p>
                    Артикул: <span>{product.barcode.toString().slice(0, 6)}</span>
                  </p>
                  <p>
                    Штрихкод: <span>{product.barcode}</span>
                  </p>
                  {product.typeOfSize === "Объём" && (
                    <p>
                      Объём: <span>{product.size} мл</span>
                    </p>
                  )}
                  {product.typeOfSize === "Вес" && (
                    <p>
                      Вес: <span>{product.size} г</span>
                    </p>
                  )}
                  <p>
                    Кол-во в коробке: <span>-</span>
                  </p>
                </div>
              ) : (
                <div className={styles.specifications}>
                  <h3 onClick={() => setIsSpecOpen(!isSpecOpen)} className={`${isSpecOpen ? `${styles.show}` : ''}`}>Характеристики</h3>
                  {isSpecOpen && (
                    <>
                      <p>Назначение: <span>{product.manufacturer}</span></p>
                      <p>Тип: <span>{product.type.join(", ")}</span></p>
                      <p>Производитель: <span>{product.manufacturer}</span></p>
                      <p>Бренд: <span>{product.brand}</span></p>
                      <p>Артикул: <span>{product.barcode.toString().slice(0, 6)}</span></p>
                      <p>Штрихкод: <span>{product.barcode}</span></p>
                      {product.typeOfSize === "Объём" && (
                        <p>Объём: <span>{product.size} мл</span></p>
                      )}
                      {product.typeOfSize === "Вес" && (
                        <p>
                          Вес: <span>{product.size} г</span>
                        </p>
                      )}
                      <p>Кол-во в коробке: <span>-</span></p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
