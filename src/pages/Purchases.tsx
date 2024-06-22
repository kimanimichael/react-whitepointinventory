import React, {useEffect, useState} from "react";
import '../styles/Purchases.css'
import '../App.css'

interface Purchase {
    chicken: number;
    created_at: string;
    farmer_id: string;
    farmer_name: string;
    id: string;
    price_per_chicken: number;
    updated_at: string;
    user_id: string;
    user_name: string;
}

const Purchases: React.FC = () => {
    const [data, setData] = useState<Purchase[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() =>{
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/purchases', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const content = await response.json()
            console.log(content)
            setData(content)
            setLoading(false)
        }
        fetchData();
    }, [])


    if (loading) {
        return (
            <div>
                <h1>PURCHASES</h1>
                <p>Loading...</p>
            </div>

        )
    }
    return (
        <div className="Purchase">
            <h1>PURCHASES</h1>
            <table>
                <thead>
                <tr>
                    <th>Created At</th>
                    <th>User</th>
                    <th>Farmer</th>
                    <th>Payload</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.created_at}</td>
                        <td>{item.user_name}</td>
                        <td>{item.farmer_name}</td>
                        <td>
                                <pre>{JSON.stringify({
                                    chicken_no: item.chicken,
                                    chicken_price: item.price_per_chicken,
                                    purchase: item.id,
                                    created_at: item.created_at,
                                    updated_at: item.updated_at,
                                    user_id: item.user_id,
                                    farmer_id: item.farmer_id
                                }, null, 2)}</pre>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default Purchases