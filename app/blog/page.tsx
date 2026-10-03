import {PageHero,CTASection} from '@/components/shared';
import {BlogBrowser} from '@/components/blog-browser';
import {seo} from '@/lib/seo';
export const metadata=seo('Health Information & Patient Resources','Explore educational articles about vein and bowel concerns, treatment questions and preparing for a consultation.','/blog');
export default function Blog(){return <><PageHero title="Health Information & Patient Resources" text="Understand your options. Prepare your questions. Take an informed next step." eyebrow="KNOWLEDGE FOR YOUR CARE JOURNEY"/><section className="section container"><BlogBrowser/><p className="care-note">Articles provide general information and do not replace individual medical advice. Draft clinic resources published 03 October 2026; clinical review is required before public launch.</p></section><CTASection/></>}
