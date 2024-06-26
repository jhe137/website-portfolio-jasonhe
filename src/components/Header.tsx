import React from "react";
import { createClient } from "@/prismicio";

import NavBar from "@/components/NavBar";
import SideNav from "./SideNav";



export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return (
        <header className="top-0 z-50 mx-auto max-w-7xl  md:top-4 pb-10">
            <SideNav settings={settings} />


        </header>
    )

}