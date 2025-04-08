"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-50 z-10 hover:shadow-lg shadow-md py-8 px-32 w-full flex items-center justify-between fixed">
      <div className="text-xl font-bold text-gray-800">TNEA CutOffs and Ranks</div>
      <div className="hidden md:flex gap-4 text-gray-800">
        <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Help</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Language</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Tamil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Hindi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden">
        <Button className="cursor-pointer" variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
    </nav>
  );
}
