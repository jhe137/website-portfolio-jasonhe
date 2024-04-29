'use client';
import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
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

      tl.fromTo(".avatar-parallax", {
        yPercent: -10,

      }, { yPercent: 0 })


    }, component)
    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <Heading as="h1" size="lg" className=" pb-10 ">
        {slice.primary.heading}
      </Heading>
      <div className="border my-10 border-b-slate-700"></div>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[1fr,2fr] pt-10">

        <div className="prose md:prose-md prose-slate">
          <div className="flex items-center h-full  align-center px-10">
            <PrismicRichText field={slice.primary.description} /></div>
        </div>
        <div className="overflow-hidden h-5/6 ">
          <Avatar image={slice.primary.avatar} className="avatar-parallax" /></div>
      </div>
    </Bounded>
  );
};

export default Biography;
