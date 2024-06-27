import React, {useEffect, useState} from "react";

interface Farmer {
    cash_balance: number;
    chicken_balance: string;
    created_at: string;
    name: string;
    id: string;
    updated_at: string;

}

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

const Farmers: React.FC = () => {

    const[data, setData] = useState<Farmer[]>([])
    const[purchaseData, setPurchaseData] = useState<Purchase[]>([])
    const[paymentData, setPaymentData] = useState<Payment[]>([])

    const[reload, setReload] = useState(true)
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/farmer', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setData(content)
            setLoading(false)
        }
        fetchData()
    }, [reload])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/purchases', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setPurchaseData(content)
            setLoading(false)
        }
        fetchData()
    }, [reload])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/payments', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setPaymentData(content)
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
            <h1>FARMERS</h1>
            <table>
                <thead>
                <tr>
                    <th>Farmer</th>
                    <th>Chicken Balance</th>
                    <th>Cash Balance</th>
                    <th>Purchases</th>
                    <th>Payments</th>
                </tr>
                </thead>
                <tbody>
                {data.map((farmer) => {
                    const farmerPurchases = purchaseData
                        .filter(purchaseData => purchaseData.farmer_id === farmer.id)
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 2);
                    const farmerPayments = paymentData
                        .filter(paymentData => paymentData.farmer_id === farmer.id)
                        .sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0,2)
                    return (
                        <tr key={farmer.name}>
                            <td>{farmer.name}</td>
                            <td>{farmer.chicken_balance}</td>
                            <td>{farmer.cash_balance}</td>
                            <td>
                                {
                                    farmerPurchases.map(purchaseData => (
                                        <div key={purchaseData.id}>
                                            <pre>
                                                {JSON.stringify({
                                                    Chicken: purchaseData.chicken,
                                                    Price: purchaseData.price_per_chicken,
                                                    CreatedAt: purchaseData.created_at,

                                                }, null, 2)}
                                            </pre>
                                        </div>


                                    ))
                                }
                            </td>
                            <td>
                                {
                                    farmerPayments.map(paymentData => (
                                        <div key={paymentData.id}>
                                            <pre>
                                                {
                                                    JSON.stringify({
                                                        CashPaid: paymentData.cash_paid,
                                                        Price: paymentData.price_per_chicken_paid,
                                                        CreatedAt: paymentData.created_at
                                                    }, null, 2)
                                                }
                                            </pre>
                                        </div>
                                    ))
                                }
                            </td>
                        </tr>
                    );
                })}
                </tbody>

            </table>
        </div>
    )

}
export default Farmers;