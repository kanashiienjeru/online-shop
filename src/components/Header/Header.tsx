import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export const navigationItems: {id: number, content: string}[] = [
  {
    id: 1,
    content: 'О компании'
  },
  {
    id: 2,
    content: 'Доставка и оплата'
  },
  {
    id: 3,
    content: 'Возврат'
  },
  {
    id: 4,
    content: 'Контакты'
  }
] 
const Header = () => {

  const cartSize = useAppSelector(state => state.products.cartItems.length);

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
            {navigationItems.map(navItem => (
              <li key={navItem.id} className={styles.navItem}>
                <a href="/">{navItem.content}</a>
              </li>)
            )}
          </ul>
        </nav>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <Link to="/" id="logoLink">
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
            <div className={styles.supportAvatar}>
              <img src="/images/support.png" alt="support" />
              <img src="/images/online-status.svg" alt="status" />
            </div>
          </div>
          <button className={styles.priceListButton}>
            Прайс-лист
            <img src="/images/icons/download.svg" alt="download" />
          </button>
          <Link to="/cart" id="cartLink">
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
