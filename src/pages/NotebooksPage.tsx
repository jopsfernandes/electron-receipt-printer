import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RestaurantOrderDialog from "@/components/ui/restaurant-order-dialog"

export default function NotebooksPage() {
    return (
        <div className="flex h-screen flex-col  items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">Crie uma comanda 👇</h1>
            <RestaurantOrderDialog></RestaurantOrderDialog>
        </div>

        
    );
}
