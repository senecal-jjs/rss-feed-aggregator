import React from 'react';
import Navbar from "./Navbar";
import H1 from "./styles/Heading";
import Grid from "./styles/GridContainer";
import ArticleCard from "./ArticleCard";
import Articles from "./styles/Articles";
import Body from "./styles/Body";
import Heading from "./Heading";

class Dashboard extends React.Component {
    render() {
        return (
            <Grid>
                <Navbar />
                <Body>
                    <H1>Here's your feed, enjoy!</H1>
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