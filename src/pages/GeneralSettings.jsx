import React, { useState } from "react";
import { Edit, Filter, Search } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ResuableTable } from "@/components";

// make it dynamic, use context api + react router dom
const breadCrumbItems = [
  { label: "Settings", href: "#" },
  { label: "General Settings", href: "/general-settings" },
];

const tabs = [
  {
    value: "event-group-type",
    label: "Event Group Type",
  },
  {
    value: "event-group-rating",
    label: "Event Group Rating",
  },
  {
    value: "age-group",
    label: "Age Group",
  },
  {
    value: "match-category",
    label: "Match Category",
  },
  {
    value: "organization-type",
    label: "Organization Type",
  },
  {
    value: "main-position",
    label: "Main Position",
  },
];

const organizationColumns = [
  {
    accessorKey: "code",
    header: "Code",
    className: "w-[120px]",
  },
  {
    accessorKey: "name",
    header: "Organization Type",
  },
];

const organizationActions = [
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    onClick: (row) => console.log("Edit", row.id),
    variant: "ghost",
  },
];

const ScrollableTabs = React.forwardRef(
  ({ tabs, defaultValue, className, onValueChange }, ref) => {
    return (
      <Tabs
        defaultValue={defaultValue}
        className={className}
        onValueChange={onValueChange}
        ref={ref}
      >
        {/* Mobile: Horizontally scrollable */}
        <div className="md:hidden overflow-x-auto pb-2 hide-scrollbar">
          <TabsList className="flex w-max space-x-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-4 py-2 text-sm font-medium"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Desktop: Normally visible */}
        <div className="hidden md:block">
          <TabsList className="flex space-x-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-4 py-2 text-sm font-medium"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    );
  }
);

const SearchWithFilter = ({
  className,
  placeholder = "Search...",
  searchValue,
  onSearchChange,
  onFilterClick,
  filterActive,
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          type="Search"
          placeholder={placeholder}
          className="pl-10 pr-2 py-2"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Button
        variant={filterActive ? "default" : "secondary"}
        size="icon"
        onClick={onFilterClick}
        aria-label="Filter"
      >
        <Filter className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
};

const GeneralSettings = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  // table local state
  const [data, setData] = useState([
    { id: "1", code: "EDU", name: "Educational Institution" },
    // ... more data
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  return (
    <section>
      <header>
        <h1 className="h1">General Settings</h1>
        {/* Potential improvement: make it custom component for reusability */}
        <Breadcrumb className="mt-2 subtitle-2">
          <BreadcrumbList>
            {breadCrumbItems.map((item, index) => (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4">
        <ScrollableTabs
          tabs={tabs}
          defaultValue="organization-type"
          className="mb-6"
        />

        <div className="flex items-center justify-between flex-wrap">
          <Button>Add Organization Type</Button>

          <SearchWithFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onFilterClick={""}
            filterActive={filterActive}
            className="max-w-2xl"
          />
        </div>

        <div className="mt-[32px]">
          <ResuableTable
            data={data}
            columns={organizationColumns}
            actions={organizationActions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default GeneralSettings;
