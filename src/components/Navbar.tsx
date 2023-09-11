import { Navbar as NextUINavbar, NavbarBrand as NextUINavbarBrand } from "@nextui-org/react";

function Navbar() {
    return (
        <NextUINavbar>
            <NextUINavbarBrand>
                <p className="font-bold text-inherit">Minesweeper</p>
            </NextUINavbarBrand>
        </NextUINavbar >
    )
}

export default Navbar