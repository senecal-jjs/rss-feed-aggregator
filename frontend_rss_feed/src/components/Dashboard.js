import React from 'react';
import Navbar from "./Navbar";
import H1 from "./styles/Heading";
import Grid from "./styles/GridContainer";
import ArticleCard from "./ArticleCard";
import Articles from "./styles/Articles";
import Body from "./styles/Body";

class Dashboard extends React.Component {
    render() {
        return (
            <Grid>
                <H1>Here's the current feed, enjoy!</H1>
                <Body>
                    <Navbar />
                    <Articles>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                        <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    </Articles>
                </Body>
            </Grid>
        )
    }
}

export default Dashboard;