import usePrompter from '@/hooks/usePrompter';
import { useEffect, useRef } from 'react';
import PromptDisplay from './PromptDisplay';
import Stats from './Stats';
import { Input } from './ui/input';

const SAMPLE_PROMPT = `The quick brown fox jumps over the lazy dog. The lazy brown dog jumped over the quick fox.

The lazy brown dog jumped over the quick fox. The quick brown fox jumps over the lazy dog.`;

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const { sentenceData, userInput, numErrors, handleKeyDown } =
    usePrompter(SAMPLE_PROMPT);

  return (
    <main className="flex min-h-screen w-full font-sans">
      <div className="mx-auto mt-6 flex flex-col content-center gap-8">
        <h1
          role="heading"
          className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Type Blitz
        </h1>

        <PromptDisplay sentenceData={sentenceData} userInput={userInput} />

        <Stats numErrors={numErrors} />

        <Input
          type="text"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          value={userInput.join('').replace('↵', ' ')}
          onChange={() => null}
          placeholder="Begin typing here"
        />
      </div>
    </main>
  );
}

export default App;
