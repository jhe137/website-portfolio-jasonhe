"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Content, KeyTextField, asLink, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Image from "next/image";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "./Button";
import { usePathname } from "next/navigation";
import Burger from "./Burger";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function NavBar({
    settings,
}: {
    settings: Content.SettingsDocument;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation">
            <ul className="flex flex-col justify-between rounded-b-lg  border-slate-700 bg-neutral-100 px-4 py-2 md:m-4 md:flex-row md:items-center ">
                <div className="flex items-center justify-between">
                    <NameLogo name={settings.data.name} />

                </div>
                <div
                    className={clsx(
                        "fixed bottom-0 left-0 right-0 top-0 z-40 flex items-end gap-6 justify-end bg-slate-200 pr-8 pb-14 transition-transform duration-[800ms] ease-in-out md:hidden1",
                        open ? "md:translate-y-[-50%] translate-y-0" : "translate-y-[-100%]",
                    )}
                >
                    <div className="socials inline-flex justify-center sm:justify-end">
                        {isFilled.link(settings.data.github_link) && (
                            <PrismicNextLink
                                field={settings.data.github_link}
                                className="p-2 text-2xl text-slate-700 transition-all duration-150 hover:scale-125 hover:text-red-400"
                                aria-label={settings.data.name + " on GitHub"}
                            >
                                <FaGithub />
                            </PrismicNextLink>
                        )}
                        {isFilled.link(settings.data.twitter_link) && (
                            <PrismicNextLink
                                field={settings.data.twitter_link}
                                className="p-2 text-2xl text-slate-700 transition-all duration-150 hover:scale-125 hover:text-red-400"
                                aria-label={settings.data.name + " on Twitter"}
                            >
                                <FaTwitter />
                            </PrismicNextLink>
                        )}
                        {isFilled.link(settings.data.linkedin_link) && (
                            <PrismicNextLink
                                field={settings.data.linkedin_link}
                                className="p-2 text-2xl text-slate-700 transition-all duration-150 hover:scale-125 hover:text-red-400"
                                aria-label={settings.data.name + " on LinkedIn"}
                            >
                                <FaLinkedin />
                            </PrismicNextLink>
                        )}
                    </div>

                    {settings.data.nav_item.map(({ link, label }, index) => (
                        <React.Fragment key={label}>
                            <li className="first:mt-8">
                                <PrismicNextLink
                                    className={clsx(
                                        "group relative block overflow-hidden rounded px-3 text-7xl font-bold tracking-tight text-slate-900 leading-tight",
                                    )}
                                    field={link}
                                    onClick={() => setOpen(false)}
                                    aria-current={
                                        pathname.includes(asLink(link) as string)
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {/* <span
                                        className={clsx(
                                            "absolute inset-0 z-0 h-full translate-y-12 rounded bg-blue-400 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                                            pathname.includes(asLink(link) as string)
                                                ? "translate-y-6"
                                                : "translate-y-18",
                                        )}
                                    /> */}
                                    <span className="relative">{label}</span>
                                </PrismicNextLink>
                            </li>

                        </React.Fragment>
                    ))}
                    {/* <li> */}
                    {/* <Button
                            linkField={settings.data.cta_link}
                            label={settings.data.cta_label}
                            className="ml-3"
                        /> */}

                    {/* </li> */}
                </div>
                <div className="flex items-center justify-center">
                    <DesktopMenu settings={settings} pathname={pathname} />
                    <button
                        aria-expanded={open}
                        aria-label="Open menu"
                        className="block p-2 text-2xl text-slate-800 md:hidden1"
                        onClick={() => setOpen(!open)}
                    >
                        <Burger />
                    </button></div>
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
            <div className="flex items-center "><Image src="/images/logo.png" className="hover:animate-rotate-infinite transition-transform" alt="logo" width={70} height={70} />{name}</div>
        </Link>
    );
}

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
                    <li>
                        <PrismicNextLink
                            className={clsx(
                                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
                            )}
                            field={link}
                            aria-current={
                                pathname.includes(asLink(link) as string) ? "page" : undefined
                            }
                        >
                            {/* <span
                                className={clsx(
                                    "absolute inset-0 z-0 h-full rounded bg-slate-400 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                                    pathname.includes(asLink(link) as string)
                                        ? "translate-y-6"
                                        : "translate-y-8",
                                )}
                            /> */}
                            <span className="relative">{label}</span>
                        </PrismicNextLink>
                    </li>

                </React.Fragment>
            ))}
            <li>
                {/* <Button
                    linkField={settings.data.cta_link}
                    label={settings.data.cta_label}
                    className="ml-3"
                /> */}

            </li>
        </div>
    );
}