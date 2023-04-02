import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.aboutUs}>
          <img src="/images/logo/whiteLogo.svg" alt="logo" />
          <p>
            Компания «Султан» — снабжаем розничные магазины товарами "под ключ"
            в Кокчетаве и Акмолинской области
          </p>

          <p>Подпишись на скидки и акции</p>
          <div className={styles.input}>
            <input placeholder="Введите ваш E-mail" type="email" />
              <img src="/images/arrows/arrow.svg" alt="arrow" />
          </div>
        </div>

        <div className={styles.menu}>
            <h4 className={styles.title}>Меню сайта:</h4>
            <p>О компании</p>
            <p>Доставка и оплата</p>
            <p>Возврат</p>
            <p>Контакты</p>
        </div>

        <div className={styles.categories}>
            <h4 className={styles.title}>Категории:</h4>
            <p>Бытовая химия</p>
            <p>Косметика и гигиена</p>
            <p>Товары для дома</p>
            <p>Товары для детей и мам</p>
            <p>Посуда</p>
        </div>

        <div className={styles.priceList}>
            <h4 className={styles.title}>Скачать прайс-лист:</h4>
            <button>
                Прайс-лист
                <img src="/images/icons/download.svg" alt="download" />
            </button>
            <div className={styles.socials}>
            <p>Связь в мессенджерах:</p>
            <div className={styles.socialsList}>
                <img src="/images/footer-pictures/whatsapp.png" alt="whatsapp" />
                <img src="/images/footer-pictures/telegram.png" alt="telegram" />
            </div>
        </div>
        </div>

        <div className={styles.contacts}>
            <h4 className={styles.title}>Контакты:</h4>
            <p>+7 (777) 490-00-91</p>
            <p>время работы: 9:00-20:00</p>
            <a href="">Заказать звонок</a>

            <div className={styles.mail}>
                <p>opt.sultan@mail.ru </p>
                <p>На связи в любое время</p>
            </div>

            <div className={styles.cards}>
                <img src="/images/footer-pictures/visa.png" alt="visa" />
                <img src="/images/footer-pictures/mastercard.png" alt="mastercard" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
