import { useMemo } from 'react';
import { CharData, PromptData } from './usePrompter';

// Generate prompt words
function usePromptWords(promptData: PromptData): CharData[][] {
  return useMemo(() => {
    const wordData: CharData[][] = [];

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
}

export default usePromptWords;
