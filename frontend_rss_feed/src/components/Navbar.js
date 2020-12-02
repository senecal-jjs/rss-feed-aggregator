import Select from "react-select";
import NavList, { Anchor, NavItem } from "./styles/Nav";
import RefreshIcon from "../assets/icons/components/RefreshIcon.js";
import PlusIcon from "../assets/icons/components/PlusIcon.js";
import "../css/select.css";

const options = [
    { value: 'blues', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra', label: 'Orchestra' } 
  ];

function Navbar(props) {
    return (
        <NavList>
            <NavItem><Anchor href="#">Sign Out</Anchor></NavItem>
            <NavItem>
                <Anchor href="#">
                    <RefreshIcon />
                </Anchor>
            </NavItem>
            <NavItem>
                <Anchor href="#">
                    <PlusIcon />
                </Anchor>
            </NavItem>
            <NavItem>
                <Select className="nav-select" options={props.categories} />
            </NavItem>
            <NavItem>
                <Select className="nav-select" options={props.channels} />
            </NavItem>
        </NavList>
    )
}

export default Navbar;