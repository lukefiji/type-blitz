import { useMemo } from 'react';
import { CharData, SentenceData } from './usePrompter';

// Generate prompt words
function usePromptSentences(sentenceData: SentenceData): Array<CharData[][]> {
  return useMemo(() => {
    const sentences: Array<Array<Array<CharData>>> = [];

    let currentSentence: Array<Array<CharData>> = [];
    for (const sentence of sentenceData) {
      const characters: CharData[][] = [];

      let currentWord = [];
      for (const charData of sentence) {
        currentWord.push(charData);

        if (charData.char === ' ') {
          characters.push(currentWord);
          currentWord = [];
        }
      }

      if (currentWord.length > 0) {
        characters.push(currentWord);
      }

      sentences.push(characters);
      currentSentence = [];
    }

    if (currentSentence.length > 0) {
      sentences.push(currentSentence);
    }

    return sentences;
  }, [sentenceData]);
}

export default usePromptSentences;
