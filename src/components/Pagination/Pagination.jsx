import classes from './Pagination.module.css'

export default function Pagination({ currentPage, maxPage, onPageChange }) {
  const pages = Array.from(Array(maxPage), (_, index) => index + 1)

  return (
    <div className={classes.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          className={classes.button}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
