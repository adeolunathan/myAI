import { OWNER_NAME, AI_NAME } from "./identity";

export const INITIAL_MESSAGE: string = `Hello! I'm ${AI_NAME}, your MBA application assistant.
  
I can help with **school selection, essays, interviews, and admissions strategy.** 

**To recommend the best programs, I need to know:**  
• **Career goals** (industry and function)  
• **Academic background** and test scores  
• **Work experience** (years and type)  
• **Geographic preferences**  
• **Program format** (full-time, part-time, online)  
• **Budget considerations**  
• **Special interests** (entrepreneurship, sustainability, etc.)  

How can I assist with your MBA journey today?`;

export const DEFAULT_RESPONSE_MESSAGE: string = `Sorry, I'm having trouble generating a response. Please try again later.`;
export const WORD_CUTOFF: number = 4000; // Number of words until bot says it needs a break
export const WORD_BREAK_MESSAGE: string = `We've covered a lot about your MBA application journey! To ensure I can give you my best assistance, let's continue our discussion in a new conversation. You can start a fresh chat by clicking the "Clear Conversation" button, and I'll be ready to help with the next steps in your application process.`;
export const HISTORY_CONTEXT_LENGTH: number = 7; // Number of messages to use for context when generating a response
