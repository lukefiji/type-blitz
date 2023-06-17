import { SPACE_KEY } from '@/constants/keys';
import { PromptData, UserInput } from '@/hooks/usePrompter';
import clsxMerge from '@/utils/clsxMerge';
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
    <div className="flex max-w-xl flex-wrap justify-center gap-1">
      {promptWords.map((wordData, i) => {
        return (
          <span key={i} className="flex gap-1">
            {wordData.map((charData) => {
              const inputChar = userInput[charData.index] || null;
              const isInputMatching = inputChar === charData.char;
              const isInputMismatching = !isInputMatching && inputChar !== null;

              const displayChar = inputChar ?? charData.char;
              const isSpaceChar = displayChar === ' ';

              return (
                <span
                  key={charData.index}
                  className={clsxMerge([
                    'flex h-12 w-8 flex-shrink-0 items-center justify-center',
                    'rounded-md border-2 border-solid',
                    isSpaceChar && 'bg-gray-100 text-gray-300',
                    isInputMatching &&
                      'border-gray-400 bg-green-300 text-gray-800',
                    isInputMismatching &&
                      'border-gray-400 bg-red-200 text-gray-800',
                    isSpaceChar &&
                      inputChar !== null &&
                      'border-gray-400 text-gray-400',
                  ])}
                >
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
