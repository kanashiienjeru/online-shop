import styles from "./Catalog.module.scss";
import Card from "../Card/Card";
import Pagination from "./Pagination";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import AdminPanel from "../AdminPanel/AdminPanel";
import { Link } from "react-router-dom";
declare global {
  interface Array<T> {
    filterByBrand(brands: string[]): any[];
    filterByPrice(price: number[]): any[];
    filterByTypes(type: string[]): any[];
    sortByType(type: string): any[];
  }
}
Array.prototype.filterByBrand = function (brands) {
  if (brands.length) return this.filter((elem) => brands.includes(elem.brand));
  return this;
};

Array.prototype.sortByType = function (type) {
  if (type === "priceUp") return this.sort((a, b) => a.price - b.price);
  if (type === "priceDown") return this.sort((a, b) => b.price - a.price);
  if (type === "nameUp") return this.sort((a, b) => (a.name > b.name ? 1 : -1));
  if (type === "nameDown")
    return this.sort((a, b) => (a.name < b.name ? 1 : -1));
  return this;
};

Array.prototype.filterByPrice = function (price) {
  if (price.length)
    return this.filter(
      (elem) => elem.price >= price[0] && elem.price <= price[1]
    );
  return this;
};
Array.prototype.filterByTypes = function (types) {
  if (types.length) return this.filter(e => e.type.some((r: string) => types.indexOf(r) >= 0))
  return this
}

const Catalog = ({ width }: { width: number}) => {
  // admin
  const isAdmin = useAppSelector((state) => state.products.isAdmin);

  // all products
  const products = useAppSelector((state) => state.products.all);
  // types
  const types = ['уход за телом', 'уход за руками', 'уход за ногами', 'уход за лицом', 'уход за волосами','средства для загара', 'средства для бритья', 'подарочные наборы', 'гигиеническая продукция', 'гигиена полости рта', 'бумажная продукция']
  const [typesState, setTypesState] = useState<string[]>([])

  // filters
  const [selectValue, setSelectValue] = useState("None");
  const [brandSearchValue, setBrandSearchValue] = useState("");
  const [checkedState, setCheckedState] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number[]>([0, 10000]);
  const [showBrands, setShowBrands] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  let currentProducts = 0


  // functions
  const render = (typeOfSort: string, brands: string[], price: number[], types: string[]) => {
    return products
      .filterByBrand(brands)
      .filterByPrice(price)
      .sortByType(typeOfSort)
      .filterByTypes(types)
      .slice(firstProductIndex, lastProductIndex)
      .map((e, i) => {
        currentProducts += 1
        return <Card key={i} id={e.id} />
      });
  };

  const renderBrands = (searchValue: string, hidden?: boolean) => {
    const handleChange = (value: string, checked: boolean) => checked ? setCheckedState([...checkedState, value]) : setCheckedState(checkedState.filter((e) => e !== value));
    const brands = [...products].map((e) => e.brand);
    if (hidden) {
      return [...new Set(brands)]
      .filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()))
      .slice(0, 4)
      .map((e, i) => {
        return (
          <div key={i} className={styles.brandItem}>
            <input
              type="checkbox"
              id={`brand-${i}`}
              value={e}
              onChange={(e) => handleChange(e.target.value, e.target.checked)}
            />
            <label htmlFor={`brand-${i}`}>{e}</label>
            <span>({brands.filter((item) => e === item).length})</span>
          </div>
        );
      });
    }
    
    return [...new Set(brands)]
      .filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()))
      .map((e, i, arr) => {
          return (
            <div key={i} className={styles.brandItem}>
              <input
                type="checkbox"
                id={`brand-${i}`}
                value={e}
                onChange={(e) => handleChange(e.target.value, e.target.checked)}
              />
              <label htmlFor={`brand-${i}`}>{e}</label>
              <span>({brands.filter((item) => e === item).length})</span>
            </div>
          );
      });
  };

  return (
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

      <div className={styles.header}>
        <h1>Косметика и гигиена</h1>
        {width > 680 && <div className={styles.sort}>
          <label htmlFor="">Сортировка:</label>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="None">Нет</option>
            <option value="nameUp">Название ↑</option>
            <option value="priceUp">Цена ↑</option>
            <option value="nameDown">Название ↓</option>
            <option value="priceDown">Цена ↓</option>
          </select>
        </div>}
      </div>
      <ul className={styles.types}>
        {types.map(e => {
          const result = e[0].toUpperCase() + e.slice(1, e.length)
          const isAdded = typesState.includes(e)
          return(
            <li key={e} className={`${styles.typesItem} ${isAdded ? `${styles.active}` : ''}`} onClick={() => {
              isAdded ? setTypesState(typesState.filter(el => el !== e)) : setTypesState([...typesState, e])  
            }}>{result}</li>
          )
        })}
      </ul>

      <div className={styles.content}>
        <div className={styles.filters}>
          <h3>Подбор по параметрам</h3>
          {width > 680 ? null : showFilters ? <img onClick={() => setShowFilters(false)} src="/images/arrows/dark-arrow-up.svg" alt="arrow" /> : <img onClick={() => setShowFilters(true)} src="/images/arrows/dark-arrow-down.svg" alt="arrow" />}
          {width > 680 ? (
            <>
            <div className={styles.priceFilter}>
            <p>
              Цена <b>₽</b>
            </p>
            <input
              type="number"
              defaultValue={0}
              onChange={(e) =>
                setPriceFilter((prev) => [(prev[0] = +e.target.value), prev[1]])
              }
            />
            <span> - </span>
            <input
              type="number"
              defaultValue={10000}
              onChange={(e) =>
                setPriceFilter((prev) => {
                  return [prev[0], (prev[1] = +e.target.value)];
                })
              }
            />
          </div>
          <div className={styles.brandFilter}>
            <p>Бренд</p>
            <div className={styles.brandSearch}>
              <input
                value={brandSearchValue}
                onChange={(e) => setBrandSearchValue(e.target.value)}
                placeholder="Поиск..."
                type="text"
              />
              <img src="/images/icons/search.svg" alt="search" />
            </div>
            {!showBrands ? (
              <>
              {renderBrands(brandSearchValue, true)}
              {brandSearchValue.length >= 1 ? null : <p className={styles.show} onClick={() => setShowBrands(true)}>Показать все</p>}
              </>
            ) : (
              <>
              {renderBrands(brandSearchValue)}
              {brandSearchValue.length >= 1 ? null : <p className={styles.hidden} onClick={() => setShowBrands(false)}>Скрыть</p>}
              </>
            )}
          </div>
          </>
          ) : showFilters ? (
          <>
            <div className={styles.priceFilter}>
              <p>
                Цена <b>₽</b>
              </p>
              <input
                type="number"
                defaultValue={0}
                onChange={(e) =>
                  setPriceFilter((prev) => [(prev[0] = +e.target.value), prev[1]])
                }
              />
              <span> - </span>
              <input
                type="number"
                defaultValue={10000}
                onChange={(e) =>
                  setPriceFilter((prev) => {
                    return [prev[0], (prev[1] = +e.target.value)];
                  })
                }
              />
            </div>
            <div className={styles.brandFilter}>
              <p>Бренд</p>
              <div className={styles.brandSearch}>
                <input
                  value={brandSearchValue}
                  onChange={(e) => setBrandSearchValue(e.target.value)}
                  placeholder="Поиск..."
                  type="text"
                />
                <img src="/images/icons/search.svg" alt="search" />
              </div>
              {!showBrands ? (
                <>
                {renderBrands(brandSearchValue, true)}
                {brandSearchValue.length >= 1 ? null : <p className={styles.show} onClick={() => setShowBrands(true)}>Показать все</p>}
                </>
              ) : (
                <>
                {renderBrands(brandSearchValue)}
                {brandSearchValue.length >= 1 ? null : <p className={styles.hidden} onClick={() => setShowBrands(false)}>Скрыть</p>}
                </>
              )}
            </div>
          </>
          ) : null}
          <div className={styles.bodyCareFilter}>
              <h4>Тип продукции</h4>
              {types.map(e => {
                const result = e[0].toUpperCase() + e.slice(1, e.length)
                const isAdded = typesState.includes(e)
                return <p key={e} className={`${isAdded ? `${styles.active}` : ''}`} onClick={() => {
                  isAdded ? setTypesState(typesState.filter(el => el !== e)) : setTypesState([...typesState, e])  
                }}>{result}</p>
              })}
          </div>
        </div>
        {width < 680 && <div className={styles.sort}>
          <label htmlFor="">Сортировка:</label>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="None">Нет</option>
            <option value="nameUp">Название ↑</option>
            <option value="priceUp">Цена ↑</option>
            <option value="nameDown">Название ↓</option>
            <option value="priceDown">Цена ↓</option>
          </select>
        </div>}
        <div className={styles.productsContent}>
        {isAdmin ? <AdminPanel types={types} /> : null}
          <div className={styles.productsList}>
            {render(selectValue, checkedState, priceFilter, typesState)}
            {currentProducts === 0 && <p>Так и не смог пофиксить :(</p>}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
