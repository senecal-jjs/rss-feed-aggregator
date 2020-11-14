import styled, { css } from 'styled-components'

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid slateblue;
    color: slateblue;
    margin: 0 1em;
    padding: 0.25em 1em;
    width: 60%;

    &:hover {
        color: white;
        background-color: slateblue;
    }

    ${props => props.stacked && css`
        display: inline-block;
    `}
`;

export default Button;