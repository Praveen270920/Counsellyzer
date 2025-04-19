"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white hover:shadow-lg shadow-md w-full flex items-center justify-center fixed">
      <div className="flex items-center gap-6">
        <img className="w-20" src="logo.png" alt="Logo" />
        <div>
         <div className="font-semibold text-blue-500 mb-2">தமிழ்நாடு இன்ஜினியரிங் கல்லூரி சேர்க்கைகள் - தகுதி மதிப்பெண்கள் மற்றும் தரவரிசைகள்</div>
         <div className="font-semibold text-blue-500">TNEA CutOffs and Ranks</div>
        </div>
      </div>
      <div className="hidden md:flex gap-4 text-gray-800">
      <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Home</Button>
      <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Compare</Button>
      <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Saved</Button>
        <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Help</Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer hover:text-blue-500 cursor-not-allowed" variant="ghost">Language</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Tamil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Hindi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="md:hidden">
        <Button className="cursor-pointer" variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
    </nav>
  );
}
