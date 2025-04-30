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
  const [value, setTotalPay] = React.useState([]);


  // Aggiungi un prodotto al carrello 
  function addToCart(prod) {

    setAddedProducts((prev) => {


      const exsist = prev.find(p => p.name === prod.name);

      if (exsist) {
        updateProductQuantity(prod.name, exsist.quantity + 1);
        return prev;
      }

      return [...prev, { ...prod, quantity: 1 }];
    });
  }


  // Modificare la quantità di un prodotto già presente nel carrello
  function updateProductQuantity(productName, newQuantity) {
    setAddedProducts((prev) =>
      prev.map((product) =>
        product.name === productName
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  }

  // Rimuovere un prodotto dal carrello
  const removeFromCart = (prod) => {
    setAddedProducts((prev) => prev.filter(p => p.name !== prod.name));
  }



  // Funzione per calcolare il totale da pagare
  const totalPay = React.useMemo(() => {
    return addedProducts.reduce((sum, prod) => sum + prod.quantity * prod.price, 0).toFixed(2);
  }, [addedProducts]);



  return (
    <main>
      <h1>Lista prodotti</h1>

      {/* LISTA PRODOTTI */}
      <ul>
        {products.map((p, i) =>
          <li key={i}>
            <List item={p} addToCart={() => addToCart(p)} added={true} />
          </li>)}
      </ul>

      {/* CARRELLO */}
      <h1>Carrello</h1>
      <ul>
        {addedProducts.length > 0 &&
          addedProducts.map((p, i) => (
            <li key={i}>
              <List
                item={p}
                quantity={
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={p.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (newQuantity > 0) {
                        updateProductQuantity(p.name, newQuantity);
                      }
                    }}
                  />
                }
                removeFromCart={() => removeFromCart(p)} />
            </li>
          ))}
      </ul>

      {/* TOTALE DA PAGARE */}
      <div>
        <h2>Totale da pagare</h2>
        {addedProducts.length > 0 &&
          <p>€{totalPay}</p>}
      </div>
    </main>
  )
}

export default App
