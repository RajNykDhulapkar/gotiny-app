import React from "react";
import { LinkIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface LinkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const LinkInput = React.forwardRef<HTMLInputElement, LinkInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex items-center w-full">
        <div className="relative flex-grow">
          <div className="absolute z-[4] inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LinkIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="url"
            className={cn(
              "backdrop-blur-[1px] flex h-12 w-full rounded-l-md border border-input bg-transparent pl-10 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            placeholder="Enter the link here"
            ref={ref}
            {...props}
          />
        </div>
        <button
          type="submit"
          className="h-12 bg-blue-600 hover:bg-blue-700 text-white text- font-medium px-4 rounded-r-md transition duration-300 ease-in-out hover:cursor-pointer"
        >
          Shorten Now!
        </button>
      </div>
    );
  }
);

LinkInput.displayName = "LinkInput";

export default LinkInput;
