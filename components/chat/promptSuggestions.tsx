import React from 'react';

// Define the types for our props
interface PromptSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

// MBA-specific prompt suggestions
const MBA_PROMPT_SUGGESTIONS = [
  "Which MBA programs are best for consulting careers?",
  "How can I strengthen my MBA application?",
  "What GMAT score do I need for top business schools?",
  "Help me choose between part-time and full-time MBA",
  "Which schools offer the best entrepreneurship programs?",
  "How can I write a standout MBA essay?",
  "Recommend MBA programs based on my profile",
  "Tips for MBA interviews",
  "How important are recommendation letters?",
  "Compare Harvard, Stanford, and Wharton MBA programs"
];

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ 
  onSuggestionClick 
}) => {
  return (
    <div className="w-full py-4">
      <p className="text-sm text-gray-500 mb-2">Try asking about:</p>
      <div className="flex flex-wrap gap-2">
        {MBA_PROMPT_SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
