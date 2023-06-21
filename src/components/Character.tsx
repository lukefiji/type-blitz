import { RETURN_DISPLAY_KEY, SPACE_DISPLAY_KEY } from '@/constants/keys';
import { CharData, UserInput } from '@/hooks/usePrompter';
import cn from '@/utils/cn';
import { forwardRef } from 'react';

interface Props {
  userInput: UserInput;
  charData: CharData;
}

const Character = forwardRef<HTMLSpanElement, Props>(
  ({ charData, userInput }, ref) => {
    const inputChar = userInput[charData.index] || null;
    const isInputMatching = inputChar === charData.char;
    const isInputMismatching = !isInputMatching && inputChar !== null;

    const displayChar = inputChar ?? charData.char;
    const isCurrentChar = userInput.length === charData.index;

    const isSpaceChar = displayChar === ' ';
    const isReturnChar = displayChar === RETURN_DISPLAY_KEY;
    const isSpecialChar = isSpaceChar || isReturnChar;

    return (
      <span
        ref={isCurrentChar ? ref : null}
        className={cn([
          'relative',
          'font-mono text-2xl font-light leading-snug lg:text-3xl lg:leading-snug',
          'text-gray-800 dark:text-gray-200',
          isInputMatching && 'bg-green-200 dark:bg-green-700 ',
          isInputMismatching && 'bg-red-200 dark:bg-red-700 ',
          isSpecialChar && 'text-gray-300 dark:text-gray-700',
          isSpecialChar &&
            inputChar !== null &&
            'text-gray-500 dark:text-gray-400',
        ])}
      >
        {isSpaceChar ? SPACE_DISPLAY_KEY : displayChar}
      </span>
    );
  }
);

export default Character;
