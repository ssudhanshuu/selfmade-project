import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Api = import.meta.env.VITE_API_URL;

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [childs, setChilds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get(`${Api}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchChildProducts = async (productId) => {
    try {
      const res = await axios.get(`${Api}/api/childproduct/${productId}`);
      setSelectedProduct(productId);
      setChilds(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
    
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
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

      
      {selectedProduct && (
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
