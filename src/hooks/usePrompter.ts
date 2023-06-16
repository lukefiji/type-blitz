import { VALID_KEYS } from '@/constants/keys';
import { KeyboardEvent, useCallback, useState } from 'react';

export type Prompt = Array<string>;
export type UserInput = Array<string>;

function usePrompter(message: string): {
  prompt: Prompt;
  userInput: UserInput;
  numErrors: number;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
} {
  const [userInput, setUserInput] = useState<UserInput>([]);
  const [numErrors, setNumErrors] = useState<number>(0);
  const prompt: Prompt = message.split('');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      if (!VALID_KEYS.has(key)) return;

      if (key === 'Backspace') {
        if (userInput.length === 0) return;
        setUserInput((input) => input.slice(0, input.length - 1));
      } else {
        if (prompt[userInput.length] !== key) {
          setNumErrors((val) => (val += 1));
        }

        setUserInput((input) => [...input, key]);
      }
    },

    [userInput, prompt]
  );

  return { prompt, userInput, numErrors, handleKeyDown };
}

export default usePrompter;
