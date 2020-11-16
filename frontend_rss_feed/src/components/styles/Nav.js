import styled from 'styled-components';

// analogous
//#250e8f#660e8f#8f0e78#8f0e37#8f250e#8f660e

// tints
// #250e8f#402c9d#5c4aab#7768b9#9287c7#ada5d5#c8c3e3#e4e1f1
const NavList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 10px;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #e4e1f1;
    width: 15%;
`;

const Anchor = styled.a`
    display: block;
    color: #250e8f;
    text-decoration: none;
    font-weight: bold;
`
export default NavList;

export {
    Anchor
};
