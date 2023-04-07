import styles from './Cart.module.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useState } from 'react'
import CartItem from './CartItem'
import { clearCart } from '../../redux/Slices/products'


const Cart = ({ width }: { width: number }) => {
  const dispatch = useAppDispatch()

  const products = useAppSelector(state => state.products.cartItems)

  let sum = 0

  const [isWindowOpen, setIsWindowOpen] = useState(false)

  for (let item of products) {
    sum += item.count ? item.price * item.count : item.price
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        {width > 680 ? (
          <ul className={styles.navigation}>
            <li className={styles.navigationItem}>Главная</li>
            <li className={styles.navigationItem}>Каталог</li>
          </ul>
        ) : (
          <Link to="/" className={styles.backButton}>
            <img src="/images/arrows/dark-arrow-left.svg" alt="arrow" />
            <p>Назад</p>
          </Link>
        )}
        <h1>Корзина</h1>
        {products.length > 0
          ? (
            <>
              <div className={styles.cartList}>
                {products.map(e => <CartItem key={e.name} product={e} />)}
              </div>
              <div className={styles.order}>
                <button onClick={() => {
                  setIsWindowOpen(true)
                  document.getElementsByTagName('body')[0].style.overflow = 'hidden'
                }}>Оформить заказ</button>
                <p>{sum} ₽</p>
              </div>
            </>
          ) : (
            <>
              <p className={styles.emptyCart}>На данный момент в корзине нет товаров :(</p>
            </>
          )}

        <div className={`${styles.overlay} ${isWindowOpen ? styles.show : null}`}>
          <div className={styles.window}>
            <div className={styles.content}>
              <img src="/images/icons/success-icon.svg" alt="success" />
              <h1>Спасибо за заказ</h1>
              <p>Наш менеджер свяжется с вами в ближайшее время</p>
              <img onClick={() => {
                setIsWindowOpen(false)
                document.getElementsByTagName('body')[0].style.overflowY = 'auto'
                window.scrollTo(0, 0)
                dispatch(clearCart())
              }} src="/images/x.svg" alt="x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart