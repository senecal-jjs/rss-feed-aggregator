import React, { useState, useEffect } from 'react';
import useDataApi from "../hooks/useDataApi.js";
import Navbar from "./Navbar";
import H1 from "./styles/Heading";
import Grid from "./styles/GridContainer";
import ArticleCard from "./ArticleCard";
import Articles from "./styles/Articles";
import Body from "./styles/Body";
import Modal from "./Modal";

function Dashboard() {
    const[currentCategory, setCategory] = useState( { label: "All", value: "all" } );
    const[currentChannel, setChannel] = useState( { label: "All", value: "all" } );
    const[showAddFeed, setShowAddFeed] = useState(false);
    const[showArticle, setShowArticle] = useState(false);
    const[{ data, isLoading, isError }, doFetch] = useDataApi(
        '/get-feeds',
        { feeds: [] },
    );

    useEffect(() => {
        doFetch("/get-feeds")
    });

    function filterFeeds() {
        if (currentChannel.value !== "all") {
            return data.feeds
                .flatMap(
                    (feed) => feed.channels
                )
                .filter( (channel) => channel.title === currentChannel.value)
                .flatMap( (channel) => channel.items)
                .map( (article, index) =>
                    <ArticleCard 
                        key={index} 
                        title={article.title} 
                        description={article.description} 
                        author={article.author} 
                        pubDate={article.pub_date} 
                    />
                )
        }
        else if (currentCategory.value === "all") {
            return data.feeds
                .flatMap( 
                    (feed) => feed.channels.flatMap( (channel) => channel.items)
                )
                .map( (article, index) =>
                    <ArticleCard 
                        key={index} 
                        title={article.title} 
                        description={article.description} 
                        author={article.author} 
                        pubDate={article.pub_date} 
                    />
                )
        } 
        else if (currentCategory.value !== "all") {
            return data.feeds
                .filter( (feed) => feed.category === currentCategory.value )
                .flatMap( (feed) => feed.channels.flatMap( (channel) => channel.items) )
                .map( (article, index) =>
                    <ArticleCard 
                        key={index} 
                        title={article.title} 
                        description={article.description} 
                        author={article.author} 
                        pubDate={article.pub_date} 
                    />
                )
        }
    };

    function getCategories() {
        let cat = data.feeds
            .map( (feed) => ({ value: feed.category, label: feed.category }) )
        
        return [ { label: "All", value: "all" }, ...cat ]
    };

    function getChannels() {
        let channels = data.feeds
            .flatMap( 
                (feed) => feed.channels.flatMap( (channel) => ({ value: channel.title, label: channel.title }) )
            )

        return [ { label: "All", value: "all" }, ...channels]
    }

    return (
        !isLoading && (
        <Grid>
            <Body>
                <H1>Here's your feed, enjoy!</H1>
                <Navbar 
                    categories={getCategories()} 
                    channels={getChannels()} 
                    setCategory={setCategory} 
                    currentCategory={currentCategory}
                    setChannel={setChannel}
                    currentChannel={currentChannel}
                    setShowAddFeed={setShowAddFeed}
                />
                <Modal show={showAddFeed} setShow={setShowAddFeed}>
                    <p>Modal</p>
                </Modal> 
                <Articles>
                    <ul>{filterFeeds()}</ul>
                </Articles>
            </Body>
        </Grid>
        )
    )
}

export default Dashboard;