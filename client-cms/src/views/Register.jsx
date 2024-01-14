import { useState } from "react";
import Button from "../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Register() {
  const [name, setName] = useState("Create Staff");
  const [loading, setLoading] = useState(false);

  const url = "https://phase2-aio.vercel.app";
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.target);

      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const phoneNumber = formData.get("phoneNumber");
      const address = formData.get("address");
      // /apis/add-user
      await axios.post(
        `${url}/apis/add-user`,
        { username, email, password, phoneNumber, address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center py-[400px]">
            <Loader />
          </div>
        </>
      ) : (
        <main className="flex w-full h-auto mt-32">
          <div className="w-1/2">
            <img
              src="./src/assets/loginregister-image-placeholder.png"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center w-1/2">
            <div className="mx-16">
              <h1 className="text-2xl font-bold mb-4 tracking-wide">
                Create an account as a staff
              </h1>
              <p className="text-sm mb-6">Enter your details below</p>

              {/* THIS FORM CONTAINER WILL BE TURNED INTO A COMPONENT */}
              <form action="" className="" onSubmit={handleRegister}>
                <input
                  className="border-b-2 border-gray-300 mb-6 w-full"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  className="border-b-2 border-gray-300 mb-6 w-full"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className="border-b-2 border-gray-300 mb-6 w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <input
                  className="border-b-2 border-gray-300 mb-6 w-full"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
                <input
                  className="border-b-2 border-gray-300 mb-6 w-full"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <Button name={name} />
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
