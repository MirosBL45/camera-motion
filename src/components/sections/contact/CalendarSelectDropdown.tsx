"use client";

import type { ChangeEvent } from "react";
import type { DropdownProps } from "react-day-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Izbor meseca i godine u kalendaru kroz Radix Select (u stilu sajta), umesto native
// `<select>` čiju otvorenu listu crta browser.
export function CalendarSelectDropdown({
  options,
  value,
  onChange,
  disabled,
  "aria-label": ariaLabel,
}: DropdownProps) {
  const handleValueChange = (next: string) => {
    // DayPicker iz change event-a native select-a čita samo `target.value`
    onChange?.({ target: { value: next } } as ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Select value={String(value)} onValueChange={handleValueChange} disabled={disabled}>
      <SelectTrigger
        aria-label={ariaLabel}
        className="gap-1 border-border bg-surface px-2.5 font-heading text-[0.9375rem] font-medium hover:border-accent-gold data-[size=default]:h-9 pointer-coarse:data-[size=default]:h-11"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-64">
        {options?.map((option) => (
          <SelectItem
            key={option.value}
            value={String(option.value)}
            disabled={option.disabled}
            className="min-h-9 text-base pointer-coarse:min-h-11"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
