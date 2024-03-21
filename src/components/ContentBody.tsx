

import { PrismicImage, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";
import { Content } from "@prismicio/client";



export default function ContentBody({page}: {
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
 

  return (<Bounded as="article">
    <div className="rounded-2xl border-2 border-slate-700 bg-slate-100 px-4 py-10 md:px-8 md:py-20">
    <Heading as ="h1">{page.data.title}</Heading>
    
    <div className='flex gap-3 text-slate-100 text-lg font-bold '>
                                {page.tags.map((tag)=>(
                                    <span key={tag} className="rounded-full bg-slate-700 w-fit group relative items-center justify-center px-4 hover:opacity-90">{tag}</span>
                                ))}
                            </div>
    
    <p className="mt-8 border-b border-slate-700 md:text-xl font-medium text-slate-700">{page.data.date}</p>
    
    <div className="prose md:prose-lg mt-12 w-full max-w-none md:mt-20"><SliceZone slices={page.data.slices} components={components} />
    </div>
    <PrismicImage field ={page.data.image} imgixParams={{w: 600}}/>
    </div>
    </Bounded>);
}



