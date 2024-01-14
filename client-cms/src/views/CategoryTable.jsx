import { useEffect, useState } from "react";
import Category from "../components/Category";
import axios from "axios";
import Loader from "../components/Loader";

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://phase2-aio.vercel.app";

  // console.log(categories);

  async function fetchCategories() {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
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
        <table className="table-auto mt-24 w-[96%] border-spacing-8 border-2 border-black border-separate text-center mx-auto">
          <thead className="">
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody className="p-4">
            {categories.map((category) => {
              return <Category key={category.id} category={category} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
