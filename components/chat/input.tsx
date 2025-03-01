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
}

export default function ChatInput({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });
  
  // Handle suggestion clicks by simulating an input change event
  const handleSuggestionClick = (suggestion: string) => {
    const event = {
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(event);
    setShowSuggestions(false); // Hide suggestions after one is selected
  };
  
  return (
    <>
      <div className="z-10 flex flex-col justify-center items-center fixed bottom-0 w-full p-5 bg-white shadow-[0_-10px_15px_-2px_rgba(255,255,255,1)] text-base">
        <div className="max-w-screen-lg w-full">
          {/* Show suggestions above the input if they're visible */}
          {showSuggestions && input.trim() === "" && (
            <div className="mb-3">
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
