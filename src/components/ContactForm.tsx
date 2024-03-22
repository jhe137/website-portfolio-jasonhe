// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Button from './Button';
import clsx from 'clsx';
import Heading from './Heading';
function ContactForm() {
  const [state, handleSubmit] = useForm("xleqwoag");
  if (state.succeeded) {
    
      return <Heading as="h3" size ="lg">Thanks for reaching out!</Heading>;
  }
  return (
      <form onSubmit={handleSubmit}>
        <div className='flex gap-4 flex-col justify-center rounded-2xl border-2 border-slate-700 bg-slate-100 px-4 py-10 md:px-8 md:py-10 max-w-sm'>
        <label htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        type="name" 
        name="name"
        className='px-4 py-3 rounded-xl'
      />
      <label htmlFor="email">
        Email Address:
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className='px-4 py-3 rounded-xl'
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">Message:</label>
      <textarea 
        id="message"
        name="message"
        rows={5}
        className='px-4 py-5 resize-none rounded-xl'/>
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className={clsx("group relative text-slate-200 flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-700 px-4 py-2 font-bold transition-transform ease-out hover:scale-105 ", )}>
        Submit
      </button>
      </div>
    </form>
  );
}
function App() {
  return (
    <ContactForm />
  );
}
export default App;