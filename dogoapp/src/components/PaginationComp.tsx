import React from "react";
import { useState } from "react";

const PaginationComp = ({ arr }: { arr: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = React.useState(10);

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = arr.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {currentItems.map((item: any) => (
        <div key={item.id}>
          
        </div>
      ))}

      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PaginationComp;
