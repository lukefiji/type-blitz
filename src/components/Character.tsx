import { SPACE_KEY } from '@/constants/keys';
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
    const isCurrentChar = userInput.length === charData.index;

    return (
      <span
        ref={isCurrentChar ? ref : null}
        className={cn([
          'relative',
          'font-mono text-3xl font-light leading-snug  lg:text-4xl lg:leading-snug',
          isSpaceChar && 'text-gray-200',
          isInputMatching && 'bg-green-200 text-gray-800',
          isInputMismatching && 'bg-red-200 text-gray-800',
          isSpaceChar && inputChar !== null && 'text-gray-300',
        ])}
      >
        {/* {isCurrentChar && (
          <div
            className="absolute inset-y-0 -left-0.5 my-1 w-0.5 bg-gray-800 opacity-60"
            aria-hidden="true"
          />
        )} */}
        {isSpaceChar ? SPACE_KEY : displayChar}
      </span>
    );
  }
);

export default Character;
