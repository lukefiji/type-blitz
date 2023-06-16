interface Props {}
import { Prompt, UserInput } from '@/hooks/usePrompter';
import clsxMerge from '@/utils/clsxMerge';

interface Props {
  prompt: Prompt;
  userInput: UserInput;
}

const CharacterList = ({ prompt, userInput }: Props) => {
  return (
    <div className="flex max-w-lg flex-wrap justify-center gap-1">
      {prompt.map((char, i) => {
        const inputChar = i in userInput ? userInput[i] : null;
        const isSpaceChar = char === ' ';
        const isInputMatching = inputChar === char;
        const isInputMismatching = inputChar !== null && !isInputMatching;

        return (
          <div
            key={i}
            className={clsxMerge([
              'flex h-12 w-8 flex-shrink-0 items-center justify-center',
              'rounded-md border-2 border-solid',
              isSpaceChar && 'bg-gray-100 text-gray-300',
              isInputMatching && 'bg-green-300',
              isInputMismatching && 'bg-red-200',
            ])}
          >
            <span>{isSpaceChar ? '_' : char}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterList;
