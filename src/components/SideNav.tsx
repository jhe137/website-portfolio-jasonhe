"use client";

import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Content, KeyTextField, asLink, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import Burger from "./Burger";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";



export default function NavBar({
    settings,
}: {
    settings: Content.SettingsDocument;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const component = useRef(null);

    useEffect(() => {
        const disableScroll = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
            event.preventDefault();
        };

        const keys: { [key: number]: boolean } = { 37: true, 38: true, 39: true, 40: true, 32: true, 33: true, 34: true, 35: true, 36: true }; // Arrow keys, spacebar, page up/down, end/home

        const preventDefaultForScrollKeys = (event: KeyboardEvent) => {
            if (keys[event.keyCode]) {
                disableScroll(event);
                return false;
            }
        };

        if (open) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', disableScroll as EventListener, { passive: false });
            window.addEventListener('touchmove', disableScroll as EventListener, { passive: false });
            window.addEventListener('keydown', preventDefaultForScrollKeys as EventListener, false);
        } else {
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', disableScroll as EventListener);
            window.removeEventListener('touchmove', disableScroll as EventListener);
            window.removeEventListener('keydown', preventDefaultForScrollKeys as EventListener);
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', disableScroll as EventListener);
            window.removeEventListener('touchmove', disableScroll as EventListener);
            window.removeEventListener('keydown', preventDefaultForScrollKeys as EventListener);
        };
    }, [open]);
    useEffect(() => {
        if (open) {
            // Pause all ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.disable());
        } else {
            // Resume all ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.enable());
        }
    }, [open]);

    useEffect(() => {

        {
            let ctx = gsap.context(() => {
                const tl = gsap.timeline({

                    paused: true,
                });

                tl.fromTo(('.nav-animation'),
                    { scale: 0 },
                    { scale: 1, duration: 0.3, ease: "ease.inOut", stagger: 0.04, delay: 0.2, }, 0);
                tl.fromTo(('.socials-animation'),
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 1, ease: "ease.inOut", delay: 0.1, }, 0);



                open ? tl.play() : tl.reverse(0);
            },);
            return () => ctx.revert();
        }
    }, [open]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".burger-menu", {

            scrollTrigger: {
                trigger: ".burger-menu",
                start: "center",
                markers: false,
                // end: window.innerHeight,
                onLeave: () => { gsap.to(".burger-menu", { scale: 1, duration: 0.25 }) },
                onEnterBack: () => { gsap.to(".burger-menu", { scale: 0, duration: 0.25 }) },
            },
        })


    }, [])
    return (


        <nav aria-label="Main navigation" ref={component}>
            <ul className="flex flex-col justify-between rounded-b-lg  border-slate-700 bg-neutral-100 px-4 py-2 md:m-4 md:flex-row md:items-center ">
                <div className="flex items-center justify-between">
                    <NameLogo name={settings.data.name} />

                </div>
                <div
                    className={clsx(
                        "fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center gap-6 justify-center bg-slate-200 pr-8 pb-14 transition-transform duration-[300ms] ease-in-out md:hidden1",
                        open ? "md:translate-y-[-20%]1 translate-y-0" : "translate-y-[-100%] delay-[700ms]",
                    )}
                >
                    <div className="flex-cols items-center justify-center" >


                        {settings.data.nav_item.map(({ link, label }, index) => (
                            <React.Fragment key={label}>
                                <li className="first:mt overflow-hidden1">
                                    <Magnetic><PrismicNextLink
                                        className={clsx(
                                            "nav-animation group relative block overflow-hidden rounded px-5 text-7xl font-bold tracking-tight text-slate-900 leading-tight",
                                        )}
                                        field={link}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            pathname.includes(asLink(link) as string)
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        <span
                                            className={clsx(
                                                [`absolute left-0 translate-y-10 w-4 h-4 z-0  rounded-full ${textColors[index % textColors.length]} transition-transform  duration-500 ease-in-out group-hover:scale-100 scale-0`],
                                                // pathname.includes(asLink(link) as string) && pathname === "/"
                                                //     ? " scale-100"
                                                //     : "",
                                                (pathname === asLink(link) || (pathname === "/" && asLink(link) === "/")) ? "translate-y-8 scale-100" : "translate-y-8",
                                            )}
                                        />
                                        <span className="relative pl-5">{label}</span>

                                    </PrismicNextLink></Magnetic>
                                </li>

                            </React.Fragment>
                        ))}
                        <div className="socials-animation flex items-start justify-center px-16 py-10 gap-4">

                            {isFilled.link(settings.data.github_link) && (<Magnetic>
                                <PrismicNextLink
                                    field={settings.data.github_link}
                                    className="p-2 text-3xl text-slate-700 transition-all duration-150 hover:scale-200 hover:text-red-400"
                                    aria-label={settings.data.name + " on GitHub"}
                                >
                                    <FaGithub />
                                </PrismicNextLink></Magnetic>
                            )}
                            {isFilled.link(settings.data.twitter_link) && (<Magnetic>
                                <PrismicNextLink
                                    field={settings.data.twitter_link}
                                    className="p-2 text-3xl text-slate-700 transition-all duration-150 hover:scale-125 hover:text-red-400"
                                    aria-label={settings.data.name + " on Twitter"}
                                >
                                    <FaTwitter />
                                </PrismicNextLink></Magnetic>
                            )}
                            {isFilled.link(settings.data.linkedin_link) && (<Magnetic>
                                <PrismicNextLink
                                    field={settings.data.linkedin_link}
                                    className="p-2 text-3xl text-slate-700 transition-all duration-150 hover:scale-125 hover:text-red-400"
                                    aria-label={settings.data.name + " on LinkedIn"}
                                >
                                    <FaLinkedin />
                                </PrismicNextLink></Magnetic>
                            )}
                        </div></div>

                </div>
                <div className="flex items-center justify-center">
                    <DesktopMenu settings={settings} pathname={pathname} />
                </div>
                <button
                    aria-expanded={open}
                    aria-label="Open menu"
                    className="block p-2 text-2xl pt-10 text-slate-800 fixed z-50 right-0 burger-menu md:scale-0"
                    onClick={() => setOpen(!open)}
                >
                    <Magnetic><Burger /></Magnetic>
                </button>
            </ul>

        </nav>

    );
}

function NameLogo({ name }: { name: KeyTextField }) {
    return (

        <Link
            href="/"
            aria-label="Home page"
            className="text-xl font-extrabold tracking-tighter text-slate-900 flex"
        >
            {/* <Image src="/images/logo.png" className="hover:animate-rotate-infinite transition-transform" alt="logo" width={70} height={70} />  */}
            <Magnetic><div className="flex items-center ">{name}</div></Magnetic>
        </Link>
    );
}

const textColors = [
    "bg-slate-700",


];

function DesktopMenu({
    settings,
    pathname,
}: {
    settings: Content.SettingsDocument;
    pathname: string;
}) {
    return (
        <div className="relative z-[39] hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
            {settings.data.nav_item.map(({ link, label }, index) => (
                <React.Fragment key={label}>
                    <li><Magnetic>
                        <PrismicNextLink
                            className={clsx(
                                "group relative block overflow-hidden1 rounded px-3 py-1 text-base font-bold text-slate-900",
                            )}
                            field={link}
                            aria-current={
                                pathname.includes(asLink(link) as string) ? "page" : undefined
                            }
                        >
                            <span key={index}
                                className={clsx(
                                    [`absolute left-1/2 -translate-x-1/2 w-2 h-2 z-0 ${textColors[index % textColors.length]}  rounded-full transition-transform  duration-500 ease-in-out group-hover:scale-100 scale-0`],
                                    (pathname === asLink(link) || (pathname === "/" && asLink(link) === "/")) ? "translate-y-8 scale-100" : "translate-y-8"

                                )}


                            />
                            <span className="relative">{label}</span>
                        </PrismicNextLink></Magnetic>
                    </li>

                </React.Fragment>
            ))}

        </div>
    );
}