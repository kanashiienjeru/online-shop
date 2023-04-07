import styles from './FooterMobile.module.scss'
import { navigationItems } from '../../Header/Header'
const FooterMobile = () => {
    return(
    <div className={styles.footer}>
        <div className={styles.aboutUs}>
          <div className={styles.aboutUsHead}>
            <img src="/images/logo/whiteLogo.svg" alt="logo" />
            <button>
                Прайс-лист
                <img src="/images/icons/download.svg" alt="download" />
            </button>
          </div>
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

        <div className={styles.links}>
            <div>
                <h4 className={styles.title}>Меню сайта:</h4>
                {navigationItems.map(navItem => <a key={navItem.id} href="/">{navItem.content}</a>)}
            </div>

            <div>
                <h4 className={styles.title}>Категории:</h4>
                <a href="/">Бытовая химия</a>
                <a href="/">Косметика и гигиена</a>
                <a href="/">Товары для дома</a>
                <a href="/">Товары для детей и мам</a>
                <a href="/">Посуда</a>
            </div>
        </div>

        <div className={styles.contacts}>
            <h4 className={styles.title}>Контакты:</h4>
            <div className={styles.contactsHead}>
                <div className={styles.call}>
                    <p>+7 (777) 490-00-91</p>
                    <p>время работы: 9:00-20:00</p>
                    <a href="">Заказать звонок</a>
                </div>
                <div className={styles.socials}>
                    <p>Связь в мессенджерах:</p>
                    <div className={styles.socialsList}>
                        <img src="/images/footer-pictures/whatsapp.png" alt="whatsapp" />
                        <img src="/images/footer-pictures/telegram.png" alt="telegram" />
                    </div>
                </div>
            </div>

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
    )
}

export default FooterMobile