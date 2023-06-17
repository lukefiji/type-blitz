import usePrompter from '@/hooks/usePrompter';
import CharacterList from './CharacterList';

function App() {
  const { promptData, userInput, numErrors, handleKeyDown } = usePrompter(
    'The quick brown fox jumps over the lazy dog.'
  );

  return (
    <div className="flex min-h-screen w-full">
      <div className="mx-auto mt-6 flex flex-col content-center gap-2">
        <h1 role="heading" className="text-center text-2xl font-bold">
          Type Blitz
        </h1>

        <CharacterList promptData={promptData} userInput={userInput} />

        <div>Errors: {numErrors}</div>

        <input
          type="text"
          onKeyDown={handleKeyDown}
          value={userInput.join('')}
          onChange={() => null}
          className="border-b-2 border-solid border-black"
        />
      </div>
    </div>
  );
}

export default App;
