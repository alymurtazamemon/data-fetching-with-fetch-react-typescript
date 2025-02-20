import useFetch from "./hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const { data, error, loading } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Data Fetching in React + TypeScript</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.id}: Name: {user.name}, Email: {user.email}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
