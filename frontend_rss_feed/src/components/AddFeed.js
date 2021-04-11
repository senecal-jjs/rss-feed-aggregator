import React, { useState } from "react";
import Card from "./styles/Card"
import Container from "./styles/Container";
import StackedInput from "./styles/Input";
import Form from "./styles/Form";
import useFeedSearch from "../hooks/useFeedSearch";

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
            {
                !isLoading && (
                    data.feeds.map( (searchResult) =>
                        FeedCard(searchResult)
                    )
                )
            }
        </Container>
    )
};

function FeedCard(props) {
    return (
        <Card>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </Card>
    )
};

export default AddFeed;