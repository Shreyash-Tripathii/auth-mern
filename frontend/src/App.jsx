import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home, {loader as homeLoader} from "./pages/Home";
import Login, { action as loginAction, loader as loginLoader } from "./pages/Login";
import Register, { action as registerAction, loader as registerLoader } from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path="/" element={<Home />} loader={homeLoader} />
      <Route path="/login" element={<Login />} action={loginAction} loader={loginLoader} />
      <Route path="/register" element={<Register />} action={registerAction} loader={registerLoader} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
