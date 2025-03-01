import { Button } from "@/components/ui/button";
import { Trash2Icon, BarChart3, ChartBar } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";
import Link from "next/link";
import { useState } from "react";

export const AILogo = () => (
  <div className="w-12 h-12 relative">
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5"></div>
  </div>
);

// Define the tools available in the application
const mbaTools = [
  {
    name: "School Comparison",
    href: "/tools/school-comparison",
    icon: <ChartBar className="h-4 w-4" />,
    description: "Compare MBA programs side-by-side"
  },
  {
    name: "Profile Strength",
    href: "/tools/profile-strength",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "Assess your application strength"
  }
];

export default function ChatHeader({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  const [showTools, setShowTools] = useState(false);

  return (
    <div className="z-10 flex flex-col justify-center items-center fixed top-0 w-full bg-white shadow-[0_10px_15px_-3px_rgba(255,255,255,1)]">
      {/* Main header row */}
      <div className="flex w-full p-5">
        <div className="flex-0 w-[100px]">
          <Button
            onClick={() => setShowTools(!showTools)}
            className="gap-2 shadow-sm"
            variant="ghost"
            size="sm"
          >
            Tools
          </Button>
        </div>
        <div className="flex-1 flex justify-center items-center gap-2">
          <AILogo />
          <p>{CHAT_HEADER}</p>
        </div>
        <div className="flex-0 w-[100px] flex justify-end items-center">
          <Button
            onClick={clearMessages}
            className="gap-2 shadow-sm"
            variant="outline"
            size="sm"
          >
            <Trash2Icon className="w-4 h-4" />
            <span>{CLEAR_BUTTON_TEXT}</span>
          </Button>
        </div>
      </div>
      
      {/* Tools dropdown/menu - conditionally rendered */}
      {showTools && (
        <div className="w-full border-t border-gray-100 py-2 px-4 flex justify-center">
          <div className="flex gap-4">
            {mbaTools.map((tool) => (
              <Link 
                key={tool.name} 
                href={tool.href}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {tool.icon}
                <div>
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}import { Button } from "@/components/ui/button";
import { Trash2Icon, BarChart3, ChartBar } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";
import Link from "next/link";
import { useState } from "react";

export const AILogo = () => (
  <div className="w-12 h-12 relative">
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5"></div>
  </div>
);

// Define the tools available in the application
const mbaTools = [
  {
    name: "School Comparison",
    href: "/tools/school-comparison",
    icon: <ChartBar className="h-4 w-4" />,
    description: "Compare MBA programs side-by-side"
  },
  {
    name: "Profile Strength",
    href: "/tools/profile-strength",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "Assess your application strength"
  }
];

export default function ChatHeader({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  const [showTools, setShowTools] = useState(false);

  return (
    <div className="z-10 flex flex-col justify-center items-center fixed top-0 w-full bg-white shadow-[0_10px_15px_-3px_rgba(255,255,255,1)]">
      {/* Main header row */}
      <div className="flex w-full p-5">
        <div className="flex-0 w-[100px]">
          <Button
            onClick={() => setShowTools(!showTools)}
            className="gap-2 shadow-sm"
            variant="ghost"
            size="sm"
          >
            Tools
          </Button>
        </div>
        <div className="flex-1 flex justify-center items-center gap-2">
          <AILogo />
          <p>{CHAT_HEADER}</p>
        </div>
        <div className="flex-0 w-[100px] flex justify-end items-center">
          <Button
            onClick={clearMessages}
            className="gap-2 shadow-sm"
            variant="outline"
            size="sm"
          >
            <Trash2Icon className="w-4 h-4" />
            <span>{CLEAR_BUTTON_TEXT}</span>
          </Button>
        </div>
      </div>
      
      {/* Tools dropdown/menu - conditionally rendered */}
      {showTools && (
        <div className="w-full border-t border-gray-100 py-2 px-4 flex justify-center">
          <div className="flex gap-4">
            {mbaTools.map((tool) => (
              <Link 
                key={tool.name} 
                href={tool.href}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {tool.icon}
                <div>
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
