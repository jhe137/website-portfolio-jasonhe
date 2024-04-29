'use client';

import { PrismicImage, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function ContentBody({ page }: {
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
    const component = useRef(null)
    useEffect(() => {

        let ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: component.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    markers: false,
                },
            });

            tl.fromTo(".img-parallax", {
                yPercent: -20,

            }, { yPercent: 10 })


        }, component)
        return () => ctx.revert();
    }, []);



    return (<Bounded as="article">
        <div ref={component} className="rounded-2xl border-slate-500 bg-stone-100 px-4 py-10 md:px-8 md:py-10 ">
            <div className="relative text-center overflow-hidden  ">
                <Heading as="h1" className="absolute inset-0 flex items-center justify-center z-10 text-white uppercase">{page.data.title}</Heading>
                <PrismicImage field={page.data.image} imgixParams={{ w: 600 }} className=" img-parallax" />
            </div>
            {/* <div className='flex gap-3 text-slate-100 text-lg font-bold '>
                {page.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-700 w-fit group relative items-center justify-center px-4 hover:opacity-90">{tag}</span>
                ))}
            </div> */}
            <div className="prose md:prose-lg mt-12 w-full max-w-none md:mt-20">
                <SliceZone slices={page.data.slices} components={components} />
            </div>
        </div>
    </Bounded>);
}



