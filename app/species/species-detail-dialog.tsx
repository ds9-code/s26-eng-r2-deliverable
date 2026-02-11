"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesDetailDialog({ species }: { species: Species }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.scientific_name}</DialogTitle>
        </DialogHeader>

        {species.image && (
          <div className="relative my-2 h-48 w-full">
            <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
          </div>
        )}

        <div className="grid gap-2">
          <div>
            <strong>Common name:</strong> {species.common_name ?? "—"}
          </div>
          <div>
            <strong>Kingdom:</strong> {species.kingdom}
          </div>
          <div>
            <strong>Total population:</strong> {species.total_population ?? "—"}
          </div>
          <div>
            <strong>Description:</strong>
            <p className="whitespace-pre-wrap">{species.description ?? "No description provided."}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
