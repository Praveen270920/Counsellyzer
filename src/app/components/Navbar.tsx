"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white hover:shadow-lg shadow-md py-8 px-32 w-screen flex items-center justify-between fixed">
      <div className="text-xl font-bold">Counsellyzer</div>
      <div className="hidden md:flex gap-4">
        <Button variant="ghost">Help</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Language</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Tamil</DropdownMenuItem>
            <DropdownMenuItem>Hindi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden">
        <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
    </nav>
  );
}
