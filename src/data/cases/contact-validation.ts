import { aContactMessage } from '../builders/ContactMessageBuilder';

export const rejectedContactPayloads = [
  {
    scenario: 'missing required fields',
    payload: aContactMessage().withoutRequiredFields().build(),
    error: /name, email and your requirements are required/i,
  },
  {
    scenario: 'invalid email address',
    payload: aContactMessage().withInvalidEmail().build(),
    error: /valid email address/i,
  },
  {
    scenario: 'service outside the listed options',
    payload: { ...aContactMessage().build(), service: 'free-consulting' },
    error: /listed services/i,
  },
  {
    scenario: 'timeline outside the listed options',
    payload: { ...aContactMessage().build(), timeline: 'yesterday' },
    error: /listed timelines/i,
  },
];
