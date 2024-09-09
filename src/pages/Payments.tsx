import React, {SyntheticEvent, useEffect, useState} from "react";

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
    chicken_balance:number;
    cash_balance:number;
}

const Payments: React.FC <PaymentProps> = props => {
    const[data, setData] = useState<Payment[]>([])
    const[loading, setLoading] = useState(true)

    const[chicken_no, setChickenNumber] = useState('')
    const[chicken_price, setChickenPrice] = useState('')
    const[farmer_name, setFarmerName] = useState('')

    const [reload, setReload] = useState(false)

    const handleFarmerNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const transformedName = e.target.value.replace(/\s+/g, '').toLowerCase()
        setFarmerName(transformedName)
    }

    function stripMilliseconds(createdAt: string): string{
        const timeStamp = new Date(createdAt)
        return timeStamp.toISOString().split('.')[0]
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://michael.alwaysdata.net/whitepoint/payments', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setData(content)
            setLoading(false)
        }
        fetchData()
    }, [reload])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch('https://michael.alwaysdata.net/whitepoint/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `APIKey:${props.APIKey}`
            },
            body: JSON.stringify({
                cash_paid: Number(chicken_no),
                price_per_chicken_paid: Number(chicken_price),
                farmer_name: farmer_name
            })
        })
        const content = await response.json()
        if (response.status < 400) {
            console.log("Payment creation successful")
            setChickenNumber('')
            setChickenPrice('')
            setFarmerName('')
            setReload(!reload)
        }
        else {
            console.log("Payment creation failed")
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
            <h1>PAYMENTS</h1>
            <div className="form-container">
                <form onSubmit={submit}>
                    <input type="number" className="" placeholder="Cash Paid"
                           value={chicken_no}
                           onChange={e => setChickenNumber(e.target.value)}
                    />
                    <input type="number" className="" placeholder="Chicken Price"
                           value={chicken_price}
                           onChange={e => setChickenPrice(e.target.value)}
                    />
                    <input className="" placeholder="Farmer Name"
                           value={farmer_name}
                           onChange={handleFarmerNameInput}
                    />
                    <button className="createPurchaseButton" type="submit" >Create New Payment</button>
                </form>
            </div>
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
                        <td>{stripMilliseconds(item.created_at)}</td>
                        <td>{item.user_name}</td>
                        <td>{item.farmer_name}</td>
                        <td>
                            <pre>
                                {JSON.stringify({
                                    cash_paid:item.cash_paid,
                                    chicken_price: item.price_per_chicken_paid,
                                    payment: item.id,
                                    user_id: item.user_id,
                                    farmer_id: item.farmer_id,
                                    chicken_balance: item.chicken_balance.toFixed(2),
                                    cash_balance: item.cash_balance
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