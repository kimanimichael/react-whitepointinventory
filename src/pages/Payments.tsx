import React, {useEffect, useState} from "react";

interface PaymentProps {
    APIKey: string
}

interface Payment {
    cash_paid: number;
    created_at: string;
    farmer_id: string;
    farmer_name: string;
    id: string;
    price_per_chicken_paid: number;
    updated_at: string;
    user_id: string;
    user_name: string;
}

const Payments: React.FC <PaymentProps> = props => {
    const[data, setData] = useState<Payment[]>([])
    const[loading, setLoading] = useState(true)

    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/payments', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setData(content)
            setLoading(false)
        }
        fetchData()
    }, [reload])
    if (loading) {
        return (
            <div>
                <h1>Payments</h1>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className="Purchase">
            <h1>PAYMENTS</h1>
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
                            <pre>
                                {JSON.stringify({
                                    cash_paid:item.cash_paid,
                                    chicken_price: item.price_per_chicken_paid,
                                    payment: item.id,
                                    created_at: item.created_at,
                                    updated_at: item.updated_at,
                                    user_id: item.user_id,
                                    farmer_id: item.farmer_id
                                }, null, 2)}
                            </pre>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
}

export default Payments