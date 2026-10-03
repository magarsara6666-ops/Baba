'use client';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {generalFAQs} from '@/lib/content';
export function FAQAccordion({items=generalFAQs}:{items?:string[][]}){return <Accordion type="single" collapsible className="faq-list">{items.map(([q,a],i)=><AccordionItem key={q} value={String(i)}><AccordionTrigger className="faq-question">{q}</AccordionTrigger><AccordionContent className="faq-answer">{a}</AccordionContent></AccordionItem>)}</Accordion>}
