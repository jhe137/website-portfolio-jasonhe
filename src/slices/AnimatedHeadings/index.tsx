"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";


/**
 * Props for `AnimatedHeadings`.
 */
export type AnimatedHeadingsProps =
  SliceComponentProps<Content.AnimatedHeadingsSlice>;

/**
 * Component for "AnimatedHeadings" Slices.
 */
const AnimatedHeadings = ({ slice }: AnimatedHeadingsProps): JSX.Element => {

  const component = useRef(null)
  useEffect(()=>{
    
    let ctx = gsap.context(()=>{
        
        const tl = gsap.timeline({
          scrollTrigger:  {
            trigger: component.current,
            start:"top bottom",
            end: "bottom top",
            scrub: 1,
            markers: false,
          },
        });

        tl.fromTo(
          ".skill-animation",{
                        
            clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
          },{
            
            color: "rgb(51,65,85)",
            
            ease:"none",
            clipPath: "polygon(0 0, 110% 0, 110% 100%, 0 100%)",
            stagger:{
              each: 0.05,
              ease: "power4.inOut",
  
            }
          }
        )
        
    }, component)
    return() => ctx.revert();
}, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      
      className="bg-stone-100"
      ref = {component}
    >
     
      <Heading as="h2" size="xs" className="col-start-1 uppercase text-slate-600 tracking-widest text-center mb-5">
          {slice.primary.heading}
        </Heading>
       
      
              {slice.items.map(({skill_name,skill_inverted}, index)=>(
      <div key={index} 
      className="border-b border-slate-900 flex  group items-center justify-center" 
      aria-label={skill_name || undefined}>
                 <span className="relative text-7xl md:text-9xl font-extrabold uppercase tracking-tighter  text-slate-400 ">{skill_name}</span>
               
          <span className="absolute skill-animation text-7xl md:text-9xl font-extrabold uppercase tracking-tighter text-slate-800">{skill_name}</span>
          
          <div key={index} className="flex absolute bg-slate-700 w-full clip-path-initial items-center justify-center group-hover:clip-path-full " aria-label={skill_inverted|| undefined}>
          <span className="text-7xl md:text-9xl font-extrabold uppercase tracking-tighter  text-slate-200 ">{skill_inverted}</span>
                        </div>                 
      </div>
     ))}



        
    </Bounded>
  );
};

export default AnimatedHeadings;
