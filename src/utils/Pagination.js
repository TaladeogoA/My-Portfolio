import React from "react";
import styled from "styled-components";

const Pagination = ({
  projectsPerPage,
  totalProjects,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationWrapper>
      {
        // if there is only one page, don't show the pagination
        pageNumbers.length > 1 && (
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={
                  currentPage === number ? "page-item active" : "page-item"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        )
      }
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  ul {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    list-style: none;
    font-size: 2rem;
    font-weight: 500;
    text-decoration: none;
    font-family: "Mate", serif;

    .page-item {
      cursor: pointer;
      color: #808080;

      &:hover {
        color: #000;
      }

      &.active {
        color: #000;
        text-decoration: underline;
      }
    }
  }
`;
