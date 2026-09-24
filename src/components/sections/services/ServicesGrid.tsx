import { cn } from "cn";

import type { ServiceIdType } from "@/types/services.type";

import { SERVICES } from "@/data/services";

import { ServiceOverviewCard } from "./ServiceOverviewCard";

// FPV je istaknuta usluga (overview 11) — kartica ide preko celog reda, zlatno obeležena.
const FEATURED_SERVICE: ServiceIdType = "fpv";

export function ServicesGrid() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
      {SERVICES.map((service) => {
        const featured = service.id === FEATURED_SERVICE;

        return (
          <li key={service.id} className={cn(featured && "md:col-span-2")}>
            <ServiceOverviewCard service={service} wide={featured} featured={featured} />
          </li>
        );
      })}
    </ul>
  );
}
