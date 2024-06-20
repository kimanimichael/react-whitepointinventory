import React, {useEffect, useState} from "react";
import '../styles/Purchases.css'

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
                <th>ID</th>
                <th>Updated At</th>
                <th>Chicken</th>
                <th>Price Per Chicken</th>
                <th>User </th>
                <th>Farmer </th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.created_at}</td>
                    <td>{item.id}</td>
                    <td>{item.updated_at}</td>
                    <td>{item.chicken}</td>
                    <td>{item.price_per_chicken}</td>
                    <td>{item.user_name}</td>
                    <td>{item.farmer_name}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

    )
}

export default Purchases