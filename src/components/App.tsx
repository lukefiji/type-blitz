import usePrompter from '@/hooks/usePrompter';
import { useEffect, useRef } from 'react';
import CharacterList from './CharacterList';
import Stats from './Stats';
import { Input } from './ui/input';

function App() {
  const { promptData, userInput, numErrors, handleKeyDown } = usePrompter(
    'The quick brown fox jumps over the lazy dog.'
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <main className="flex min-h-screen w-full font-sans">
      <div className="mx-auto mt-6 flex flex-col content-center gap-8">
        <h1
          role="heading"
          className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Type Blitz
        </h1>

        <CharacterList promptData={promptData} userInput={userInput} />

        <Stats numErrors={numErrors} />

        <Input
          type="text"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          value={userInput.join('')}
          onChange={() => null}
          placeholder="Begin typing here"
        />
      </div>
    </main>
  );
}

export default App;
