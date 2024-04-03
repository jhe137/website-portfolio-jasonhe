'use client';
import { Content, KeyTextField } from "@prismicio/client";

import { SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import BackgroundImage from "@/components/BackgroundImage";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import Burger from "@/components/Burger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `AlternateHero`.
 */
export type AlternateHeroProps =
  SliceComponentProps<Content.AlternateHeroSlice>;

/**
 * Component for "AlternateHero" Slices.
 */
const AlternateHero = ({ slice }: AlternateHeroProps): JSX.Element => {

  const component = useRef(null)
  useEffect(() => {

    let ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "bottom bottom",
          end: "bottom 20%",
          scrub: 1,
          markers: false,
        },
      });

      gsap.fromTo(".text-animation, .name-animation", {
        y: 500,


      }, {
        y: 0,
        duration: 2,
        ease: "power1.inOut",
        stagger: 0.1,

      })
      tl.fromTo(
        ".text-animation", {
        x: (index) => {
          return index % 2 === 0 ? -0 : 0;
        },
      }, {
        x: (index) => {
          return index % 2 === 0 ? 5 : -10;
        },
        ease: "power1.inOut",
        scale: 1,

        duration: 1,

      },
      )



    }, component)
    return () => ctx.revert();
  }, []);

  // const renderLetters = (name: KeyTextField, key: string) => {
  //   if (!name) return;
  //   return name.split("").map((letter, index) => {
  //     // Check if the current letter is a space
  //     if (letter === " ") {
  //       // Render the space directly or wrap it in a span for additional styling
  //       return <span key={index}>&nbsp;</span>;
  //     }
  //     return (
  //       <span key={index} className={`text-animation text-animation-${key} inline-block  mb-4`}>
  //         {letter}
  //       </span>
  //     );
  //   });
  // };
  return (

    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""

      ref={component}

    >


      <div className="pb-10 ">
        <h1 className="overflow-hidden"><span className="name-animation block text-xl font-bold  text-slate-600 tracking-wide text-center md:pt-0 md:pb-1">
          {slice.primary.full_name}
        </span></h1>

        <div className="flex-col justify-center ">
          {slice.items.map(({ text }, index) => (


            <h1 key={index} className="overflow-hidden">
              <span className={`pb-4 block text-8xl lowercase text-center font-bold tracking-tighter leading-[0.93em] text-animation ${index === 1 || index === 4 ? 'text-slate-400' : 'text-slate-600'}`}>{text}
              </span></h1>

          ))}


        </div>
      </div>

    </section >
  );
};

export default AlternateHero;
