import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { productService } from '../../services';
import { ProductComponent } from '../../components';
import './style.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [limit, setLimit] = useState(40);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState();
  useEffect(() => {
    console.log(isLoginLoading);
    setLoginLoading(true);
    productService
      .getProduct(limit, offset, search)
      .then(({ data }) => {
        setData(data);
        setProducts(data.slice(offset, offset + perPage));
        setPageCount(Math.ceil(data.length / perPage));
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  }, [search]);

  const handlePageClick = (e) => {
    console.log(e.selected, offset);
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
    console.log(offset, 'ini ofset', perPage, 'ini perpage');
    setProducts(data.slice(offset, offset + perPage));
    setSearch('');
  };

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    setSearch(inputSearch);
    e.preventDefault();
  };

  return (
    <>
      {isLoginLoading && <p>Loading...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error!
        </div>
      )}

      {/* <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
      <div
        className="container"
        style={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '20px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputSearch} onChange={handleChange} />
          <input type="submit" value="Search" />
        </form>
      </div>
      {/*  CARA PERTAMA
      {products.map((element) => {
        // return (
        //   <>
        //     <p>{element.name}</p>
        //     <h1>{element.description}</h1>
        //     <h6>{element.display_price}</h6>
        //   </>
        // );
      })} */}
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'breakme'}
          pageCount={pageCount}
          marginPageDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
      {products.map((element) => {
        return <ProductComponent data={element} />;
      })}
    </>
  );
};

export default Product;
