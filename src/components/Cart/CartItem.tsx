import { changeCount, deleteFromCart, Product } from "../../redux/Slices/products"
import styles from './Cart.module.scss'
import { useAppDispatch } from "../../redux/hooks"
import { Link } from "react-router-dom"


const CartItem = ({ product } : { product: Product}) => {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.cartItem}>
            <div className={styles.productInfo}>
                <div className={styles.productImg}>
                    <img src={product.imageUrl} alt="image" />
                </div>
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
                    <h2>{product.name.length > 60 ? product.name.slice(0,40) + '…' : product.name}</h2>
                </Link>
                <p>{product.description.slice(0,250) + '…'}</p>
                </div>
            </div>
            <div className={styles.controlBlock}>
                <div className={styles.countBlock}>
                  <button onClick={() => (product.count && product.count > 1) && dispatch(changeCount({ id: product.id, value: product.count - 1}))}>-</button>
                  <p>{product.count}</p>
                  <button onClick={() => dispatch(changeCount({ id: product.id, value: product.count && product.count + 1}))}>+</button>
                </div>
                <p>{product.count && product.price * product.count} ₽</p>
                <button onClick={() => dispatch(deleteFromCart(product.id))}>
                    <img width={22} src="/images/icons/delete.svg" alt="delete" />
                </button>
              </div>
        </div>
    )
}

export default CartItem