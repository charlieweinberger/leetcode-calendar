import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Dropdown<T>({
  dataSource,
  options,
  optionsDisplayMap = undefined,
  input,
  setInput,
  width,
}: {
  dataSource: DataSourceType;
  options: T[];
  optionsDisplayMap?: Map<T, string> | undefined;
  input: T;
  setInput: (input: T) => void;
  width: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={`bg-${dataSource}-bg3 hover:bg-${dataSource}-bg4 active:bg-${dataSource}-bg-4 font-normal`}
      >
        <Button className="flex flex-row justify-between">
          {optionsDisplayMap?.get(input) ?? (input as string)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`border-none bg-${dataSource}-bg3 text-${dataSource}-t1 p-2`}
      >
        <DropdownMenuRadioGroup
          value={input as string}
          onValueChange={(value: string) => setInput(value as T)}
          className={`${width} border-none flex flex-col gap-1`}
        >
          {options.map((option: T) => {
            return (
              <DropdownMenuRadioItem
                key={option as string}
                value={option as string}
                className={`${
                  option === input ? `bg-${dataSource}-bg4` : ""
                } focus:bg-${dataSource}-bg4 active:bg-${dataSource}-bg4`}
              >
                {optionsDisplayMap?.get(option) ?? (option as string)}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
