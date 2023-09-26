import { Button, Navbar as NextUINavbar, NavbarBrand as NextUINavbarBrand } from "@nextui-org/react";

interface NavbarProps {
    onOpen: () => void;
}

function Navbar(props: NavbarProps) {
    return (
        <NextUINavbar>
            <NextUINavbarBrand>
                <p className="font-bold text-inherit">Minesweeper</p>
            </NextUINavbarBrand>
            <Button onPress={props.onOpen}>Leaderboard</Button>
        </NextUINavbar >
    )
}

export default Navbar