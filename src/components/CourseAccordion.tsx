
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface CourseSection {
  id: string;
  title: string;
  lessons: number;
  duration: string;
  content?: string[];
}

interface CourseAccordionProps {
  sections: CourseSection[];
}

const CourseAccordion: React.FC<CourseAccordionProps> = ({ sections }) => {
  return (
    <Accordion type="single" collapsible className="w-full border-0">
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id} className="border-b">
          <AccordionTrigger className="py-4 px-4 hover:no-underline">
            <div className="flex items-center w-full">
              <div className="flex-1 text-right">
                <div className="font-bold">{section.title}</div>
                <div className="text-sm text-gray-500">{section.lessons} جلسه - {section.duration}</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-4">
            {section.content ? (
              <ul className="space-y-2">
                {section.content.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="ml-2 text-luko-teal">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">محتوای این بخش در حال تکمیل است...</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseAccordion;
