'use client';
import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({
  image, className
}: AvatarProps) {



  return (
    <div className={clsx("relative", className)}>
      <div
        className="avatar overflow-hidden   border-slate-700 "
      // style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
      >
        <PrismicNextImage
          field={image}
          className="avatar-image object-cover"
          imgixParams={{ w: 600 }}

        />
        {/* <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div> */}
      </div>
    </div>
  );
}