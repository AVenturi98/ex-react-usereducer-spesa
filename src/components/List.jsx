export default function List({ item, addToCart = () => { }, quantity }) {

    const { name, price } = item;

    return (
        <>
            <div className="card">
                <h3>{name}</h3>
                <p><b>prezzo:</b> €{price}</p>
                {!quantity > 0 ?
                    <button type="button" onClick={addToCart}>Aggiungi</button>
                    : <div>Quantità: {quantity}</div>}
            </div>
        </>
    )
}