import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from '../index';

export const Navigable = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <button>Accordion Panel 1</button>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <button>Accordion Panel 2</button>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <button>Accordion Panel 3</button>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

Navigable.args = {
  navigable: true,
} as AccordionProps;

Navigable.parameters = {
  docs: {
    description: {
      story: 'An accordion supports keyboard navigation.',
    },
  },
};
