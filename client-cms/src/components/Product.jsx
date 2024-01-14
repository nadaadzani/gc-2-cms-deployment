import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Product({ product, fetchProducts }) {
  const url = "https://phase2-aio.vercel.app";

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/branded-things/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Swal.fire({
        title: "Delete success",
        icon: "success",
      });

      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  }
  // console.log(product);

  return (
    <>
      <tr>
        <td className="w-1/6">
          <img src={product.imgUrl} alt="" />
        </td>
        <td className="w-1/6 text-center">{product.name}</td>
        <td className="w-1/6">{product.description}</td>
        <td className="w-1/6 text-center">Rp. {product.price}</td>
        <td className="w-1/6 text-center">{product.stock}</td>
        <td className="flex flex-col text-center gap-6 mt-16">
          <Link
            className="flex items-center justify-center bg-slate-500 rounded-md text-white h-8"
            to={`/edit/product/${product.id}`}
          >
            Edit
          </Link>
          <Link
            className="flex items-center justify-center bg-yellow-400 rounded-md text-sm w-full h-12"
            to={`/patch/product/${product.id}`}
          >
            Upload Image
          </Link>
          <a
            className="flex items-center justify-center bg-red-500 rounded-md h-8 text-white cursor-pointer"
            onClick={() => {
              handleDelete(product.id);
            }}
          >
            Delete
          </a>
        </td>
      </tr>
    </>
  );
}
