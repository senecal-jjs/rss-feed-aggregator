import styled from "styled-components";
import Card from "./styles/Card"
import React from "react";

const FeedImg = styled.img`
    margin: auto 10px;
`

function SearchCard(props) {
    return (
        <Card>
            <FeedImg src={'https://cdn.arstechnica.net/wp-content/uploads/2016/10/cropped-ars-logo-512_480-32x32.png'} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </Card>
    )
}