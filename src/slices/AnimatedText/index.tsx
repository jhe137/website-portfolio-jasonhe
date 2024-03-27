"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, KeyTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `AnimatedText`.
 */
export type AnimatedTextProps = SliceComponentProps<Content.AnimatedTextSlice>;

/**
 * Component for "AnimatedText" Slices.
 */
const AnimatedText = ({ slice }: AnimatedTextProps): JSX.Element => {
  
  const component = useRef(null)
  useEffect(()=>{
    
    let ctx = gsap.context(()=>{
        
        const tl = gsap.timeline({
          scrollTrigger:  {
            trigger: component.current,
            start:"top center",
            end: "bottom top",
            scrub: 1,
            markers: true,
          },
        });

        tl.fromTo(
          ".text-animation",{
            opacity:1,
            color: "rgb(148 163 184)",
          },{
            
            color: "rgb(51,65,85)",
            opacity:1, 
            ease:"none",
            stagger: 1, 
          }
        )
        
    }, component)
    return() => ctx.revert();
}, []);

const renderLetters = (name: KeyTextField, key: string) => {
  if (!name) return;
  return name.split("").map((letter, index) => {
    // Check if the current letter is a space
    if (letter === " ") {
      // Render the space directly or wrap it in a span for additional styling
      return <span key={index}>&nbsp;</span>;
    }
    return (
      <span key={index} className={`text-animation text-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    );
  });
};

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref = {component}
    >
      
      <Heading as="h2" size="xs" className="col-start-1 uppercase text-slate-600 tracking-widest my-5">
          {slice.primary.heading}
        </Heading>
        <div className="text-animation col-start-1 text-7xl font-bold text-slate-600">
          <span className=" block">{renderLetters(slice.primary.description, "description")}</span>
        </div>
        
    </Bounded>
  );
};

export default AnimatedText;
