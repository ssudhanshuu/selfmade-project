import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async()=>{
      try {
        const res =await fetch("http://localhost:5000/api/products");
        
        const result = await res.json();
        console.log(result)
        setData(result);
        
      } catch (error) {
        console.log("error:",error)
        
      }
    }
    getData();

  },[]);

  return (
    <div className="w-full h-full bg-gray-500 items-center">
      <div className=" flex justify-center">
        <h1 className="text-4xl">Product</h1>
      </div>
      <div className="flex justify-center">
        <table className="border-collapse border border-gray-800 ">
          <thead>
            <tr>
              <th className="border border-gray-800 px-4 py-2">Name</th>
              <th className="border border-gray-800 px-4 py-2">price</th>
              <th className="border border-gray-800 px-4 py-2">description</th>
              <th className="border border-gray-800 px-4 py-2">category</th>
            </tr>
          </thead>
      
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-800 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {item.price}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {item.description}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {item.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
