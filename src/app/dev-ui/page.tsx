import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const PALETTE = [
  { label: "background", hex: "#FAF8F4", swatch: "bg-background border border-border" },
  { label: "surface", hex: "#FFFFFF", swatch: "bg-surface border border-border" },
  { label: "surface-warm", hex: "#F1EBDF", swatch: "bg-surface-warm" },
  { label: "foreground", hex: "#26241F", swatch: "bg-foreground" },
  { label: "muted-foreground", hex: "#6E685C", swatch: "bg-muted-foreground" },
  { label: "accent-gold", hex: "#A9873F", swatch: "bg-accent-gold" },
  { label: "accent-gold-soft", hex: "#E5D9BC", swatch: "bg-accent-gold-soft" },
  { label: "primary", hex: "#1E3B2A", swatch: "bg-primary" },
  { label: "primary-hover", hex: "#16301F", swatch: "bg-primary-hover" },
  { label: "border", hex: "#E6E0D3", swatch: "bg-border" },
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-border pb-10">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// Dev-only stranica sa dizajn tokenima i UI primitivima — briše se u featureu 21.
export default function DevUiPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 p-8">
      <h1>/dev-ui — dizajn sistem</h1>

      <Section title="Paleta">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {PALETTE.map((color) => (
            <div key={color.label} className="flex flex-col gap-2">
              <div className={`h-16 rounded-md ${color.swatch}`} />
              <p className="text-sm">
                {color.label}
                <br />
                <span className="text-muted-foreground">{color.hex}</span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografija">
        <div className="flex flex-col gap-3">
          <h1>H1 naslov — Šampinjoni, žeđ, čačkalica</h1>
          <h2>H2 naslov — đurđevak i ćevapčići</h2>
          <h3>H3 naslov — ovčar i planinar</h3>
          <h4>H4 naslov — čokolada i džem</h4>
          <p>
            Body tekst (Source Sans 3) — snimanje dronom i kamerom iz Beograda, za venčanja,
            nekretnine i eventе: š đ č ć ž.
          </p>
        </div>
      </Section>

      <Section title="Dugmad">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default disabled</Button>
          <Button variant="outline" disabled>
            Outline disabled
          </Button>
        </div>
      </Section>

      <Section title="Polja forme">
        <div className="grid max-w-md gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="dev-input">Input</Label>
            <Input id="dev-input" placeholder="Ime i prezime" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dev-input-disabled">Input (disabled)</Label>
            <Input id="dev-input-disabled" placeholder="Onemogućeno polje" disabled />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dev-textarea">Textarea</Label>
            <Textarea id="dev-textarea" placeholder="Poruka" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dev-select">Select</Label>
            <Select>
              <SelectTrigger id="dev-select" className="w-full">
                <SelectValue placeholder="Izaberite uslugu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vencanje">Venčanje</SelectItem>
                <SelectItem value="nekretnine">Nekretnine</SelectItem>
                <SelectItem value="event">Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="dev-checkbox" />
            <Label htmlFor="dev-checkbox">Neoznačeno</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="dev-checkbox-checked" defaultChecked />
            <Label htmlFor="dev-checkbox-checked">Označeno</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="dev-checkbox-disabled" disabled />
            <Label htmlFor="dev-checkbox-disabled">Onemogućeno</Label>
          </div>
        </div>
      </Section>

      <Section title="Kartica">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Naziv paketa</CardTitle>
            <CardDescription>Kratak opis paketa iz dizajn reference.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sadržaj kartice — shadow-card u mirnom stanju, shadow-card-hover na hover.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Zatražite ponudu</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Dropdown, Sheet, Dialog">
        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Usluge</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Usluge</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Snimanje venčanja</DropdownMenuItem>
              <DropdownMenuItem>Nekretnine i apartmani</DropdownMenuItem>
              <DropdownMenuItem>FPV snimci</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Otvori Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Meni</SheetTitle>
                <SheetDescription>Primer Sheet komponente za mobilnu navigaciju.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Otvori Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Potvrda</DialogTitle>
                <DialogDescription>Primer Dialog komponente sa shadow-raised.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>Potvrdi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>
    </main>
  );
}
