import Select from "react-select";
import NavList, { Anchor, NavItem } from "./styles/Nav";
import RefreshIcon from "../assets/icons/components/RefreshIcon.js";
import PlusIcon from "../assets/icons/components/PlusIcon.js";
import HamburgerIcon from "../assets/icons/components/Hamburger.js";
import ListIcon from "../assets/icons/components/ListIcon.js";
import "../css/select.css";

function Navbar(props) {
    const onCategoryChange = (selectedOption) => {
        props.setCategory(selectedOption)
        props.setChannel( { label: "All", value: "all" } )
    }

    const onChannelChange = (selectedOption) => {
        props.setChannel(selectedOption)
        props.setCategory( { label: "All", value: "all" } )
    }

    const onAddFeed = () => {
        console.log("add feed clicked")
        props.setShow(true)
    }

    const onArticleDisplay = () => {
        console.log("show articles clicked")
        props.setShow(false)
    }

    return (
        <NavList>
            <NavItem><Anchor href="#">Sign Out</Anchor></NavItem>
            <NavItem>
                <Anchor href="#" onClick={onAddFeed}>
                    <RefreshIcon />
                </Anchor>
            </NavItem>
            <NavItem>
                <Anchor onClick={onArticleDisplay}>
                    <ListIcon />
                </Anchor>
            </NavItem>
            <NavItem>
                <Anchor onClick={onAddFeed}>
                    <PlusIcon />
                </Anchor>
            </NavItem>
            <NavItem>
                <Select 
                    className="nav-select" 
                    options={props.categories} 
                    onChange={onCategoryChange}
                    value={props.currentCategory}
                />
            </NavItem>
            <NavItem>
                <Select 
                    className="nav-select" 
                    options={props.channels} 
                    onChange={onChannelChange}
                    value={props.currentChannel}
                />
            </NavItem>
        </NavList>
    )
}

export default Navbar;