import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import './App.css';
import Title from "./Components/layout/Title";
import AddPerson from "./Components/forms/AddPerson";
import AddCar from "./Components/forms/AddCar"

// import Cars from "./Components/lists/Cars"
import People from "./Components/lists/People";


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <AddPerson />
        <AddCar />
        <People />
      </div>
    </ApolloProvider>
  );
}

export default App;
