export type Service = 'embedded-engineer' | 'project-delivery' | 'white-label' | 'training' | 'other';

export type Timeline = 'asap' | 'this-month' | '1-3-months' | 'flexible';

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  service?: Service;
  timeline?: Timeline;
  message: string;
  website?: string;
}
