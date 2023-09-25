import { Button, Navbar as NextUINavbar, NavbarBrand as NextUINavbarBrand, Tooltip } from "@nextui-org/react";

function Navbar() {
    return (
        <NextUINavbar>
            <NextUINavbarBrand>
                <p className="font-bold text-inherit">Minesweeper</p>
            </NextUINavbarBrand>
            <Tooltip content="Coming soon...">
                <Button>Leaderboard</Button>
            </Tooltip>
        </NextUINavbar >
    )
}

export default Navbar