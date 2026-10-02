"use client";

import { useState } from "react";
import { enGB } from "react-day-picker/locale/en-GB";
import { srLatn } from "react-day-picker/locale/sr-Latn";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "cn";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatShortDate, toIsoDate } from "@/lib/date";
import { INTL_LOCALE_MAP } from "@/lib/types/i18n";

import { CalendarSelectDropdown } from "./CalendarSelectDropdown";
import { FIELD_CONTROL_CLASSES, fieldErrorId } from "./ContactField";

const DAY_PICKER_LOCALES = { sr: srLatn, en: enGB } as const;

/** Koliko godina unapred može da se izabere datum (venčanja se zakazuju i dve godine ranije). */
const YEARS_AHEAD = 3;

interface IContactDatePickerProps {
  id: string;
  value?: Date;
  onChange: (date?: Date) => void;
  invalid: boolean;
}

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Sopstveni kalendar umesto native `type="date"`, čiji prozor crta browser i ne može da se
// stilizuje. Vrednost ide u formu kroz skriveno polje `date` kao `YYYY-MM-DD`.
export function ContactDatePicker({ id, value, onChange, invalid }: IContactDatePickerProps) {
  const t = useTranslations("contact.form.fields.date");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [today] = useState(startOfToday);
  const valueId = `${id}-value`;

  const handleChange = (date?: Date) => {
    onChange(date);
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* Labela daje ime dugmetu; izabrani datum i greška se čitaju kao opis (`aria-invalid` ne važi za dugme) */}
          <button
            type="button"
            id={id}
            data-invalid={invalid || undefined}
            aria-describedby={`${valueId} ${fieldErrorId(id)}`}
            className={cn(
              FIELD_CONTROL_CLASSES,
              "flex items-center justify-between gap-2 border text-left transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 data-invalid:hover:border-destructive",
              !value && "text-muted-foreground"
            )}
          >
            <span id={valueId}>{value ? formatShortDate(value, locale) : t("placeholder")}</span>
            <CalendarDays aria-hidden="true" className="size-4.5 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto gap-3 p-3">
          <Calendar
            mode="single"
            required
            selected={value}
            onSelect={handleChange}
            defaultMonth={value ?? today}
            startMonth={today}
            endMonth={new Date(today.getFullYear() + YEARS_AHEAD, 11)}
            disabled={{ before: today }}
            captionLayout="dropdown"
            locale={DAY_PICKER_LOCALES[locale]}
            formatters={{
              formatMonthDropdown: (month) =>
                month.toLocaleString(INTL_LOCALE_MAP[locale], { month: "long" }),
            }}
            components={{ Dropdown: CalendarSelectDropdown }}
            autoFocus
            className="p-0 [--cell-size:--spacing(10)]"
          />
          {value ? (
            <Button
              type="button"
              variant="goldOutline"
              onClick={() => handleChange(undefined)}
              className="h-auto min-h-11 font-heading text-[0.9375rem]"
            >
              {t("clear")}
            </Button>
          ) : null}
        </PopoverContent>
      </Popover>
      <input type="hidden" name="date" value={value ? toIsoDate(value) : ""} />
    </>
  );
}
