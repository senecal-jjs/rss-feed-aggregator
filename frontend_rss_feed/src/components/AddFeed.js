import styled from "styled-components";
import React, { useState } from "react";
import SearchCard from "./SearchCard";
import Body from "./styles/Body";
import Card from "./styles/Card"
import Container from "./styles/Container";
import Grid from "./styles/GridContainer";
import StackedInput from "./styles/Input";
import Form from "./styles/Form";
import useFeedSearch from "../hooks/useFeedSearch";

const Scroll = styled.div`
    overflow: hidden;
    height: 1000px;
`

const SearchList = styled.div`
    overflow-y: scroll;
    list-style-type: none;
`

function AddFeed() {
    let [searchTerm, setSearchTerm] = useState("");
    let searchRef = React.createRef();
    const{ data, isLoading, isError } = useFeedSearch(searchTerm);

    const handleChange = (event) => {
        event.preventDefault();
        
        if (event.target.value.length) {
            setSearchTerm(event.target.value);
        }
    }

    return (
        <Container>
            <Form>
                <StackedInput 
                    name="search"
                    ref={searchRef}
                    type="text"
                    placeholder={"Search by keyword, website, or RSS link"}
                    onChange={handleChange}
                >
                </StackedInput>
            </Form>
            <Scroll>
                <SearchList>
                    {
                        !isLoading && (
                            <ul>
                                {
                                    data.feeds.map((searchResult) =>
                                        SearchCard(searchResult)
                                    )
                                }
                            </ul>
                        )
                    }
                </SearchList>
            </Scroll>
        </Container>
    )
};

function FeedCard(props) {
    return (
        <Card>
            <img src={'https://cdn.arstechnica.net/wp-content/uploads/2016/10/cropped-ars-logo-512_480-32x32.png'} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </Card>
    )
};

export default AddFeed;