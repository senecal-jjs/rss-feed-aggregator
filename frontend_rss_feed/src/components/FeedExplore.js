import React, { useState } from "react";
import useFeedExplore from "../hooks/useFeedExplore";

function FeedExplore(channelId) {
    const { data, isLoading, isError } = useFeedExplore(channelId);

    return (
        <>
            <h3>{data.title}</h3>
        </>
    )

};