import styled from "styled-components";
import Button from "./styles/Button"
import Card from "./styles/Card"
import React from "react";

const FeedImg = styled.img`
    border-radius: .25rem;
    flex: none;
    height: 60px;
    margin-right: 1.5rem;
    width: 60px;
`

const CardInfo = styled.div`
    display: flex;
`

const Content = styled.div`
    flex: auto;
`

const ContentHeader = styled.div`
    display: flex;
`

function SearchCard(props) {
    return (
        <Card>
            <CardInfo>
                <FeedImg src={'https://cdn.arstechnica.net/wp-content/uploads/2016/10/cropped-ars-logo-512_480-32x32.png'} />
                <Content>
                    <ContentHeader>
                        <h3>{props.title}</h3>
                        <Button>Follow</Button>
                    </ContentHeader>
                    <p>{props.description}</p>
                </Content>
            </CardInfo>
        </Card>
    )
}

export default SearchCard;