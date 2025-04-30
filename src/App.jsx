import List from './components/List'

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {

  return (
    <main>
      <h1>Lista prodotti</h1>

      {products.map(e =>
        <List item={e} />)}
    </main>
  )
}

export default App
