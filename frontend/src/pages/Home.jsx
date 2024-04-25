import axios from "axios";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

axios.defaults.withCredentials = true;
export async function loader() {
  const { data } = await axios.post("http://127.0.0.1:3000/", {});
  const { status, user } = data;
  if (status) {
    return { user };
  } else {
    console.log(status);
    return redirect("/login");
  }
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const [cookies, removeCookie] = useCookies([]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
        <div className="bg-white h-[22rem] w-[22rem] rounded-xl shadow-xl flex flex-col justify-center items-center gap-8">
          Yay you signed in as {user}
          <button
            onClick={Logout}
            className="w-20 h-10 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
