import styled from "styled-components";
import React, { useState } from "react";
import SearchCard from "./SearchCard";
import StackedInput from "./styles/Input";
import Form from "./styles/Form";
import useFeedSearch from "../hooks/useFeedSearch";

const ScrollGrid = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-rows: 80px 1fr;
`

const SearchList = styled.div`
    overflow-y: scroll;
    list-style-type: none;
`

function AddFeed() {
    let [searchTerm, setSearchTerm] = useState("");
    let [channelId, setChannelId] = useState("");
    let [exploreOpen, setExploreOpen] = useState(false);
    let searchRef = React.createRef();
    const{ data, isLoading, isError } = useFeedSearch(searchTerm);

    const handleChange = (event) => {
        event.preventDefault();
        
        if (event.target.value.length) {
            setSearchTerm(event.target.value);
        }
    }

    const onExploreClose = () => {
        setExploreOpen(false)
    }

    return (
        <ScrollGrid>
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
            <SearchList>
                {
                    !isLoading && (
                        <ul>
                            {
                                data.feeds.map((searchResult, index) =>
                                    <SearchCard 
                                        key={index}
                                        data={searchResult}
                                        setChannelId={setChannelId}
                                        setExploreOpen={setExploreOpen}
                                    />
                                )
                            }
                        </ul>
                    )
                }
            </SearchList>
        </ScrollGrid>
    )
};

export default AddFeed;