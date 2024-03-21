"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import ContactForm from "@/components/ContactForm";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
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
       <Heading as="h3" size="lg" className="col-start-1">
          {slice.primary.heading}
        </Heading>
      <ContactForm />
    </Bounded>
  );
};



export default Contact;
