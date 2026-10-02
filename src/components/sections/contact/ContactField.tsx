import { Label } from "@/components/ui/label";

// Polja forme po dizajnu (artboard `1c`): topla pozadina, bordura iz palete, 16px tekst.
export const FIELD_CONTROL_CLASSES =
  "h-13 w-full rounded-lg border-border bg-background px-3.5 text-base text-foreground md:text-base hover:border-accent-gold aria-invalid:hover:border-destructive";

export const fieldErrorId = (id: string) => `${id}-error`;

interface IContactFieldProps {
  id: string;
  label: string;
  required?: boolean;
  /** Prevedena poruka greške; kontrola mora da nosi `aria-describedby={fieldErrorId(id)}`. */
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function ContactField({
  id,
  label,
  required = false,
  error,
  className,
  children,
}: IContactFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1.75 gap-0.5 text-[0.9375rem] leading-snug font-semibold">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-muted-foreground">
            *
          </span>
        ) : null}
      </Label>
      {children}
      <p id={fieldErrorId(id)} className="mt-1.5 text-sm text-destructive empty:hidden">
        {error}
      </p>
    </div>
  );
}
