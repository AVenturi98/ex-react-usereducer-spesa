import cestino from '../assets/cestino-50.png'


export default function List({ item, addToCart = () => { }, quantity, removeFromCart = () => { } }) {

    const { name, price } = item;

    return (
        <>
            <div className="card" style={{ backgroundColor: quantity > 0 && "#363636" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{name}</h3>
                    {quantity &&
                        <button type="button" onClick={removeFromCart}>
                            <img src={cestino} alt="cestino" style={{ width: "20px" }} />
                        </button>}
                </div>
                <p><b>prezzo (u):</b> €{price}</p>
                {!quantity > 0 ?
                    <button type="button" onClick={addToCart}>Aggiungi</button>
                    : <div>Quantità:
                        <span style={{ margin: "0 5px" }}>{quantity}</span>
                    </div>}
            </div>
        </>
    )
}