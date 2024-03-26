"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `SkillsList`.
 */
export type SkillsListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "SkillsList" Slices.
 */
const SkillsList = ({ slice }: SkillsListProps): JSX.Element => {
  const component = useRef(null);
  
  useEffect(()=>{
    
    let ctx = gsap.context(()=>{
        const tl = gsap.timeline({
          scrollTrigger:  {
            trigger: component.current,
            start:"top bottom",
            end: "bottom top",
            scrub: 5,
          },
        });

        tl.fromTo(
          ".skill-row",{
            x:(index)=>{
              return index  %2 ===0 ? gsap.utils.random(600,400) : gsap.utils.random(-600,-400);
            }
          },{
            x:(index)=>{
              return index  %2 ===0 ? gsap.utils.random(-600,-400) : gsap.utils.random(600,400);
            }, ease:"power1.inOut",
          }
        )
        
    });
}
);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref ={component}
    >
      <Bounded as="div">
     <Heading size="md" className="mb-5" as="h2">
      {slice.primary.heading}
     </Heading></Bounded>
     {slice.items.map(({skill_colour,skill_name}, index)=>(
      <div key={index} className="skill-row mb-8 flex items-center justify-center gap-4 text-slate-400" aria-label={skill_name || undefined}>
        {Array.from({length:15 }, (_, index)=>(
          <React.Fragment key={index}>
            <span className="skill-item text-7xl font-extrabold uppercase tracking-tighter"
            style ={{
              color: index === 7 && skill_colour ? skill_colour :"inherit"
            }}>{skill_name}</span>
            <span className="text-3xl">
              <MdCircle/>
            </span>

          </React.Fragment>
        ))}
      </div>
     ))}
    </section>
  );
};

export default SkillsList;
