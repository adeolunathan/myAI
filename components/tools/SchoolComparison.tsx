"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckIcon, 
  FilterIcon, 
  PlusCircleIcon, 
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// School type definition
interface School {
  id: string;
  name: string;
  location: string;
  country: string;
  ranking: number;
  rankingSource: string;
  acceptanceRate: number;
  avgGMAT: number;
  avgGPA: number;
  avgWorkExp: number;
  tuition: number;
  programLength: number; // in months
  specializations: string[];
  employmentRate: number;
  avgSalary: number;
  internationalStudents: number; // percentage
  scholarshipAvailability: 'High' | 'Medium' | 'Low';
  campus: 'Urban' | 'Suburban' | 'Rural';
}

// Sample data - in a real app, this would come from an API
const sampleSchools: School[] = [
  {
    id: "1",
    name: "Harvard Business School",
    location: "Boston, MA",
    country: "USA",
    ranking: 1,
    rankingSource: "Financial Times 2023",
    acceptanceRate: 11,
    avgGMAT: 730,
    avgGPA: 3.7,
    avgWorkExp: 4.7,
    tuition: 78000,
    programLength: 24,
    specializations: ["General Management", "Finance", "Entrepreneurship", "Leadership"],
    employmentRate: 96,
    avgSalary: 175000,
    internationalStudents: 37,
    scholarshipAvailability: "Medium",
    campus: "Urban"
  },
  {
    id: "2",
    name: "Stanford Graduate School of Business",
    location: "Stanford, CA",
    country: "USA",
    ranking: 2,
    rankingSource: "Financial Times 2023",
    acceptanceRate: 6,
    avgGMAT: 738,
    avgGPA: 3.8,
    avgWorkExp: 4.8,
    tuition: 80000,
    programLength: 24,
    specializations: ["Entrepreneurship", "Social Innovation", "Technology", "General Management"],
    employmentRate: 94,
    avgSalary: 180000,
    internationalStudents: 42,
    scholarshipAvailability: "Medium",
    campus: "Suburban"
  },
  {
    id: "3",
    name: "INSEAD",
    location: "Fontainebleau",
    country: "France",
    ranking: 3,
    rankingSource: "Financial Times 2023",
    acceptanceRate: 18,
    avgGMAT: 710,
    avgGPA: 3.6,
    avgWorkExp: 5.5,
    tuition: 95000,
    programLength: 10,
    specializations: ["International Business", "Consulting", "Finance", "Entrepreneurship"],
    employmentRate: 92,
    avgSalary: 160000,
    internationalStudents: 95,
    scholarshipAvailability: "Medium",
    campus: "Suburban"
  },
  {
    id: "4",
    name: "London Business School",
    location: "London",
    country: "UK",
    ranking: 4,
    rankingSource: "Financial Times 2023",
    acceptanceRate: 15,
    avgGMAT: 706,
    avgGPA: 3.6,
    avgWorkExp: 5.5,
    tuition: 97000,
    programLength: 21,
    specializations: ["Finance", "Marketing", "Strategy", "Global Business"],
    employmentRate: 93,
    avgSalary: 156000,
    internationalStudents: 89,
    scholarshipAvailability: "Medium",
    campus: "Urban"
  },
  {
    id: "5",
    name: "Wharton School",
    location: "Philadelphia, PA",
    country: "USA",
    ranking: 5,
    rankingSource: "Financial Times 2023",
    acceptanceRate: 20,
    avgGMAT: 722,
    avgGPA: 3.6,
    avgWorkExp: 5,
    tuition: 82000,
    programLength: 21,
    specializations: ["Finance", "Entrepreneurship", "Marketing", "Real Estate"],
    employmentRate: 95,
    avgSalary: 170000,
    internationalStudents: 33,
    scholarshipAvailability: "Medium",
    campus: "Urban"
  }
];

// Filter interface
interface SchoolFilters {
  location: string;
  rankingMax: number;
  programLength: string;
  specializationFilter: string[];
  tuitionMax: number;
}

// School Selector Component
const SchoolSelector: React.FC<{
  schools: School[];
  onSchoolSelect: (school: School) => void;
  selectedSchools: School[];
}> = ({ schools, onSchoolSelect, selectedSchools }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSchools.some(s => s.id === school.id)
  );
  
  return (
    <div className="w-full">
      <div className="flex mb-3">
        <Input
          placeholder="Search for schools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="max-h-60 overflow-y-auto border rounded-md">
        {filteredSchools.length > 0 ? (
          filteredSchools.map(school => (
            <div 
              key={school.id} 
              className="p-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
              onClick={() => onSchoolSelect(school)}
            >
              <div>
                <div className="font-medium">{school.name}</div>
                <div className="text-sm text-gray-500">{school.location}, {school.country}</div>
              </div>
              <PlusCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No schools found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

// School Filter Component
const SchoolFilter: React.FC<{
  onFilterChange: (filters: SchoolFilters) => void;
  currentFilters: SchoolFilters;
}> = ({ onFilterChange, currentFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SchoolFilters>(currentFilters);
  
  const specializations = [
    "Finance", "Marketing", "Entrepreneurship", "Consulting", 
    "Technology", "General Management", "Leadership", "Strategy", 
    "International Business", "Social Innovation"
  ];
  
  const handleChange = (field: keyof SchoolFilters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };
  
  const toggleSpecialization = (spec: string) => {
    if (localFilters.specializationFilter.includes(spec)) {
      handleChange('specializationFilter', 
        localFilters.specializationFilter.filter(s => s !== spec)
      );
    } else {
      handleChange('specializationFilter', 
        [...localFilters.specializationFilter, spec]
      );
    }
  };
  
  const applyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    const defaultFilters: SchoolFilters = {
      location: '',
      rankingMax: 100,
      programLength: 'any',
      specializationFilter: [],
      tuitionMax: 150000
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <FilterIcon className="h-4 w-4" />
          Filters
          {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
        </Button>
        
        <div className="flex flex-wrap gap-2">
          {currentFilters.location && (
            <Badge variant="outline" className="flex items-center gap-1">
              Location: {currentFilters.location}
            </Badge>
          )}
          {currentFilters.rankingMax < 100 && (
            <Badge variant="outline" className="flex items-center gap-1">
              Ranking: ≤{currentFilters.rankingMax}
            </Badge>
          )}
          {currentFilters.programLength !== 'any' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Program: {currentFilters.programLength}
            </Badge>
          )}
          {currentFilters.specializationFilter.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              Specializations: {currentFilters.specializationFilter.length}
            </Badge>
          )}
        </div>
      </div>
      
      {isOpen && (
        <Card className="mt-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Select
                  value={localFilters.location}
                  onValueChange={(value) => handleChange('location', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any location</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Program Length</label>
                <Select
                  value={localFilters.programLength}
                  onValueChange={(value) => handleChange('programLength', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any duration</SelectItem>
                    <SelectItem value="1-year">1-year</SelectItem>
                    <SelectItem value="2-year">2-year</SelectItem>
                    <SelectItem value="accelerated">Accelerated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Ranking (≤{localFilters.rankingMax})
                </label>
                <Input
                  type="range"
                  min="1"
                  max="100"
                  value={localFilters.rankingMax}
                  onChange={(e) => handleChange('rankingMax', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Max Tuition (${localFilters.tuitionMax.toLocaleString()})
                </label>
                <Input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={localFilters.tuitionMax}
                  onChange={(e) => handleChange('tuitionMax', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Specializations</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specializations.map(spec => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`spec-${spec}`}
                      checked={localFilters.specializationFilter.includes(spec)}
                      onCheckedChange={() => toggleSpecialization(spec)}
                    />
                    <label 
                      htmlFor={`spec-${spec}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {spec}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetFilters}>Reset</Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

// Comparison Table Component
const ComparisonTable: React.FC<{
  schools: School[];
  onRemoveSchool: (schoolId: string) => void;
}> = ({ schools, onRemoveSchool }) => {
  if (schools.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-gray-50">
        <p className="text-gray-500">
          Select schools to compare using the filters and school selector above.
        </p>
      </div>
    );
  }
  
  // Categories for comparison
  const categories = [
    { name: "Basics", fields: ["ranking", "location", "country", "campus"] },
    { name: "Admissions", fields: ["acceptanceRate", "avgGMAT", "avgGPA", "avgWorkExp"] },
    { name: "Program", fields: ["programLength", "tuition", "specializations"] },
    { name: "Outcomes", fields: ["employmentRate", "avgSalary", "internationalStudents", "scholarshipAvailability"] }
  ];
  
  // Formatter for different types of data
  const formatValue = (school: School, field: keyof School) => {
    const value = school[field];
    switch (field) {
      case "ranking":
        return `#${value} (${school.rankingSource})`;
      case "acceptanceRate":
        return `${value}%`;
      case "avgGMAT":
      case "avgGPA":
        return value;
      case "avgWorkExp":
        return `${value} years`;
      case "tuition":
        return `$${(value as number).toLocaleString()}`;
      case "programLength":
        return `${value} months`;
      case "specializations":
        return (value as string[]).join(", ");
      case "employmentRate":
        return `${value}%`;
      case "avgSalary":
        return `$${(value as number).toLocaleString()}`;
      case "internationalStudents":
        return `${value}%`;
      default:
        return value;
    }
  };
  
  // Field labels for human-readable display
  const fieldLabels: Record<string, string> = {
    ranking: "Ranking",
    location: "Location",
    country: "Country",
    campus: "Campus Setting",
    acceptanceRate: "Acceptance Rate",
    avgGMAT: "Average GMAT",
    avgGPA: "Average GPA",
    avgWorkExp: "Average Work Experience",
    programLength: "Program Length",
    tuition: "Annual Tuition",
    specializations: "Key Specializations",
    employmentRate: "Employment Rate",
    avgSalary: "Average Starting Salary",
    internationalStudents: "International Students",
    scholarshipAvailability: "Scholarship Availability"
  };
  
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left font-semibold w-[180px]">School</th>
            {schools.map(school => (
              <th key={school.id} className="p-3 text-center font-medium min-w-[200px]">
                <div className="flex justify-between items-center">
                  <div className="flex-1 text-center">{school.name}</div>
                  <button 
                    onClick={() => onRemoveSchool(school.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <React.Fragment key={category.name}>
              <tr className="bg-gray-100">
                <td colSpan={schools.length + 1} className="p-2 font-medium text-sm">
                  {category.name}
                </td>
              </tr>
              {category.fields.map(field => (
                <tr key={field} className="border-t">
                  <td className="p-3 text-gray-600">{fieldLabels[field]}</td>
                  {schools.map(school => (
                    <td key={`${school.id}-${field}`} className="p-3 text-center">
                      {formatValue(school, field as keyof School)}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main School Comparison Component
const SchoolComparison: React.FC = () => {
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [allSchools, setAllSchools] = useState<School[]>(sampleSchools);
  const [showSelector, setShowSelector] = useState(false);
  const [filters, setFilters] = useState<SchoolFilters>({
    location: '',
    rankingMax: 100,
    programLength: 'any',
    specializationFilter: [],
    tuitionMax: 150000
  });
  
  // Filter schools based on criteria
  const filteredSchools = allSchools.filter(school => {
    if (filters.location && school.country !== filters.location) return false;
    if (school.ranking > filters.rankingMax) return false;
    if (filters.programLength !== 'any') {
      if (filters.programLength === '1-year' && school.programLength > 12) return false;
      if (filters.programLength === '2-year' && (school.programLength < 18 || school.programLength > 24)) return false;
      if (filters.programLength === 'accelerated' && school.programLength >= 18) return false;
    }
    if (filters.specializationFilter.length > 0 && 
        !filters.specializationFilter.some(spec => 
          school.specializations.includes(spec)
        )) {
      return false;
    }
    if (school.tuition > filters.tuitionMax) return false;
    return true;
  });
  
  const handleSchoolSelect = (school: School) => {
    if (selectedSchools.length < 3) {
      setSelectedSchools([...selectedSchools, school]);
    }
    setShowSelector(false);
  };
  
  const handleRemoveSchool = (schoolId: string) => {
    setSelectedSchools(selectedSchools.filter(school => school.id !== schoolId));
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">MBA Program Comparison</h2>
        <p className="text-gray-600 mb-4">
          Compare business schools side-by-side to find your perfect MBA match.
          Filter programs based on your preferences and add up to 3 schools to compare.
        </p>
        
        <SchoolFilter 
          onFilterChange={setFilters}
          currentFilters={filters}
        />
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Selected Schools ({selectedSchools.length}/3)</h3>
            {selectedSchools.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedSchools([])}
              >
                Clear All
              </Button>
            )}
          </div>
          
          <Dialog open={showSelector} onOpenChange={setShowSelector}>
            <DialogTrigger asChild>
              <Button 
                disabled={selectedSchools.length >= 3}
                className="flex items-center gap-2"
              >
                <PlusCircleIcon className="h-4 w-4" />
                Add School
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a School to Compare</DialogTitle>
                <DialogDescription>
                  Search and select from available business schools based on your filters.
                </DialogDescription>
              </DialogHeader>
              <SchoolSelector 
                schools={filteredSchools}
                onSchoolSelect={handleSchoolSelect}
                selectedSchools={selectedSchools}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <ComparisonTable 
        schools={selectedSchools}
        onRemoveSchool={handleRemoveSchool}
      />
      
      {selectedSchools.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>Data shown is for illustrative purposes based on publicly available information.</p>
          <p>Always verify the latest information on school websites.</p>
        </div>
      )}
    </div>
  );
};

export default SchoolComparison;
