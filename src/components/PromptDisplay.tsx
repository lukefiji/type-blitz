import Character from '@/components/Character';
import Cursor from '@/components/ui/Cursor';
import useCursor from '@/hooks/useCursor';
import usePromptSentences from '@/hooks/usePromptSentences';
import { SentenceData, UserInput } from '@/hooks/usePrompter';

interface Props {
  sentenceData: SentenceData;
  userInput: UserInput;
}

const PromptDisplay = ({ sentenceData, userInput }: Props) => {
  const promptSentences = usePromptSentences(sentenceData);
  const { characterRef, cursorRef } = useCursor(userInput);

  return (
    <div className="flex max-w-3xl flex-col flex-wrap justify-center">
      <Cursor ref={cursorRef} />

      {promptSentences.map((promptWords, i) => {
        return (
          <div key={i} className="mb-8 flex flex-wrap justify-center">
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
      })}
    </div>
  );
};

export default PromptDisplay;
