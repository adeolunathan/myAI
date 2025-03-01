"use client";

import React from 'react';

// Define the types for our props
interface PromptSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

// MBA-specific prompt suggestions - focused on common queries
const MBA_PROMPT_SUGGESTIONS = [
  "Recommend MBA programs for me",
  "How to write a standout essay?",
  "Tips for MBA interviews",
  "Best schools for consulting",
  "Compare MBA programs",
  "Application timeline help"
];

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ 
  onSuggestionClick 
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {MBA_PROMPT_SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-sm px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
