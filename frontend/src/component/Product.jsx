import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Api = import.meta.env.VITE_API_URL;
const Limit = 5;

export default function Product() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [childs, setChilds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(urlPage);
  const [isLastPage, setIsLastPage] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${Api}/api/products?page=${page}&limit=${Limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(res.data.products);
        setIsLastPage(res.data.isLastPage);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Page not found");
        } else {
          setError("Something went wrong");
        }
      }
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    setPage(urlPage);
  }, [urlPage]);

  const fetchChildProducts = async (productId) => {
    try {
      const res = await axios.get(`${Api}/api/childproduct/${productId}`);
      setSelectedProduct(productId);
      setChilds(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const gonext = () => {
    if (!isLastPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      setSearchParams({ page: nextPage });
    }
  };

  const goprv = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      setSearchParams({ page: prevPage });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

   
      {error ? (
        <div className="text-center mt-10">
          <h1 className="text-red-600 font-bold text-3xl">❌ {error}</h1>
          <button
            onClick={() => navigate("/?page=1")}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
          >
            Go to First Page
          </button>
        </div>
      ) : (
        <>
       
          <table className="bg-white shadow-lg rounded mb-8">
            <thead>
              <tr className="bg-gray-200 font-semibold">
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Brand</th>
                <th className="p-2">Image</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="text-center border-b">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2">{p.brand}</td>
                  <td className="p-2">
                    <img
                      src={`${Api}/${p.image}`}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => fetchChildProducts(p._id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded"
                    >
                      View Childs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

       
          <div className="flex gap-5 mb-8">
            <button
              disabled={page === 1}
              onClick={goprv}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-lg font-semibold">Page: {page}</span>

            <button
              disabled={isLastPage}
              onClick={gonext}
              className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}

 
      {selectedProduct && !error && (
        <>
          <h2 className="text-xl font-bold mb-3">Child Products</h2>
          {childs.length === 0 ? (
            <p className="text-gray-500">No child product found</p>
          ) : (
            <table className="bg-white shadow-lg rounded">
              <thead>
                <tr className="bg-gray-200 font-semibold">
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Image</th>
                </tr>
              </thead>
              <tbody>
                {childs.map((c) => (
                  <tr key={c._id} className="text-center border-b">
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">₹{c.price}</td>
                    <td className="p-2">{c.brand}</td>
                    <td className="p-2">
                      <img
                        src={`${Api}/${c.image}`}
                        className="w-14 h-14 rounded object-cover"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
