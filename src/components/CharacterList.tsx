import { SPACE_KEY } from '@/constants/keys';
import { PromptData, UserInput } from '@/hooks/usePrompter';
import cn from '@/utils/cn';
import { useMemo } from 'react';

interface Props {
  promptData: PromptData;
  userInput: UserInput;
}

const CharacterList = ({ promptData, userInput }: Props) => {
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

  console.log({ promptWords });

  return (
    <div className="flex max-w-xl flex-wrap justify-center">
      {promptWords.map((wordData, i) => {
        return (
          <span key={i} className="flex">
            {wordData.map((charData) => {
              const inputChar = userInput[charData.index] || null;
              const isInputMatching = inputChar === charData.char;
              const isInputMismatching = !isInputMatching && inputChar !== null;

              const displayChar = inputChar ?? charData.char;
              const isSpaceChar = displayChar === ' ';
              const isCurrentChar = userInput.length === charData.index;

              return (
                <span
                  key={charData.index}
                  className={cn([
                    'relative',
                    'font-mono text-3xl font-light leading-snug  lg:text-4xl lg:leading-snug',
                    isSpaceChar && 'text-gray-200',
                    isInputMatching && 'bg-green-200 text-gray-800',
                    isInputMismatching && 'bg-red-200 text-gray-800',
                    isSpaceChar && inputChar !== null && 'text-gray-300',
                  ])}
                >
                  {isCurrentChar && (
                    <div className="absolute inset-y-0 -left-0.5 my-1 w-0.5 bg-gray-800 opacity-60"></div>
                  )}
                  {isSpaceChar ? SPACE_KEY : displayChar}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default CharacterList;
