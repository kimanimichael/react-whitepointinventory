import React, {useEffect, useState} from "react";
import "../styles/Purchases.css"

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


interface HomeProps {
    name: string
}

const Home: React.FC <HomeProps> = props => {

    const[data, setData] = useState<Farmer[]>([])

    const[totalChickenBalance, setTotalChickenBalance] = useState(0)
    const[totalCashBalance, setTotalCashBalance] = useState(0)

    const[purchaseData, setPurchaseData] = useState<Purchase[]>([])

    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://michael.alwaysdata.net/whitepoint/farmer', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content:Farmer[] = await response.json()
            setData(content)

            const totalChicken = content.reduce((sum, farmer) => sum + farmer.chicken_balance, 0);
            setTotalChickenBalance(totalChicken)

            const totalCash = content.reduce((sum, farmer) => sum + farmer.cash_balance, 0);
            setTotalCashBalance(totalCash);

            setLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://michael.alwaysdata.net/whitepoint/purchases', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setPurchaseData(content)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div>
                <h1>White Point</h1>
                {props.name? 'Welcome ' + props.name: 'Please login or create an account'}
                <p>Loading...</p>
            </div>
        )
    }

    const sortedData = data.sort((a, b) => b.cash_balance - a.cash_balance).slice(0, 5);

    const sortedTopPricePurchases = purchaseData.slice(0, 60).sort((a, b) => b.price_per_chicken - a.price_per_chicken)
    const sortedLowPricePurchases = purchaseData.slice(0, 60).sort((a, b) => a.price_per_chicken - b.price_per_chicken)

    return (
        <div className="Home">
            <h1>White Point</h1>
            <div className="Welcome">
                {props.name ? 'Welcome ' + props.name : 'Please login or create an account'}
            </div>
            <div className="TablesContainer">
                <div className="TableWrapper">
                    <div className="Creditors">
                        <h2>Top Creditors</h2>
                    </div>
                    <table className="Creditors">
                        <thead>
                        <tr>
                            <th>Farmer</th>
                            <th>Chicken Balance</th>
                            <th>Cash Balance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((farmer) => {
                            return (
                                <tr key={farmer.name}>
                                    <td>{farmer.name}</td>
                                    <td>{farmer.chicken_balance.toFixed(2)}</td>
                                    <td>{farmer.cash_balance}</td>

                                </tr>
                            );
                        })}
                        </tbody>

                    </table>
                </div>
                <div className="TableWrapper">
                    <div className="HomePurchases">
                        <h2>Top Purchases</h2>
                    </div>
                    <table className="HomePurchases">
                        <thead>
                        <tr>
                            <th>Farmer</th>
                            <th>Chicken No</th>
                            <th>Chicken Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedTopPricePurchases.slice(0,5).map((purchase) => {

                            return (
                                <tr key={purchase.id}>
                                    <td>{purchase.farmer_name}</td>
                                    <td>{purchase.chicken}</td>
                                    <td>{purchase.price_per_chicken}</td>

                                </tr>
                            );
                        })}
                        </tbody>

                    </table>
                </div>
                <div className="TableWrapper">
                    <div className="TopPayments">
                        <h2>Low Purchases</h2>
                    </div>
                    <table className="TopPayments">
                        <thead>
                        <tr>
                            <th>Farmer</th>
                            <th>Chicken No</th>
                            <th>Chicken Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedLowPricePurchases.slice(0,5).map((purchase) => {

                            return (
                                <tr key={purchase.id}>
                                    <td>{purchase.farmer_name}</td>
                                    <td>{purchase.chicken}</td>
                                    <td>{purchase.price_per_chicken}</td>

                                </tr>
                            );
                        })}
                        </tbody>

                    </table>
                </div>
            </div>
            <div>
                <div className="TableWrapper">
                    <div className="TotalDebt">
                        <h2>Total Debt</h2>
                    </div>
                    <table className="TotalDebt">
                        <thead>
                        <tr>
                            <th>Chicken Balance</th>
                            <th>Cash Balance</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr >
                            <td>{totalChickenBalance.toFixed(2)}</td>
                            <td>{totalCashBalance}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Home;