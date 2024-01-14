import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function PatchProduct() {
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const url = "https://phase2-aio.vercel.app";
  const navigate = useNavigate();
  const { id } = useParams();

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", image);
      await axios.patch(`${url}/apis/branded-things/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid picture",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center py-[400px]">
            <Loader />
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-28 font-bold text-4xl text-center">
            Edit {product.name} image
          </h1>
          <div className="flex flex-row justify-center">
            <img className="w-1/3 mt-24" src={product.imgUrl} alt="" />
            <form className="w-1/2" action="" onSubmit={handleSubmit}>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-[500px] h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 mt-24 mx-auto"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-24 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    console.log(e.target.files);
                    setImage(e.target.files[0]);
                  }}
                />
              </label>
              <div className="flex justify-center w-full mt-8">
                <button
                  type="submit"
                  className="h-12 px-4 bg-slate-600 tracking-widest rounded-lg text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
