import { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import Loader from "../components/Loader";

export default function Table() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "https://phase2-aio.vercel.app";

  // console.log(products);
  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/branded-things/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProducts(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
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
        <table className="table-fixed mt-24 border-spacing-8 border-2 border-black border-separate mx-8">
          <thead className="">
            <tr>
              <th>ImgUrl</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="p-4">
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  fetchProducts={fetchProducts}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
