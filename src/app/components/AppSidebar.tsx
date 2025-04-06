"use client"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Filters {
  categories: string[];
  colleges: string[];
  branches: string[];
  years: string[];
  quotas: string[];
}

export default function AppSidebar() {

  const [filters, setFilters] = useState<Filters>({
      categories: [],
      colleges: [],
      branches: [],
      years: [],
      quotas: [],
    });
  
    const handleCheckboxChange = (field: keyof Filters, value: string) => {
      setFilters((prev) => {
        const newValues = prev[field].includes(value)
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value];
        return { ...prev, [field]: newValues };
      });
    };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {["General", "OBC", "SC", "ST"].map((cat) => (
                <SidebarMenuItem key={cat} className="flex items-center gap-2">
                  <SidebarMenuButton asChild>
                    <div>
                    <Checkbox id={cat} onCheckedChange={() => handleCheckboxChange("categories", cat)} />
                    <label htmlFor={cat}>{cat}</label>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {["2024", "2023", "2022"].map((year) => (
                <SidebarMenuItem key={year} className="flex items-center gap-2">
                  <SidebarMenuButton asChild>
                    <div>
                    <Checkbox id={year} onCheckedChange={() => handleCheckboxChange("categories", year)} />
                    <label htmlFor={year}>{year}</label>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {["State Quota", "Management Quota"].map((quota) => (
                <SidebarMenuItem key={quota} className="flex items-center gap-2">
                  <SidebarMenuButton asChild>
                    <div>
                    <Checkbox id={quota} onCheckedChange={() => handleCheckboxChange("quotas", quota)} />
                    <label htmlFor={quota}>{quota}</label>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
