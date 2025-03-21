import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Dropdown<T>({ options, optionsDisplayMap = undefined, input, setInput, width }: {
  options: T[];
  optionsDisplayMap?: Map<T, string> | undefined;
  input: T;
  setInput: (input: T) => void;
  width: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-tertiary-background hover:bg-quaternary-background active:bg-quaternary-background font-normal">
        <Button className="flex flex-row justify-between">
          {input as string}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-tertiary-background text-primary-text p-2">
        <DropdownMenuRadioGroup
          value={input as string}
          onValueChange={(value: string) => setInput(value as T)}
          className={`${width} border-none flex flex-col gap-1`}
        >
          {options.map((option: T) => {
            return <DropdownMenuRadioItem
              key={option as string}
              value={option as string}
              className={`${option === input ? "bg-quaternary-background" : ""} focus:bg-quaternary-background active:bg-quaternary-background`}
            >
              {optionsDisplayMap?.get(option) ?? option as string}
            </DropdownMenuRadioItem>
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
