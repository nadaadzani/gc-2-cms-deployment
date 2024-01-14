import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2";

export default function Login() {
  const [name, setName] = useState("Log in");
  const navigate = useNavigate();
  const url = "https://phase2-aio.vercel.app";

  // If using onChange, define a function say emailOnChange that sets the useState into the current email value in e.target.value

  async function handleLogin(e) {
    e.preventDefault();
    try {
      // console.log(e.target[0].value);  onSubmit value per input

      const formData = new FormData(e.target); // instantiate form datas
      const email = formData.get("email");
      const password = formData.get("password");

      // console.log("Email:", email);
      // console.log("Password:", password);

      // Make the API request using axios
      const { data } = await axios.post(`${url}/apis/login`, {
        email,
        password,
      });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  }

  return (
    <>
      <main className="flex w-full h-auto mt-32">
        <div className="w-1/2">
          <img src="./src/assets/loginregister-image-placeholder.png" alt="" />
        </div>
        <div className="flex flex-col justify-center w-1/2">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold mb-4 tracking-wide">
              Log in to Moonborn
            </h1>
            <p className="text-sm mb-6">Enter your details below</p>

            {/* THIS FORM CONTAINER WILL BE TURNED INTO A COMPONENT */}
            <form action="" onSubmit={handleLogin}>
              <input
                className="border-b-2 border-gray-300 mb-6 w-full"
                type="text"
                name="email"
                placeholder="Email"
                required
              />
              <br />
              <input
                className="border-b-2 border-gray-300 mb-6 w-full"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <Button name={name} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
