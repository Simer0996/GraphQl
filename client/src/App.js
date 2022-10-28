import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/screens/Home'
import ShowDetails from "./Components/screens/ShowDetails";



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people/:personId" element={<ShowDetails />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
