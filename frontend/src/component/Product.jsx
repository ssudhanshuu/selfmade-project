import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Api = import.meta.env.VITE_API_URL; 

export default function Product() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${Api}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductData(res.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Something went wrong!");

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);


  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading products...
      </div>
    );
  }


  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

 
  if (productData.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        No products found
      </div>
    );
  }

  return (
    <div className="bg-gray-300 h-screen w-full flex fixed justify-center items-center overflow-hidden">
      <table className="bg-white shadow-xl rounded-lg border border-gray-300">
        <thead>
          <tr className="font-bold bg-gray-200 text-black">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
        
  {productData.map((item, index) => (
    <tr key={index} className="text-center border-b">
      <td className="px-4 py-2">{item.name}</td>
      <td className="px-4 py-2">₹{item.price}</td>
      <td className="px-4 py-2">{item.description}</td>
      <td className="px-4 py-2">{item.category}</td>
      <td className="px-4 py-2">
        <img
          src={`${Api}/${item.image}`}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      </td>
    </tr>
  ))}
</tbody>

        
      </table>
    </div>
  );
}
