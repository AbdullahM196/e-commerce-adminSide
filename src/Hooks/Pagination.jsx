import { useState } from "react";
import { useGetAllPagesQuery } from "../store/API/apiSlices/productsSlice";
import { Pagination } from "react-bootstrap";

const useProductPagination = () => {
  const { data: AllPages, isSuccess } = useGetAllPagesQuery();
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  function handlePagination(index) {
    setActive(index);
    setPage(index);
  }
  let productPagination;
  if (isSuccess) {
    const pages = Number(AllPages);
    const displayedPages = 5;
    const halfDisplayedPages = Math.floor(displayedPages / 2);

    let startPage = Math.max(active - halfDisplayedPages, 0);
    let endPage = Math.min(startPage + displayedPages - 1, pages - 1);

    if (endPage - startPage < displayedPages - 1) {
      startPage = Math.max(endPage - displayedPages + 1, 0);
    }

    productPagination = (
      <Pagination>
        {active > 0 && (
          <Pagination.Prev
            onClick={() => {
              setPage((prev) => prev - 1);
              setActive((prev) => prev - 1);
            }}
          />
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <Pagination.Item
              onClick={() => {
                handlePagination(pageNumber);
              }}
              active={active === pageNumber}
              key={pageNumber}
            >
              {pageNumber + 1}
            </Pagination.Item>
          );
        })}
        {active < pages - 1 && (
          <Pagination.Next
            onClick={() => {
              setPage((prev) => prev + 1);
              setActive((prev) => prev + 1);
            }}
          />
        )}
      </Pagination>
    );
  }
  return {
    page,
    productPagination,
  };
};
export default useProductPagination;
