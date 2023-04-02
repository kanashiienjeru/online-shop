import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Header = () => {
  const cartSize = useAppSelector((state) => state.products.cartItems.length);

  return (
    <>
      <div className={styles.container}>
        <nav>
          <div className={styles.communication}>
            <div className={styles.adress}>
              <img src="/images/icons/mark.svg" alt="mark" />
              <div className={styles.textContent}>
                <p>г. Кокчетав, ул. Ж. Ташенова 129Б</p>
                <span>(Рынок Восточный)</span>
              </div>
            </div>
            <div className={styles.mail}>
              <img src="/images/icons/envelope.svg" alt="envelope" />
              <div className={styles.textContent}>
                <p>opt.sultan@mail.ru</p>
                <span>На связи в любое время</span>
              </div>
            </div>
          </div>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/">О компании</a>
            </li>
            <li className={styles.navItem}>
              <a href="/">Доставка и оплата</a>
            </li>
            <li className={styles.navItem}>
              <a href="/">Возврат</a>
            </li>
            <li className={styles.navItem}>
              <a href="/">Контакты</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <Link to="/">
            <img className={styles.logo} src="/images/logo/darkLogo.svg" alt="logo" />
          </Link>
          <Link to="/catalog">
            <button className={styles.catalogButton}>
              Каталог
              <img src="/images/icons/squares.svg" alt="squares" />
            </button>
          </Link>
          <div className={styles.search}>
            <input placeholder="Поиск..." type="text" />
            <img src="/images/icons/search.svg" alt="search" />
          </div>
          <div className={styles.support}>
            <div className={styles.textContent}>
              <p>+7 (777) 490-00-91</p>
              <span>время работы: 9:00-20:00</span>
              <a href="/">Заказать звонок</a>
            </div>
            <div className={styles.avatar}>
              <img src="/images/support.png" alt="support" />
              <img src="/images/online-status.svg" alt="status" />
            </div>
          </div>
          <button className={styles.priceListButton}>
            Прайс-лист
            <img src="/images/icons/download.svg" alt="download" />
          </button>
          <Link to="/cart">
            <div className={styles.cart}>
              <div className={styles.cartImg}>
                <img src="/images/icons/cart.svg" alt="cart" />
                {cartSize > 0 ? <p>{cartSize}</p> : null}
              </div>
              <div className={styles.textContent}>
                <p>Корзина</p>
                <span>12 478 ₸</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
