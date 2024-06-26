'use client';
import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "@/components/Shapes";
import Button from "@/components/Button";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null)

    useEffect(() =>{
      let ctx = gsap.context(() =>{
        const tl = gsap.timeline()
        tl.fromTo(".name-animation", {
          x:-100, 
          opacity:0, 
          rotate:-10,
        },
          {
          x:0,
          opacity:1, 
          rotate:0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger:{
            each: 0.1,
            from: "random",

          }
        });
        tl.fromTo(".job-title", {
          y:20,
          opacity:0,
          scale: 1,
          },
          {
          y:0,
          opacity:1,
          duration:0.5,
          scale:1,
          ease: "poweri.out",          
          });
          tl.fromTo(".cta-button", {
            y:20,
            opacity:0,
            scale: 1,
            },
            {
            y:0,
            opacity:1,
            duration:0.5,
            scale:1,
            ease: "poweri.out",          
            })
          

      }, component)
      return() => ctx.revert();
    }, []);

  const renderLetters = (name: KeyTextField, key: string) =>{
    if (!name) return;
    return name.split("").map((letter, index)=>(<span key ={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>{letter}</span>))
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref = {component}
    >
      <div className = "grid min-h-[70vh] grid-cols-1 md:grid-cols-2 item-center">
        <Shapes/>
        <div className = "col-start-1 md:row-start-1">
       <h1 className = "mb-8 select-none text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter" aria-label={slice.primary.first_name+" "+slice.primary.last_name}>
        <span className="block text-slate-500"><>{renderLetters(slice.primary.first_name,"first")}</></span>

      <span className ="-mt-[.2em] block text-slate-700"><>{renderLetters(slice.primary.last_name, "last")}</></span>
      <span className ="job-title text-2xl font-bold tracking-[.025em] text-slate-600 bg-clip-text block md:text-4xl opacity-0"><>{slice.primary.tag_line}</></span>
      </h1>
      <Button className= "cta-button opacity-0" linkField={slice.primary.button_link} label={slice.primary.button_text}/>  
      </div>
      </div>
    </Bounded>
  );
};

export default Hero;


