import React from "react";
import Button from "./styles/Button";
import Container from "./styles/Container";
import StackedInput from "./styles/Input";
import Form from "./styles/Form";

function AddFeed() {
    let searchRef = React.createRef();

    return (
        <Container>
            <Form>
                <StackedInput 
                    name="search"
                    ref={searchRef}
                    type="text"
                    placeholder={"Search by keyword, website, or RSS link"}>
                </StackedInput>
            </Form>
        </Container>
    )
}

export default AddFeed;