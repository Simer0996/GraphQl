import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import './App.css';
import Title from "./Components/layout/Title";
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
        <div className="App">
          <Title />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/people/:personId" element={<ShowDetails />} />
          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
