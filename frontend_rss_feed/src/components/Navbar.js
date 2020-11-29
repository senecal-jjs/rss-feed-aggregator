import NavList, { Anchor } from "./styles/Nav";
import RefreshIcon from "../assets/icons/components/RefreshIcon.js";
import PlusIcon from "../assets/icons/components/PlusIcon.js";

function Navbar() {
    return (
        <NavList>
            <li><Anchor href="#">Sign Out</Anchor></li>
            <li>
                <Anchor href="#">
                    <RefreshIcon />
                </Anchor>
            </li>
            <li>
                <Anchor href="#">
                    <PlusIcon />
                </Anchor>
            </li>
        </NavList>
    )
}

export default Navbar;