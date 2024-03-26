"use client";

import { Content, isFilled } from '@prismicio/client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { gsap } from "gsap";


type ContentListProps ={
    items: Content.BlogPostDocument[] | Content.ProjectDocument[];
    contentType: Content.ContentIndexSlice["primary"]["content_type"];
    viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];    
}
export default function ContentList({items, contentType, viewMoreText ="Read More"}: ContentListProps){

    const urlPrefix = contentType === "Blog" ? "/blog" : "/projects";
    const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
          itemsRef.current.forEach((item, index) => {
            gsap.fromTo(
              item,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1.3,
                ease: "elastic.out(1,0.3)",
                stagger: 0.2,
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom-=100px",
                  end: "bottom center",
                  toggleActions: "play none none none",
                },
              },
            );
          });
    
          return () => ctx.revert(); 
        }, component);
      }, []);

    return (
        <div>
            <ul className="grid border-b border-b-slate-700">
                {items.map((item,index)=>(
                    <>
                    {isFilled.keyText(item.data.title) &&(
                <li key={index} className="list-item opacity-0f" ref={(el)=>(itemsRef.current[index]=el)}>
                    <Link href={urlPrefix + "/"+ item.uid} className="flex flex-col justify-between border-t border-t-slate-700 py-10 text-slate-700 md:flex-row"
                    aria-label={item.data.title}>
                        <div className='flex flex-col'>
                            <span className='text-3xl font-bold py-2'>{item.data.title}</span>
                            <div className='flex gap-3 text-slate-100 text-lg font-bold '>
                                {item.tags.map((tag,index)=>(
                                    <span key={index} className="rounded-full bg-slate-700 w-fit group relative items-center justify-center px-4 hover:opacity-90">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <span className='m1-auto flex items-center gap-2 text-xl font-medium md:m1-0'>{viewMoreText} <MdArrowOutward/></span>
                    </Link>
                </li>)}</>))}
            </ul>
        </div>
    )
}