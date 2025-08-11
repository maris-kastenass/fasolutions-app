import type { PaginationProps } from './Pagination.types';

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  //return previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // returns next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="entry-pagination">
      <button
        type="button"
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={handlePrev}
        aria-label="Go to previous page"
      >
        Prev
      </button>
      <span className="pagination-info ms-2 me-2" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className="btn btn-secondary"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
