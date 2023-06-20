import Character from '@/components/Character';
import useCursor from '@/hooks/useCursor';
import { PromptData, UserInput } from '@/hooks/usePrompter';
import cn from '@/utils/cn';
import { useMemo } from 'react';

interface Props {
  promptData: PromptData;
  userInput: UserInput;
}

const CharacterList = ({ promptData, userInput }: Props) => {
  const { characterRef, cursorRef, cursorPosition } = useCursor(userInput);

  const promptWords = useMemo(() => {
    const wordData = [];

    let currentWord = [];
    for (const charData of promptData) {
      currentWord.push(charData);

      if (charData.char === ' ') {
        wordData.push(currentWord);
        currentWord = [];
      }
    }

    if (currentWord.length > 0) {
      wordData.push(currentWord);
    }

    return wordData;
  }, [promptData]);

  return (
    <div className="flex max-w-xl flex-wrap justify-center">
      <div
        ref={cursorRef}
        className={cn([
          'absolute left-0 top-0 z-10 w-0.5 bg-gray-800 opacity-60',
          'duration-75 ease-out',
        ])}
        style={{
          display: cursorPosition.display,
          height: cursorPosition.height,
          transform: `translate3d(${cursorPosition.left}px, ${cursorPosition.top}px, 0px)`,
        }}
        aria-hidden="true"
      />
      {promptWords.map((wordData, i) => {
        return (
          <span key={i} className="flex">
            {wordData.map((charData) => (
              <Character
                key={charData.index}
                charData={charData}
                userInput={userInput}
                ref={characterRef}
              />
            ))}
          </span>
        );
      })}
    </div>
  );
};

export default CharacterList;
