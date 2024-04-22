'use client';
// import { usePathname } from "next/navigation";
import { useState } from "react";
import Magnetic from "./Magnetic";

export default function Burger() {

    const [open, setOpen] = useState(false);
    // const pathname = usePathname();
    // useEffect(() => {
    //     if (open) setOpen(false)
    // }, [pathname])

    return (
        <Magnetic>
            <div onClick={() => setOpen(!open)}
                className="w-[60px] h-[60px] md:w-20 md:h-20 rounded-full bg-slate-900 cursor-pointer flex items-center justify-center relative z-50 "
            >
                <span className={`absolute w-2/5 h-px bg-white ${open ? 'burger-top-open' : "burger-top-closed"}`}
                    style={{ top: "35%", }}></span>
                <span className={`absolute w-2/5 h-px bg-white ${open ? 'burger-mid-open' : "burger-mid-closed"}`} ></span>
                <span className={`absolute w-2/5 h-px bg-white ${open ? 'burger-mid2-open' : "burger-mid2-closed"}`} ></span>
                <div className={`absolute w-2/5 h-px bg-white ${open ? 'burger-bot-open' : "burger-bot-closed"}`}
                    style={{ bottom: "35%", }}></div>

            </div></Magnetic>
    )

}