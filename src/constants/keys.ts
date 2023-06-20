/**
 * Source: KeyboardEvent.key
 * https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
 */
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const lowerAlphaKeys = alphabet.split('');
const upperAlphaKeys = alphabet.toUpperCase().split('');
const numericKeys = '0123456789'.split('');
const punctuationKeys = '~`!@#$%^&*()-=_+,.<>/?;:\'"[]{}\\|'.split('');
const otherKeys = ['Backspace', 'Enter', ' '];

export const VALID_KEYS: Set<KeyboardEvent['key']> = new Set([
  ...lowerAlphaKeys,
  ...upperAlphaKeys,
  ...numericKeys,
  ...punctuationKeys,
  ...otherKeys,
]);

export const SPACE_DISPLAY_KEY = '␣';
export const ENTER_DISPLAY_KEY = '↵';
