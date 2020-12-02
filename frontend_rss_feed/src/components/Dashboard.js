import React, { useState, useEffect } from 'react';
import axios from "axios";
import useDataApi from "../hooks/useDataApi.js";
import Navbar from "./Navbar";
import H1 from "./styles/Heading";
import Grid from "./styles/GridContainer";
import ArticleCard from "./ArticleCard";
import Articles from "./styles/Articles";
import Body from "./styles/Body";

function Dashboard() {
    const[currentCategory, setCategory] = useState("all");
    const[{ data, isLoading, isError }, doFetch] = useDataApi(
        '/get-feeds',
        { feeds: [] },
    );

    useEffect(() => {
        doFetch("/get-feeds")
    });

    // useEffect(() => {
    //     const fetchFeeds = async () => {
    //         setIsLoading(true);

    //         const response = await axios.get("/get-feeds");
            
    //         setFeeds(response.data);
    //         setIsLoading(false);
    //     }

    //     fetchFeeds();
    // }, []);

    function filterFeeds() {
        if (currentCategory === "all") {
            return data.feeds.flatMap( (feed) => feed.channels.flatMap( (channel) => channel.items))
                .map( (article, index) =>
                    <ArticleCard key={index} title={article.title} description={article.description} author={article.author} pubDate={article.pub_date}></ArticleCard>
                )
        }
    }

    return (
        !isLoading && (
        <Grid>
            <Body>
                <H1>Here's your feed, enjoy!</H1>
                <Navbar />
                <Articles>
                    <ul>{filterFeeds()}</ul>
                </Articles>
            </Body>
        </Grid>
        )
    )
}

export default Dashboard;