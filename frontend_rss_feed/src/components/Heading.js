import styled from "styled-components";
import H1 from "./styles/Heading";

const StyledHeader = styled.div`
    margin-left: 10%;
`;

const Heading = () => {
    return (
        <StyledHeader>
            <H1>Here's the current feed, enjoy!</H1>
        </StyledHeader>
    )
}

export default Heading;