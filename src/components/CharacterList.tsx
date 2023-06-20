import Character from '@/components/Character';
import Cursor from '@/components/ui/Cursor';
import useCursor from '@/hooks/useCursor';
import usePromptWords from '@/hooks/usePromptWords';
import { PromptData, UserInput } from '@/hooks/usePrompter';

interface Props {
  promptData: PromptData;
  userInput: UserInput;
}

const CharacterList = ({ promptData, userInput }: Props) => {
  const promptWords = usePromptWords(promptData);
  const { characterRef, cursorRef } = useCursor(userInput);

  return (
    <div className="flex max-w-xl flex-wrap justify-center">
      <Cursor ref={cursorRef} />

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
