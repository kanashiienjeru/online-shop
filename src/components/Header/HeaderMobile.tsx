import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import styles from "./HeaderMobile.module.scss";

const HeaderMobile = () => {
  const cartSize = useAppSelector((state) => state.products.cartItems.length);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const closeBurger = () => {
    setBurgerOpen(false)
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
  }
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.burgerBlock}>
          {burgerOpen ? (
            <img onClick={() => closeBurger()} className={styles.burger} src="/images/white-x.svg" alt="x" />
          ) : (
            <img onClick={() => {
              setBurgerOpen(true)
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
            }} className={styles.burger} src="/images/burger.svg" alt="menu" />
          )}
          <div className={`${styles.burgerOverlay} ${burgerOpen ? `${styles.show}` : ''}`}>
            <div className={styles.burgerWindow}>
              <div className={styles.communication}>
                <div>
                  <img src="/images/icons/mark.svg" alt="mark" />
                  <div className={styles.text}>
                    <p>г. Кокчетав, ул. Ж. Ташенова 129Б </p>
                    <span>(Рынок Восточный)</span>
                  </div>
                </div>
                <div>
                  <img src="/images/icons/envelope.svg" alt="envelope" />
                  <div className={styles.text}>
                    <p>opt.sultan@mail.ru</p>
                    <span>На связи в любое время</span>
                  </div>
                </div>
                <div>
                  <img src="/images/icons/phone.svg" alt="phone" />
                  <div className={styles.text}>
                    <p>Отдел продаж</p>
                    <span>+7 (777) 490-00-91</span>
                    <span className={styles.workTime}>
                      время работы: 9:00-20:00
                    </span>
                  </div>
                </div>
                <div className={styles.makeCall}>
                  <img src="/images/icons/white-phone.svg" alt="phone" />
                  <p>Заказать звонок</p>
                </div>
              </div>
              <div className={styles.menu}>
                <h1>Меню сайта:</h1>
                <p>О компании</p>
                <p>Доставка и оплата</p>
                <p>Возврат</p>
                <p>Контакты</p>
                <button>
                  Прайс-лист
                  <img src="/images/icons/download.svg" alt="download" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Link to="/" onClick={() => closeBurger()}>
          <img className={styles.logo} src="/images/logo/darkLogo.svg" alt="logo" />
        </Link>
        <div className={styles.cartImg}>
          <Link to="/cart" onClick={() => closeBurger()}>
          <img src="/images/icons/cart.svg" alt="cart" />
          {cartSize > 0 ? <p>{cartSize}</p> : null}
          </Link>
        </div>
      </div>
      <div className={styles.buttons}>
          <div>
          <Link to="/catalog" onClick={() => closeBurger()}>
            <img src="/images/icons/dark-squares.svg" alt="squares" />
            <p>Каталог</p>
          </Link>
          </div>
        <div>
          <img src="/images/icons/lupa.svg" alt="lupa" />
          <p>Поиск</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
