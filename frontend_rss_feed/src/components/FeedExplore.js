import React, { useState } from "react";
import useFeedExplore from "../hooks/useFeedExplore";

function FeedExplore(props) {
    const { data, isLoading, isError } = useFeedExplore(props.channelId);

    return (
        <>
            <h3>{data.title}</h3>
        </>
    )

};

export default FeedExplore;