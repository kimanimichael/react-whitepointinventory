import React, {useEffect, useState} from "react";
import "../styles/Purchases.css"
import {BASE_URL} from "../config";

interface User {
    ApiKey: string;
    CreatedAt: string;
    Email: string;
    ID: string;
    Name: string;
    Password: string;
    UpdatedAt: string;
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

const Users: React.FC =  () => {
    const[userData, setUserData] = useState<User[]>([])
    const[loading, setLoading] = useState(true)

    const[purchaseData, setPurchaseData] = useState<Purchase[]>([])
    const[paymentData, setPaymentData] = useState<Payment[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/whitepoint/user`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setUserData(content)
            setLoading(false)
        }
        fetchData()
    },[])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/whitepoint/purchases`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const content = await response.json()
            setPurchaseData(content)
        }
        fetchData()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/whitepoint/payments`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const content = await response.json()
            setPaymentData(content)
            console.log(paymentData)
        }
        fetchData()
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Users</h1>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className="Users">
            <h1>USERS</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Purchases</th>
                    <th>Payments</th>
                    <th>User Info</th>
                </tr>
                </thead>
                <tbody>
                {userData.map((user) => {
                    const userPurchases = purchaseData
                        .filter(purchaseData=>purchaseData.user_id === user.ID)
                        .sort((a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 2);
                    const userPayments = paymentData
                        .filter(paymentData => paymentData.user_id === user.ID)
                        .sort((a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 2);
                    function stripMilliseconds(createdAt: string): string {
                        const timeStamp = new Date(createdAt)
                        return timeStamp.toISOString().split('.')[0]
                    }
                    return (
                        <tr key={user.ID}>
                            <td>{user.Name}</td>
                            <td>
                                {
                                    userPurchases.map(purchaseData => (
                                        <div key={purchaseData.id}>
                                            <pre>
                                                {
                                                    JSON.stringify({
                                                        chicken_no: purchaseData.chicken,
                                                        chicken_price: purchaseData.price_per_chicken,
                                                        created_at: stripMilliseconds(purchaseData.created_at)
                                                    },null, 2)
                                                }
                                            </pre>
                                        </div>
                                    ))
                                }
                            </td>
                            <td>
                                {
                                    userPayments.map(paymentData => (
                                        <div key={paymentData.id}>
                                            <pre>
                                                {
                                                    JSON.stringify({
                                                        cash_paid: paymentData.cash_paid,
                                                        chicken_price: paymentData.price_per_chicken_paid,
                                                        created_at: stripMilliseconds(paymentData.created_at)
                                                    },null, 2)
                                                }
                                            </pre>
                                        </div>
                                    ))
                                }
                            </td>
                            <td>
                            <pre>
                                {
                                    JSON.stringify({
                                        user_email: user.Email,
                                        user_name: user.Name,
                                        user_id: user.ID,
                                        created_at: stripMilliseconds(user.CreatedAt)
                                    }, null, 2)
                                }
                            </pre>
                            </td>
                        </tr>
                    )

                })}
                </tbody>
            </table>
        </div>
    )
};

export default Users;