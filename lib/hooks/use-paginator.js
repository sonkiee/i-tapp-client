// import { useState } from "react";

// export default function usePaginator(postPerPage: number, posts: {}[]) {
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const indexOfLastPost = currentPage * postPerPage;
//   const indexOfFirstPost = indexOfLastPost - postPerPage;
//   const applications = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNum: number) => {
//     setCurrentPage(pageNum);
//   };

//   return { applications, setCurrentPage, postPerPage, currentPage, paginate };
// }

import { React, useState } from "react";

const usePaginator = (postPerPage, posts) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const applications = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return { applications, setCurrentPage, postPerPage, currentPage, paginate };
};

export default usePaginator;
