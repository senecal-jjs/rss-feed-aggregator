import styled from 'styled-components';

// analogous
//#250e8f
//#660e8f
// #8f0e78
// #8f0e37
// #8f250e
// #8f660e

// tints
// #250e8f#402c9d#5c4aab#7768b9#9287c7#ada5d5#c8c3e3#e4e1f1
const NavList = styled.ul`
    list-style-type: none;
    margin: 10px;
    padding: 10px;
    grid-row-start: 1; 
    grid-row-end: 3;
    border: 2px solid #8f660e;
    border-radius: 4px; 
`;
    // #788f0e;

const Anchor = styled.a`
    color: #250e8f;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        color: #050212;
    }
`
export default NavList;

export {
    Anchor
};
