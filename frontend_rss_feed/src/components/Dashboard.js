import React from 'react';
import Navbar from "./Navbar";
import H1 from "./styles/Heading";
import Grid from "./styles/GridContainer";
import ArticleCard from "./ArticleCard";

class Dashboard extends React.Component {
    render() {
        return (
            <Grid>
                <Navbar />
                <H1>Here's the current feed.</H1>
                <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
            </Grid>
        )
    }
}

export default Dashboard;