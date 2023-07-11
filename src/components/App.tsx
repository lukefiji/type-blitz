import { SAMPLE_PROMPTS } from '@/constants/prompts';
import usePrompter from '@/hooks/usePrompter';
import useStats from '@/hooks/useStats';
import random from 'lodash/random';
import { useCallback, useEffect, useRef } from 'react';
import PromptDisplay from './PromptDisplay';
import Stats from './Stats';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import { Input } from './ui/input';

const prompt = SAMPLE_PROMPTS[random(0, SAMPLE_PROMPTS.length - 1)];

function App() {
  // Focus input element on page load
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const { sentenceData, userInput, numErrors, handleKeyDown, resetPrompter } =
    usePrompter(prompt);

  const { wordsPerMinute, accuracy, resetTimer } = useStats({
    userInput,
    numErrors,
  });

  const handleReset = useCallback(() => {
    resetPrompter();
    resetTimer();
  }, [resetPrompter, resetTimer]);

  return (
    <main className="flex min-h-screen w-full px-4 font-sans">
      <div className="mx-auto mt-6 flex flex-col content-center gap-8">
        <ThemeToggle />

        <h1
          role="heading"
          className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Type Blitz
        </h1>

        <PromptDisplay sentenceData={sentenceData} userInput={userInput} />

        <Stats
          wordsPerMinute={wordsPerMinute}
          accuracy={accuracy}
          numErrors={numErrors}
        />

        <Input
          type="text"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          value={userInput.join('')}
          onChange={() => null}
          placeholder="Begin typing here"
        />

        <div className="flex justify-center gap-4">
          <Button className="basis-6/12" onClick={handleReset}>
            Reset
          </Button>
          <Button className="basis-6/12" disabled>
            New Prompt
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
