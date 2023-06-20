import { useMemo } from 'react';
import { PromptData } from './usePrompter';

// Generate prompt words
function usePromptWords(promptData: PromptData) {
  return useMemo(() => {
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
}

export default usePromptWords;
