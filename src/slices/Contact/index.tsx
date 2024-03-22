"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import ContactForm from "@/components/ContactForm";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Shapes from "@/components/Shapes";
/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className=" grid gap-4 min-h-[70vh] grid-cols-1 md:grid-cols-2 item-center">
       <div className="">
       <Heading as="h3" size="md" className="py-10">
          {slice.primary.heading}
        </Heading>
      <ContactForm />
      </div>
      <Shapes/>
      </div>
      
    </Bounded>
    
    
  );
};



export default Contact;
