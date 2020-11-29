import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from "./Navbar";
import H1 from "./styles/Heading";
import Grid from "./styles/GridContainer";
import ArticleCard from "./ArticleCard";
import Articles from "./styles/Articles";
import Body from "./styles/Body";

function Dashboard() {
    const[feeds, setFeeds] = useState({feeds: []});
    const[currentCategory, setCategory] = useState("all");
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFeeds = async () => {
            setIsLoading(true);

            const response = await axios.get("/get-feeds");
            
            setFeeds(response.data);
            setIsLoading(false);
        }

        fetchFeeds();
    }, []);

    function filterFeeds() {
        if (currentCategory === "all") {
            return feeds.feeds.flatMap( (feed) => feed.channels.flatMap( (channel) => channel.items))
                .map( (article, index) =>
                    <li key={index}>
                        <ArticleCard title={article.title} description={article.description} author={article.author} pubDate={article.pub_date}></ArticleCard>
                    </li>
                )
        }
    }

    return (
        !isLoading && (
        <Grid>
            <Navbar />
            <Body>
                <H1>Here's your feed, enjoy!</H1>
                <Articles>
                    <ul>{filterFeeds()}</ul>
                    
                    {/* <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/>
                    <ArticleCard title={"test"} summary={"test"} published_by={"test"}/> */}
                </Articles>
            </Body>
        </Grid>
        )
    )
}

export default Dashboard;