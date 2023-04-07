import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../redux/Slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


const Card = ({ id, onlyWatch }: { id: number, onlyWatch?: boolean }) => {
  const dispatch = useAppDispatch();

  const product = useAppSelector(state => state.products.all.filter((e) => e.id === id)[0]);
  const cart = useAppSelector(state => state.products.cartItems)

  return (
    <>
      {product && (
        <div className={styles.productWrapper}>
          <div data-testid="product" className={styles.product}>
            {onlyWatch ? (<img src={product.imageUrl} alt="product" className={styles.productImg} />) : <Link to={`/catalog/${product.id}`}>
              <img src={product.imageUrl} className={styles.productImg} alt="product" />
            </Link>}
            <div className={styles.textContent}>
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
              {onlyWatch ? (<p className={styles.title}>{product.name}</p>) : (
                <Link to={`/catalog/${product.id}`}>
                <p className={styles.title}>{product.name}</p>
              </Link>
              )}
              <p>
                <span>Штрихкод:</span> {product.barcode}
              </p>
              <p>
                <span>Производитель:</span> {product.manufacturer}
              </p>
              <p>
                <span>Бренд:</span> {product.brand}
              </p>
            </div>
            <div className={styles.footer}>
              <p>{product.price} ₽</p>
              {onlyWatch ? (<button className={styles.add}>В корзину <img src="/images/icons/product-cart.svg" alt="" /></button>) : (
                cart.find(e => e.id === product.id) ? (
                  <button id="alreadyAddButton" className={styles.alreadyAdd} onClick={() => dispatch(deleteFromCart(product.id))} role="button">
                    Добавлено!
                  </button>
                ) : (
                  <button className={styles.add}
                  onClick={() => {
                    dispatch(addToCart({ ...product, count: 1 }));
                  }}
                  role="button"
                  id="addButton"
                >
                  В корзину
                  <img src="/images/icons/product-cart.svg" alt="" />
                </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
