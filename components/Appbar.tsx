import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import Link from 'next/link';

function Appbar() {
    return (
        <Navbar>
            {/* <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand> */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                    Sign up test  Sign up test  Sign up test  Sign up test
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default Appbar