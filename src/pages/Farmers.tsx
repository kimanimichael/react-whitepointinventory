import React, {SyntheticEvent, useEffect, useState} from "react";
import {BASE_URL} from "../config";

interface Farmer {
    cash_balance: number;
    chicken_balance: number;
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

    const[farmerName, setFarmerName] = useState('')
    const[initialChickenOwed, setInitialChickenOwed] = useState('')
    const[initialCashOwed, setInitialCashOwed] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/whitepoint/farmer`, {
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
            const response = await fetch(`${BASE_URL}/whitepoint/purchases`, {
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
            const response = await fetch(`${BASE_URL}/whitepoint/payments`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setPaymentData(content)
            setLoading(false)
        }
        fetchData()
    }, [reload])

    const handleFarmerNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const transformedNameValue = e.target.value.replace(/\s+/g, '').toLowerCase()
        setFarmerName(transformedNameValue)
    }
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch(`${BASE_URL}/whitepoint/farmers`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: farmerName,
                chicken_balance: Number(initialChickenOwed),
                cash_balance: Number(initialCashOwed)
            })
        })
        const content = await response.json()
        if (response.status < 400) {
            console.log("Farmer creation successful")
            setFarmerName('')
            setInitialChickenOwed('')
            setInitialCashOwed('')
            setReload(!reload)
        }
        else {
            console.log("Farmer creation not successful")
            alert(content.error)
        }
    }
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
            <div className="form-container">
                <form onSubmit={submit}>
                    <input type="" className="" placeholder="Farmer Name"
                           value={farmerName}
                           onChange={handleFarmerNameInput}
                    />
                    <input type="number" className="" placeholder="Chicken Owed"
                           value={initialChickenOwed}
                           onChange={e => setInitialChickenOwed(e.target.value)}
                    />
                    <input type="number" className="" placeholder="Cash Owed"
                           value={initialCashOwed}
                           onChange={e => setInitialCashOwed(e.target.value)}
                    />
                    <button className="createPurchaseButton" type="submit">Create New Farmer</button>
                </form>
            </div>

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
                    function stripMilliseconds(createdAt: string): string {
                        const timeStamp = new Date(createdAt)
                        return timeStamp.toISOString().split('.')[0]
                    }
                    return (
                        <tr key={farmer.name}>
                            <td>{farmer.name}</td>
                            <td>{farmer.chicken_balance.toFixed(2)}</td>
                            <td>{farmer.cash_balance}</td>
                            <td>
                                {
                                    farmerPurchases.map(purchaseData => (
                                        <div key={purchaseData.id}>
                                            <pre>
                                                {JSON.stringify({
                                                    Chicken: purchaseData.chicken,
                                                    Price: purchaseData.price_per_chicken,
                                                    CreatedAt: stripMilliseconds(purchaseData.created_at),

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
                                                        CreatedAt: stripMilliseconds(paymentData.created_at)
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