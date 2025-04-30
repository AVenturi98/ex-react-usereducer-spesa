import * as React from 'react';
import List from './components/List';

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


function cartReducer(state, action) {
  switch (action.type) {

    // // Aggiungi un prodotto al carrello 
    // function addToCart(prod) {

    //   setAddedProducts((prev) => {


    //     const exsist = prev.find(p => p.name === prod.name);

    //     if (exsist) {
    //       updateProductQuantity(prod.name, exsist.quantity + 1);
    //       return prev;
    //     }

    //     return [...prev, { ...prod, quantity: 1 }];
    //   });
    // }
    case 'ADD_ITEM':
      const existingProduct = state.find(p => p.name === action.payload.name);
      if (existingProduct) {
        // Se il prodotto esiste già, aggiorna la quantità
        return state.map((product) =>
          product.name === action.payload.name
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    //     // Modificare la quantità di un prodotto già presente nel carrello
    // function updateProductQuantity(productName, newQuantity) {
    //   setAddedProducts((prev) =>
    //     prev.map((product) =>
    //       product.name === productName
    //         ? { ...product, quantity: newQuantity }
    //         : product
    //     )
    //   );
    // }
    case 'UPDATE_QUANTITY':
      return state.map((product) =>
        product.name === action.payload.name
          ? { ...product, quantity: action.payload.newQuantity }
          : product
      );


    // Rimuovere un prodotto dal carrello
    // const removeFromCart = (prod) => {
    //   setAddedProducts((prev) => prev.filter(p => p.name !== prod.name));
    // }
    case 'REMOVE_ITEM':
      return state.filter(p => p.name !== action.payload.name);

    default:
      return state;
  }
}

function App() {

  // const [addedProducts, setAddedProducts] = React.useState([]);
  const [addedProducts, dispatchCart] = React.useReducer(cartReducer, []);


  // Funzione per calcolare il totale da pagare
  const totalPay = React.useMemo(() => {
    return addedProducts.reduce((sum, prod) => sum + prod.quantity * prod.price, 0).toFixed(2);
  }, [addedProducts]);



  return (
    <main>
      <h1>Lista prodotti</h1>

      {/* LISTA PRODOTTI */}
      <ul className='grid'>
        {products.map((p, i) =>
          <li key={i}>
            <List
              item={p}
              addToCart={() => dispatchCart({ type: 'ADD_ITEM', payload: p })}
              added={true} />
          </li>)}
      </ul>

      {/* CARRELLO */}
      <section style={{ margin: "30px auto" }}>
        <h1>Carrello</h1>
        <ul>
          {addedProducts.length > 0 ?
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
                          dispatchCart({ type: 'UPDATE_QUANTITY', payload: { name: p.name, newQuantity } });
                        }
                      }}
                    />
                  }
                  removeFromCart={() => dispatchCart({ type: 'REMOVE_ITEM', payload: p })} />
              </li>
            ))
            : 'Carrelo vuoto'}
        </ul>
      </section>

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
