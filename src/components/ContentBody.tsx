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
                    scrub: 1,
                    markers: true,
                },
            });

            tl.to(".img-parallax", {
                y: 100,

            })


        }, component)
        return () => ctx.revert();
    }, []);



    return (<Bounded as="article">
        <div ref={component} className="rounded-2xl border-slate-500 bg-stone-100 px-4 py-10 md:px-8 md:py-10">
            <Heading as="h1" size="md" className="mb-10">{page.data.title}</Heading>

            <div className='flex gap-3 text-slate-100 text-lg font-bold '>
                {page.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-700 w-fit group relative items-center justify-center px-4 hover:opacity-90">{tag}</span>
                ))}
            </div>
            {/*     
    <p className="mt-8 border-b border-slate-700 md:text-xl font-medium text-slate-700">{page.data.date}</p> */}


            <PrismicImage field={page.data.image} imgixParams={{ w: 600 }} className="img-parallax" /><div className="prose md:prose-lg mt-12 w-full max-w-none md:mt-20"><SliceZone slices={page.data.slices} components={components} />
            </div>
        </div>
    </Bounded>);
}



