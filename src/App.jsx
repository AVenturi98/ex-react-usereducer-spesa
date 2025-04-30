import * as React from 'react';
import List from './components/List';

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


function App() {

  const [addedProducts, setAddedProducts] = React.useState([]);

  function updateProductQuantity(productName, newQuantity) {
    setAddedProducts((prev) =>
      prev.map((product) =>
        product.name === productName
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  }


  function addToCart(prod) {

    setAddedProducts((prev) => {
      const exsist = prev.find(p => p.name === prod.name);

      if (exsist) {
        updateProductQuantity(prod.name, exsist.quantity + 1);
        return prev;
      };

      return [...prev, { ...prod, quantity: 1 }];
    });
  }


  return (
    <main>
      <h1>Lista prodotti</h1>

      <ul>
        {products.map((p, i) =>
          <li key={i}>
            <List item={p} addToCart={() => addToCart(p)} added={true} />
          </li>)}
      </ul>

      <h1>Carrello</h1>
      <ul>
        {addedProducts.length > 0 &&
          addedProducts.map((p, i) => (
            <li key={i}>
              <List item={p} quantity={p.quantity} />

            </li>
          ))}
      </ul>
    </main>
  )
}

export default App
