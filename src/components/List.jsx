import cestino from '../assets/cestino-50.png'


export default function List({ item, addToCart = () => { }, quantity, removeFromCart = () => { } }) {

    const { name, price } = item;

    return (
        <>
            <div className="card" style={{ backgroundColor: quantity > 0 && "#363636" }}>
                <h3>{name}</h3>
                <p><b>prezzo:</b> €{price}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {!quantity > 0 ?
                        <button type="button" onClick={addToCart}>Aggiungi</button>
                        : <div>Quantità: {quantity}</div>}
                    {quantity > 0 &&
                        <button type="button" onClick={removeFromCart}>
                            <img src={cestino} alt="cestino" style={{ width: "20px" }} />
                        </button>}
                </div>
            </div>
        </>
    )
}