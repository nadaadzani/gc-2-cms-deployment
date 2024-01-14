import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Form({ type }) {
  const [categories, setCategories] = useState([]);

  // Product by ID
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const url = "https://phase2-aio.vercel.app";
  const navigate = useNavigate();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (type === "edit") {
        const formData = new FormData(e.target);

        const name = formData.get("name");
        const description = formData.get("description");
        const imgUrl = formData.get("imgUrl");
        const stock = formData.get("stock");
        const price = formData.get("price");
        const categoryId = formData.get("categoryId");

        await axios.put(
          `${url}/apis/branded-things/products/${id}`,
          {
            name,
            description,
            imgUrl,
            stock: +stock,
            price: +price,
            categoryId: +categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        navigate("/");
      }
      if (type === "create") {
        const formData = new FormData(e.target);

        const name = formData.get("name");
        const description = formData.get("description");
        const imgUrl = formData.get("imgUrl");
        const stock = formData.get("stock");
        const price = formData.get("price");
        const categoryId = formData.get("categoryId");

        await axios.post(
          `${url}/apis/branded-things/products`,
          {
            name,
            description,
            imgUrl,
            stock: +stock,
            price: +price,
            categoryId: +categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  }

  useEffect(() => {
    if (type === "edit") fetchProduct();
    fetchCategories();
  }, []);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex h-auto w-46 justify-around mt-12">
          <div className="flex flex-col items-center w-1/3 text-xl">
            {/* Name */}
            <label htmlFor="" className="">
              Name
            </label>
            <input
              type="text"
              className="w-full mt-8 pl-2 border-2 border-gray-500 rounded-md"
              name="name"
              placeholder="Your product name.."
              // onChange={handleOnChange}
              defaultValue={product.name}
            />

            {/* Price */}
            <label htmlFor="" className="mt-12">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-8 pl-2 border-2 border-gray-500 rounded-md"
              name="price"
              placeholder="Your product price.."
              defaultValue={product.price}
            />

            {/* ImgUrl */}
            <label htmlFor="" className="mt-12">
              Image Url
            </label>
            <input
              type="text"
              className="w-full mt-8 pl-2 border-2 border-gray-500 rounded-md"
              name="imgUrl"
              placeholder="Your product image.."
              defaultValue={product.imgUrl}
            />
          </div>

          <div className="flex flex-col items-center w-1/3 text-xl">
            {/* Description */}
            <label htmlFor="">Description</label>
            <input
              type="text"
              className="w-full mt-8 pl-2 border-2 border-gray-500 rounded-md"
              name="description"
              placeholder="Your product description.."
              // onChange={handleOnChange}
              // value={product.description ? description : ""}
              defaultValue={product.description}
            />

            {/* Stock */}
            <label htmlFor="" className="mt-12">
              Stock
            </label>
            <input
              type="number"
              className="w-full mt-8 pl-2 border-2 border-gray-500 rounded-md"
              name="stock"
              placeholder="Your total stock.."
              defaultValue={product.stock}
            />

            {/* Category (Fetch the categories here) */}
            <label htmlFor="" className="mt-12">
              Category
            </label>
            <select
              className="w-full mt-8 pl-2 border-2 border-gray-500 rounded-md"
              name="categoryId"
              id=""
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex w-auto mt-12 h-12 mx-20">
          <button
            type="submit"
            className="w-full bg-slate-800 text-white rounded-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
