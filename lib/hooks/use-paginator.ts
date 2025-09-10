import { useState } from "react";

const usePaginator = (postPerPage, posts = []) => {
  const [currentPage, setCurrentPage] = useState(1);

  // ensure posts is always an array
  const safePosts = Array.isArray(posts) ? posts : [];

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const applications = safePosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return { applications, setCurrentPage, postPerPage, currentPage, paginate };
};

export default usePaginator;
