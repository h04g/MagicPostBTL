import React from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

export const Paginate = ({ handleChangePage, pageCount, currentPage }) => {
  return (
    <>
      <div className="flex justify-content-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handleChangePage}
          pageRangeDisplayed={5}
          forcePage={currentPage}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          className="pagination"
          pageClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
};
