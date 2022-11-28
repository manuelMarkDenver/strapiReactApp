import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Category from "./pages/Category";
import ReviewDetails from "./pages/ReviewDetails";
import SiteHeader from "./components/SiteHeader";

function App() {
  return (
    <>
      {/* <h1>Test</h1> */}
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route exact path="/details/:id" element={<ReviewDetails />}></Route>
          <Route path="/category/:id" element={<Category />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
