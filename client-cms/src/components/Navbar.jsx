import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  function handleLogout() {
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/login");
  }
  return (
    <>
      <nav className="fixed flex justify-between items-center w-full py-3 px-3 top-0 left-0 right-0 bg-slate-300">
        <h1 className="text-2xl font-bold ml-4">Moonborn</h1>
        <div className="flex gap-2 items-center">
          <form action="">
            <input
              type="text"
              className="w-96 h-8 px-2 rounded-md"
              placeholder="Search your items here.."
            />
          </form>
        </div>
        <ul className="flex gap-8 mr-6">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/categories"}>Categories</Link>
          </li>
          <li>
            <Link to={"/add/product"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/add-staff"}>Register Staff</Link>
          </li>
          <li>
            <a href="" onClick={handleLogout}>
              Log out
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
