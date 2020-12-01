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
    margin: auto;
    padding: 10px;
    height: 100%;
    border-style: none;
`;

const NavItem = styled.li`
    float: left;
    margin-left: 10px;
    margin-right: 10px;
    display: inline; 
    vertical-align: middle;
`

const Anchor = styled.a`
    color: #b24342;
    stroke: #b24342;
    fill: #b24342;
    text-decoration: none;
    font-weight: bold;
    margin: 5px;

    &:hover {
        color: #4342b2;
        stroke: #4342b2;
        fill: #4342b2;
        transition: all .2s ease-out;
    }
`

export default NavList;

export {
    Anchor, NavItem
};
