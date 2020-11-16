import React from 'react';
import Navbar from "./Navbar";
import H1 from "./styles/Heading";

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <H1>Here's the current feed.</H1>
                <Navbar />
            </div>
        )
    }
}

export default Dashboard;