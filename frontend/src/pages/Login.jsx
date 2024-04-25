import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const tempUser = Object.fromEntries(formData);
  const { data } = await axios.post(
    "http://127.0.0.1:3000/login",
    {
      ...tempUser,
    },
    { withCredentials: true }
  );
  const { success, message } = data;
  if (success) {
    return redirect("/");
  } else {
    console.log(message);
    return redirect(`/login/?q=wrong`);
  }
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (q == "wrong") {
    return { flag: true };
  } else {
    return { flag: false };
  }
}

const Login = () => {
  const { flag } = useLoaderData();
  return (
    <>
      <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
        <div className="bg-white h-[29rem] w-[22rem] rounded-xl shadow-xl flex flex-col justify-center items-center gap-8">
          <div>
            <h3 className="text-2xl justify-self-start text-center">Log In</h3>
            <h4>Welcome back</h4>
          </div>
          <Form
            method="POST"
            className="flex flex-col justify-center items-center gap-2"
          >
            {flag && (
              <div className="text-sm text-red-500">
                Incorrect username or password
              </div>
            )}
            <div className="flex flex-col justify-center items-center gap-2">
              <label className="self-start" htmlFor="email">
                E-mail
              </label>
              <input
                className="flex h-10 w-56 rounded-md border border-input bg-zinc-200 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                type="email"
                name="email"
                placeholder="Enter here"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <label className="self-start" htmlFor="password">
                Password
              </label>
              <input
                className="flex h-10 w-56 rounded-md border border-input bg-zinc-200 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                type="password"
                name="password"
                placeholder="Enter here"
              />
            </div>
            <button
              type="submit"
              className="w-20 h-10 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90 self-start"
            >
              Submit
            </button>
          </Form>
          <Link
            to={"/register"}
            className="flex items-center hover:text-blue-400 transition-colors"
          >
            New here? Register here <ArrowRight className="w-4 h-4" />{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
