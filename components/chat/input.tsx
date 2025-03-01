"use client";
import { Input } from "@/components/ui/input";
import { PromptSuggestions } from "./promptSuggestions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ChatFooter from "@/components/chat/footer";

interface ChatInputProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  isLoading: boolean;
  // Add a direct message submission prop
  sendMessage?: (message: string) => void;
}

export default function ChatInput({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  // Provide a default implementation if not provided
  sendMessage = undefined,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });
  
  // Handle suggestion clicks by directly sending the message
  const handleSuggestionClick = (suggestion: string) => {
    // If we have a direct sendMessage function, use it
    if (sendMessage) {
      sendMessage(suggestion);
      setShowSuggestions(false);
      return;
    }
    
    // Otherwise fall back to updating the input and submitting the form
    // First update the input field value
    const inputEvent = {
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(inputEvent);
    
    // Give a slight delay for the state to update
    setTimeout(() => {
      // Create a custom form event
      const customEvent = {
        preventDefault: () => {},
        currentTarget: {
          reset: () => {},
        },
      } as unknown as React.FormEvent<HTMLFormElement>;
      
      // Call the handleSubmit function with our custom event
      handleSubmit(customEvent);
    }, 50);
    
    setShowSuggestions(false);
  };
  
  return (
    <>
      <div className="z-10 flex flex-col justify-center items-center fixed bottom-0 w-full p-5 bg-white shadow-[0_-10px_15px_-2px_rgba(255,255,255,1)] text-base">
        <div className="max-w-screen-lg w-full">
          {/* Show suggestions above the input if they're visible */}
          {showSuggestions && input.trim() === "" && (
            <div className="mb-3 w-full">
              <PromptSuggestions onSuggestionClick={handleSuggestionClick} />
            </div>
          )}
          
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className={`flex-0 flex w-full p-1 border rounded-full shadow-sm ${
                isFocused ? "ring-2 ring-ring ring-offset-2" : ""
              }`}
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (e.target.value.trim() === "") {
                            setShowSuggestions(true);
                          }
                        }}
                        value={input}
                        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        onFocus={() => {
                          setIsFocused(true);
                          if (input.trim() === "") {
                            setShowSuggestions(true);
                          }
                        }}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Type your message here..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                disabled={input.trim() === "" || isLoading}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </form>
          </Form>
        </div>
        <ChatFooter />
      </div>
    </>
  );
}
