"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
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
  useEffect(() => {

    let ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom 60%",
          scrub: 1,
          markers: false,
        },
      });

      tl.fromTo(
        ".text-animation", {
        opacity: 1,
        color: "rgb(148 163 184)",
      }, {

        color: "rgb(51,65,85)",
        opacity: 1,
        ease: "none",
        stagger: 1,
      }
      )

    }, component)
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return null;

    // Split the name into words to process each word individually
    const words = name.split(" ");

    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block mr-5 last:mr-0">
        {word.split("").map((letter, letterIndex) => (
          <span key={letterIndex} className={`text-animation text-animation-${key} inline-block opacity-0 mb-4`}>
            {letter}
          </span>
        ))}
        {/* Adding a space after each word except the last one */}
        {wordIndex < words.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="bg-stone-200"
    >

      <Heading as="h2" size="xs" className="col-start-1  text-slate-600 tracking-[0.3em] md:pt-20 mb-10">
        {slice.primary.heading}
      </Heading>
      <div className="text-animation col-start-1 lg:text-7xl font-black tracking-tighter text-slate-600 md:pb-36 text-4xl">
        <span className=" block">{renderLetters(slice.primary.description, "description")}</span>
      </div>

    </Bounded>
  );
};

export default AnimatedText;
