import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { Fragment } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => fetchProducts(), [page]);

  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products?limit=100`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.products) {
          setProducts(res.products);
        }
      });
  };

  const handlePage = (currentPage) => {
    if (currentPage >= 1 && currentPage <= products.length / 10 && currentPage !== page) setPage(currentPage);
  };

  return (
    <Fragment>
      {products?.length > 0 ? (
        <div className="products">
          {products?.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span key={prod.id}>
                <img className="products__single" src={prod.thumbnail} height="320" width="320" alt={prod.title} />
              </span>
            );
          })}
        </div>
      ) : null}
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => handlePage(page - 1)} className={page > 1 ? "" : "pagination__disable"}>
            {"<<"}
          </span>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span className={page === index + 1 ? "pagination__selected" : ""} key={index + 1} onClick={() => handlePage(index + 1)}>
                {index + 1}
              </span>
            );
          })}
          <span onClick={() => handlePage(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>
            {">>"}
          </span>
        </div>
      )}
    </Fragment>
  );
}

export default App;
