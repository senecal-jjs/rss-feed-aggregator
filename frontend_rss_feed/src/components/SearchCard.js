import styled from "styled-components";
import Button from "./styles/Button";
import React, { useState } from "react";

const FeedImg = styled.img`
    border-radius: .25rem;
    height: 60px;
    margin-right: 1.5rem;
    width: 60px;
    grid-area: logo;
`

const Title = styled.h3`
    grid-area: title;
    margin-left: 20px;
`

const ExploreButton = styled(Button)`
    grid-area: follow;
`

const Similar = styled.div`
    grid-area: similar;
`

const Description = styled.div`
    grid-area: desc;
    margin-left: 20px;
`

const CardInfo = styled.div`
    display: grid;
    overflow: hidden;
    height: fit-content;
    list-style-type: none;
    border: 1px solid #F0F0F0;
    border-radius: 25px;
    padding: 15px;
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.1); 
    max-width: 800px;
    margin: 10px auto;
    background: white;
    grid-template-columns: 60px 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 100px;
    grid-template-areas: 
        "logo title . similar follow"
        ". desc desc desc desc"
`

function SearchCard(props) {
    const onExplore = (channelId) => {
        props.setChannelId(channelId)
        props.setExploreOpen(true)
    }


    return (
        <CardInfo>
            <FeedImg src={'https://cdn.arstechnica.net/wp-content/uploads/2016/10/cropped-ars-logo-512_480-32x32.png'} />
            <Title>{props.data.title}</Title>
            <ExploreButton onClick={onExplore(props.data.id)}>Explore</ExploreButton>
            <Description>{props.data.description}</Description>
        </CardInfo>
    )
}

export default SearchCard;