import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Image from 'next/image';

/**
 * Props for `CaseStudy`.
 */
export type CaseStudyProps = SliceComponentProps<Content.CaseStudySlice>;

/**
 * Component for "CaseStudy" Slices.
 */
const CaseStudy = ({ slice }: CaseStudyProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}

      className=""
    >
      <div className="border border-slate-700"></div>
      <div className="mt-10 relative w-full md:h-[690px] h-[50vw] max-h-[690px]">
        <Image
          src="/images/mbp-16.png"
          alt="macbook mockup"
          layout="fill"
          objectFit="cover"
          className="z-10"
        />
        <div className="absolute top-[2%] left-[10%] w-[80%] h-[90%] z-0">
          <PrismicNextImage
            field={slice.primary.image}
            className="w-full h-full object-cover items-center"
            imgixParams={{ w: 600 }}
          />
        </div>
      </div>
    </section>
  );
};


export default CaseStudy;
