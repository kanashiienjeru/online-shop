import styles from './Catalog.module.scss'

interface Pagination {
    productsPerPage: number, 
    totalProducts: number, 
    setCurrentPage: Function, 
    currentPage: number
}

const Pagination = ({ productsPerPage, totalProducts, setCurrentPage, currentPage}: Pagination) => {
    const pageNumbers: number[] = []

    for(let i=1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <div className={styles.pagination}>
            <img onClick={() => {
                window.scrollTo(0,450)
                return currentPage <= Math.min(...pageNumbers) ? null : setCurrentPage(currentPage - 1);
            } } src="/images/arrows/arrow-left.svg" alt="arrow" />
            {
                pageNumbers.map(num => (
                    <p key={num} className={currentPage === num ? `${styles.active}` : ''} onClick={() => {
                        setCurrentPage(num)
                        window.scrollTo(0,450)
                    }}>{num}</p>
                ))
            }
            <img onClick={() => {
                window.scrollTo(0, 450)
                return currentPage >= Math.max(...pageNumbers) ? null : setCurrentPage(currentPage + 1)
            }} src="/images/arrows/arrow-right.svg" alt="arrow" />
        </div>
    )
}

export default Pagination