import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// page & layout imports
import Homepage from "./pages/Homepage";
import Category from "./pages/Category";
import ReviewDetails from "./pages/ReviewDetails";
import SiteHeader from "./components/SiteHeader";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      {/* <h1>Test</h1> */}
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route
              exact
              path="/details/:id"
              element={<ReviewDetails />}
            ></Route>
            <Route path="/category/:id" element={<Category />}></Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
