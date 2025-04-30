export default function List({ item }) {

    const { name, price } = item;

    return (
        <>
            <div className="card">
                <h3>{name}</h3>
                <p><b>prezzo:</b> €{price}</p>
            </div>
        </>
    )
}