import React from "react";

interface HomeProps {
    name: string
}

const Home: React.FC <HomeProps> = props => {
    return (
        <div className="" >
            <h1>White Point</h1>
            {props.name? 'Welcome ' + props.name: 'Please login or create an account'}
        </div>
    )
}

export default Home;