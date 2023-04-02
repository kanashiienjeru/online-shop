import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../redux/Slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Card = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.products.all.filter((e) => e.id === id)[0]
  );
  const cart = useAppSelector(state => state.products.cartItems)
  return (
    <>
      {product ? (
        <div className={styles.productWrapper}>
          <div className={styles.product}>
            <Link to={`/catalog/${product.id}`}>
              <img src={product.imageUrl} alt="product-image" />
            </Link>
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
              <Link to={`/catalog/${product.id}`}>
                <p className={styles.title}>{product.name}</p>
              </Link>
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
              {cart.find(e => e.id === product.id) ? (
                <button className={styles.alreadyAdd} onClick={() => dispatch(deleteFromCart(product.id))}>
                  Добавлено!
                </button>
              ) : (
                <button className={styles.add}
                onClick={() => {
                  dispatch(addToCart({ ...product, count: 1 }));
                }}
              >
                В корзину
                <img src="/images/icons/product-cart.svg" alt="" />
              </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Card;
