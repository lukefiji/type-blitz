import { ENTER_DISPLAY_KEY, SPACE_DISPLAY_KEY } from '@/constants/keys';
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
    const isSpaceChar = displayChar === ' ';
    const isEnterChar = displayChar === ENTER_DISPLAY_KEY;
    const isSpecialChar = isSpaceChar || isEnterChar;
    const isCurrentChar = userInput.length === charData.index;

    return (
      <span
        ref={isCurrentChar ? ref : null}
        className={cn([
          'relative',
          'font-mono text-3xl font-light leading-snug  lg:text-4xl lg:leading-snug',
          isInputMatching && 'bg-green-200 text-gray-800',
          isInputMismatching && 'bg-red-200 text-gray-800',
          isSpecialChar && 'text-gray-300',
          isSpecialChar && inputChar !== null && 'text-gray-500',
        ])}
      >
        {isSpaceChar
          ? SPACE_DISPLAY_KEY
          : isEnterChar
          ? ENTER_DISPLAY_KEY
          : displayChar}
      </span>
    );
  }
);

export default Character;
