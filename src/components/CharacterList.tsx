import { SPACE_KEY } from '@/constants/keys';
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

        const isInputMatching = inputChar === char;
        const isInputMismatching = !isInputMatching && inputChar !== null;

        const displayChar = inputChar ?? char;
        const isSpaceChar = displayChar === ' ';

        return (
          <div
            key={i}
            className={clsxMerge([
              'flex h-12 w-8 flex-shrink-0 items-center justify-center',
              'rounded-md border-2 border-solid',
              isSpaceChar && 'bg-gray-100 text-gray-300',
              isInputMatching && 'border-gray-400 bg-green-300 text-gray-800',
              isInputMismatching && 'border-gray-400 bg-red-200 text-gray-800',
              isSpaceChar &&
                inputChar !== null &&
                'border-gray-400 text-gray-400',
            ])}
          >
            <span>{isSpaceChar ? SPACE_KEY : displayChar}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterList;
