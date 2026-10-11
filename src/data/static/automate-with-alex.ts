import type { Service, Timeline } from '../models/contact-message';

export const desktopNavigation = ['Services', 'For agencies', 'How it works', 'Engineers', 'Pricing', 'FAQ'];

export const mobileNavigation = [...desktopNavigation, 'Contact'];

export const homeSections = [
  'top',
  'problems',
  'services',
  'agencies',
  'how-it-works',
  'engineers',
  'testblocks',
  'pricing',
  'about',
  'faq',
  'contact',
  'training',
];

export const services: { value: Service; label: string }[] = [
  { value: 'embedded-engineer', label: 'Embedded QA engineer' },
  { value: 'project-delivery', label: 'Project delivery' },
  { value: 'white-label', label: 'White-label QA for an agency' },
  { value: 'training', label: 'Team training' },
  { value: 'other', label: 'Not sure yet' },
];

export const timelines: Timeline[] = ['asap', 'this-month', '1-3-months', 'flexible'];

export const serviceCtas: { cta: RegExp; service: Service }[] = [
  { cta: /ask about team training/i, service: 'training' },
  { cta: /discuss white-label qa/i, service: 'white-label' },
];

export const calendlyUrl = 'https://calendly.com/automatewithalex/discovery-call';
