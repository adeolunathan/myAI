"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  ListChecks, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Briefcase, 
  PenTool,
  School,
  SaveIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Types
interface ProfileData {
  academics: {
    gpa: number;
    gpaScale: number;
    testScore: {
      type: 'GMAT' | 'GRE' | '';
      score: number;
    };
    undergraduateInstitution: string;
    undergraduateMajor: string;
    additionalDegrees: string[];
  };
  workExperience: {
    years: number;
    companies: string[];
    roles: string[];
    industry: string;
    function: string;
    leadership: number; // 1-10 scale
    international: boolean;
  };
  extracurriculars: {
    activities: string[];
    leadership: boolean;
    continuity: boolean;
    impact: number; // 1-10 scale
  };
  career: {
    goals: string;
    clarity: number; // 1-10 scale
    feasibility: number; // 1-10 scale
    fit: number; // 1-10 scale
  };
  demographics: {
    age: number;
    gender: string;
    country: string;
    underrepresented: boolean;
  };
  targetSchools: {
    tier: 'top 10' | 'top 25' | 'top 50' | 'top 100' | '';
    reach: string[];
    target: string[];
    safety: string[];
  };
}

// Strength scores by category
interface StrengthScores {
  academics: number;
  workExperience: number;
  extracurriculars: number;
  careerGoals: number;
  overall: number;
}

// Default profile data
const defaultProfile: ProfileData = {
  academics: {
    gpa: 3.5,
    gpaScale: 4.0,
    testScore: {
      type: 'GMAT',
      score: 690,
    },
    undergraduateInstitution: '',
    undergraduateMajor: '',
    additionalDegrees: [],
  },
  workExperience: {
    years: 4,
    companies: [],
    roles: [],
    industry: '',
    function: '',
    leadership: 6,
    international: false,
  },
  extracurriculars: {
    activities: [],
    leadership: false,
    continuity: false,
    impact: 5,
  },
  career: {
    goals: '',
    clarity: 5,
    feasibility: 5,
    fit: 5,
  },
  demographics: {
    age: 28,
    gender: '',
    country: '',
    underrepresented: false,
  },
  targetSchools: {
    tier: '',
    reach: [],
    target: [],
    safety: [],
  },
};

// Component for the strength indicator
const StrengthIndicator: React.FC<{
  scores: StrengthScores;
}> = ({ scores }) => {
  // Define strength level labels and thresholds
  const strengthLevels = [
    { threshold: 85, label: "Exceptional", color: "bg-green-500" },
    { threshold: 70, label: "Strong", color: "bg-green-400" },
    { threshold: 60, label: "Competitive", color: "bg-blue-500" },
    { threshold: 50, label: "Moderate", color: "bg-yellow-500" },
    { threshold: 0, label: "Needs Improvement", color: "bg-red-500" }
  ];
  
  // Get the appropriate strength level based on the overall score
  const getStrengthLevel = (score: number) => {
    return strengthLevels.find(level => score >= level.threshold) || strengthLevels[strengthLevels.length - 1];
  };
  
  const overallLevel = getStrengthLevel(scores.overall);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">MBA Profile Strength</CardTitle>
        <CardDescription>
          Based on your profile data compared to successful MBA applicants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall strength */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Overall Strength</span>
              <span className={`font-semibold ${
                scores.overall >= 70 ? "text-green-600" : 
                scores.overall >= 60 ? "text-blue-600" : 
                scores.overall >= 50 ? "text-yellow-600" : "text-red-600"
              }`}>
                {overallLevel.label} ({scores.overall}%)
              </span>
            </div>
            <Progress value={scores.overall} className={`h-2.5 ${overallLevel.color}`} />
          </div>
          
          {/* Category breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Category Breakdown</h4>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  Academics
                </span>
                <span>{scores.academics}%</span>
              </div>
              <Progress value={scores.academics} className="h-2 bg-gray-100" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  Work Experience
                </span>
                <span>{scores.workExperience}%</span>
              </div>
              <Progress value={scores.workExperience} className="h-2 bg-gray-100" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" />
                  Extracurriculars
                </span>
                <span>{scores.extracurriculars}%</span>
              </div>
              <Progress value={scores.extracurriculars} className="h-2 bg-gray-100" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Career Goals
                </span>
                <span>{scores.careerGoals}%</span>
              </div>
              <Progress value={scores.careerGoals} className="h-2 bg-gray-100" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for improvement suggestions
const ImprovementSuggestions: React.FC<{
  profile: ProfileData;
  scores: StrengthScores;
}> = ({ profile, scores }) => {
  // Generate suggestions based on profile data and scores
  const generateSuggestions = () => {
    const suggestions = {
      academics: [] as string[],
      workExperience: [] as string[],
      extracurriculars: [] as string[],
      careerGoals: [] as string[],
    };
    
    // Academic suggestions
    if (profile.academics.testScore.type === 'GMAT' && profile.academics.testScore.score < 700) {
      suggestions.academics.push("Consider retaking the GMAT to aim for a score of 700+ for top programs.");
    } else if (profile.academics.testScore.type === 'GRE' && profile.academics.testScore.score < 320) {
      suggestions.academics.push("Consider retaking the GRE to improve your score for competitive programs.");
    }
    
    if (profile.academics.gpa < 3.3) {
      suggestions.academics.push("Address your lower GPA in an optional essay and highlight academic achievements elsewhere.");
    }
    
    if (!profile.academics.undergraduateInstitution) {
      suggestions.academics.push("Add your undergraduate institution details to complete your profile.");
    }
    
    // Work experience suggestions
    if (profile.workExperience.years < 3) {
      suggestions.workExperience.push("Most competitive MBA programs prefer candidates with 3+ years of work experience. Consider gaining more experience before applying.");
    }
    
    if (profile.workExperience.leadership < 7) {
      suggestions.workExperience.push("Seek opportunities to demonstrate leadership in your current role to strengthen your application.");
    }
    
    if (!profile.workExperience.international) {
      suggestions.workExperience.push("Consider gaining international exposure through global projects or assignments.");
    }
    
    // Extracurricular suggestions
    if (!profile.extracurriculars.leadership) {
      suggestions.extracurriculars.push("Take on leadership roles in community organizations or volunteer activities.");
    }
    
    if (profile.extracurriculars.activities.length < 2) {
      suggestions.extracurriculars.push("Engage in more extracurricular activities to demonstrate well-roundedness.");
    }
    
    if (profile.extracurriculars.impact < 6) {
      suggestions.extracurriculars.push("Focus on making measurable impact in your extracurricular involvement.");
    }
    
    // Career goal suggestions
    if (profile.career.clarity < 7) {
      suggestions.careerGoals.push("Develop a more specific post-MBA career plan to demonstrate clear direction.");
    }
    
    if (profile.career.feasibility < 6) {
      suggestions.careerGoals.push("Ensure your career goals are realistic given your background and target MBA programs.");
    }
    
    if (profile.career.fit < 6) {
      suggestions.careerGoals.push("Research how your target schools specifically support your career goals and articulate this fit.");
    }
    
    return suggestions;
  };
  
  const suggestions = generateSuggestions();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Improvement Opportunities</CardTitle>
        <CardDescription>
          Actionable steps to strengthen your MBA application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="academics">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Academics</span>
                {suggestions.academics.length > 0 && (
                  <Badge variant="outline" className="ml-2 py-0 text-xs">
                    {suggestions.academics.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {suggestions.academics.length > 0 ? (
                <ul className="space-y-2 list-disc pl-5">
                  {suggestions.academics.map((suggestion, i) => (
                    <li key={i} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600">
                  Your academic profile is strong! Continue to maintain this strength.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="work">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Work Experience</span>
                {suggestions.workExperience.length > 0 && (
                  <Badge variant="outline" className="ml-2 py-0 text-xs">
                    {suggestions.workExperience.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {suggestions.workExperience.length > 0 ? (
                <ul className="space-y-2 list-disc pl-5">
                  {suggestions.workExperience.map((suggestion, i) => (
                    <li key={i} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600">
                  Your work experience is a key strength in your profile!
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="extracurriculars">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Extracurriculars</span>
                {suggestions.extracurriculars.length > 0 && (
                  <Badge variant="outline" className="ml-2 py-0 text-xs">
                    {suggestions.extracurriculars.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {suggestions.extracurriculars.length > 0 ? (
                <ul className="space-y-2 list-disc pl-5">
                  {suggestions.extracurriculars.map((suggestion, i) => (
                    <li key={i} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600">
                  Your extracurricular activities complement your profile well!
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="career">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Career Goals</span>
                {suggestions.careerGoals.length > 0 && (
                  <Badge variant="outline" className="ml-2 py-0 text-xs">
                    {suggestions.careerGoals.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {suggestions.careerGoals.length > 0 ? (
                <ul className="space-y-2 list-disc pl-5">
                  {suggestions.careerGoals.map((suggestion, i) => (
                    <li key={i} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600">
                  Your career goals are well-articulated and aligned with MBA programs!
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-gray-500 w-full">
          These suggestions are personalized based on your profile information and typical MBA program requirements.
        </div>
      </CardFooter>
    </Card>
  );
};

// Profile Editor Component
const ProfileEditor: React.FC<{
  profile: ProfileData;
  onChange: (profile: ProfileData) => void;
}> = ({ profile, onChange }) => {
  const updateProfile = (section: keyof ProfileData, field: string, value: any) => {
    const newProfile = { ...profile };
    
    // Handle nested fields with dot notation (e.g., "academics.gpa")
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      (newProfile[section as keyof ProfileData] as any)[parentField][childField] = value;
    } else {
      (newProfile[section as keyof ProfileData] as any)[field] = value;
    }
    
    onChange(newProfile);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your MBA Profile</CardTitle>
        <CardDescription>
          Update your information to get personalized strength analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="academics">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="academics" className="text-xs">Academics</TabsTrigger>
            <TabsTrigger value="work" className="text-xs">Work Experience</TabsTrigger>
            <TabsTrigger value="activities" className="text-xs">Activities</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs">Career Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gpa">Undergraduate GPA</Label>
                <div className="flex gap-2">
                  <Input
                    id="gpa"
                    type="number"
                    min="0"
                    max="4"
                    step="0.01"
                    value={profile.academics.gpa}
                    onChange={(e) => updateProfile('academics', 'gpa', parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm self-center">/ {profile.academics.gpaScale}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="test-type">Test Score</Label>
                <div className="flex gap-2">
                  <Select 
                    value={profile.academics.testScore.type}
                    onValueChange={(value) => updateProfile('academics', 'testScore.type', value)}
                  >
                    <SelectTrigger id="test-type" className="w-[80px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GMAT">GMAT</SelectItem>
                      <SelectItem value="GRE">GRE</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="number"
                    value={profile.academics.testScore.score}
                    onChange={(e) => updateProfile('academics', 'testScore.score', parseInt(e.target.value) || 0)}
                    placeholder="Score"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="undergrad">Undergraduate Institution</Label>
              <Input
                id="undergrad"
                value={profile.academics.undergraduateInstitution}
                onChange={(e) => updateProfile('academics', 'undergraduateInstitution', e.target.value)}
                placeholder="University name"
              />
            </div>
            
            <div>
              <Label htmlFor="major">Undergraduate Major</Label>
              <Input
                id="major"
                value={profile.academics.undergraduateMajor}
                onChange={(e) => updateProfile('academics', 'undergraduateMajor', e.target.value)}
                placeholder="e.g., Economics, Engineering"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="work" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="work-years">Years of Work Experience</Label>
                <Input
                  id="work-years"
                  type="number"
                  min="0"
                  max="20"
                  value={profile.workExperience.years}
                  onChange={(e) => updateProfile('workExperience', 'years', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Primary Industry</Label>
                <Input
                  id="industry"
                  value={profile.workExperience.industry}
                  onChange={(e) => updateProfile('workExperience', 'industry', e.target.value)}
                  placeholder="e.g., Technology, Finance"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="leadership">Leadership Experience</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    id="leadership"
                    min={1}
                    max={10}
                    step={1}
                    value={[profile.workExperience.leadership]}
                    onValueChange={(value) => updateProfile('workExperience', 'leadership', value[0])}
                  />
                </div>
                <div className="w-12 text-center font-medium">
                  {profile.workExperience.leadership}/10
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Rate your leadership responsibilities and impact
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="international"
                checked={profile.workExperience.international}
                onCheckedChange={(checked) => 
                  updateProfile('workExperience', 'international', !!checked)
                }
              />
              <label
                htmlFor="international"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                International work experience
              </label>
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-4">
            <div>
              <Label htmlFor="activities">Extracurricular Activities</Label>
              <Input
                id="activities"
                value={profile.extracurriculars.activities.join(', ')}
                onChange={(e) => updateProfile(
                  'extracurriculars', 
                  'activities', 
                  e.target.value.split(',').map(a => a.trim()).filter(a => a)
                )}
                placeholder="e.g., Volunteering, Sports, Professional associations"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple activities with commas
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="activity-leadership"
                checked={profile.extracurriculars.leadership}
                onCheckedChange={(checked) => 
                  updateProfile('extracurriculars', 'leadership', !!checked)
                }
              />
              <label
                htmlFor="activity-leadership"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Leadership roles in extracurricular activities
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="continuity"
                checked={profile.extracurriculars.continuity}
                onCheckedChange={(checked) => 
                  updateProfile('extracurriculars', 'continuity', !!checked)
                }
              />
              <label
                htmlFor="continuity"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sustained involvement (2+ years)
              </label>
            </div>
            
            <div>
              <Label htmlFor="impact">Impact & Achievement Level</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    id="impact"
                    min={1}
                    max={10}
                    step={1}
                    value={[profile.extracurriculars.impact]}
                    onValueChange={(value) => updateProfile('extracurriculars', 'impact', value[0])}
                  />
                </div>
                <div className="w-12 text-center font-medium">
                  {profile.extracurriculars.impact}/10
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <div>
              <Label htmlFor="career-goals">Post-MBA Career Goals</Label>
              <Input
                id="career-goals"
                value={profile.career.goals}
                onChange={(e) => updateProfile('career', 'goals', e.target.value)}
                placeholder="e.g., Transition to consulting, advance in finance"
              />
            </div>
            
            <div>
              <Label htmlFor="clarity">Goal Clarity</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    id="clarity"
                    min={1}
                    max={10}
                    step={1}
                    value={[profile.career.clarity]}
                    onValueChange={(value) => updateProfile('career', 'clarity', value[0])}
                  />
                </div>
                <div className="w-12 text-center font-medium">
                  {profile.career.clarity}/10
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                How clear and specific are your post-MBA goals?
              </p>
            </div>
            
            <div>
              <Label htmlFor="feasibility">Goal Feasibility</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    id="feasibility"
                    min={1}
                    max={10}
                    step={1}
                    value={[profile.career.feasibility]}
                    onValueChange={(value) => updateProfile('career', 'feasibility', value[0])}
                  />
                </div>
                <div className="w-12 text-center font-medium">
                  {profile.career.feasibility}/10
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                How realistic are your goals given your background?
              </p>
            </div>
            
            <div>
              <Label htmlFor="target-schools">Target School Tier</Label>
              <Select 
                value={profile.targetSchools.tier}
                onValueChange={(value) => updateProfile('targetSchools', 'tier', value)}
              >
                <SelectTrigger id="target-schools">
                  <SelectValue placeholder="Select target school level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top 10">Top 10 MBA Programs</SelectItem>
                  <SelectItem value="top 25">Top 11-25 MBA Programs</SelectItem>
                  <SelectItem value="top 50">Top 26-50 MBA Programs</SelectItem>
                  <SelectItem value="top 100">Top 51-100 MBA Programs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <SaveIcon className="h-4 w-4" />
                Save Profile
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Profile is saved automatically</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <p className="text-xs text-gray-500">
          All fields are optional but provide better analysis
        </p>
      </CardFooter>
    </Card>
  );
};

// Main Profile Strength Analyzer Component
const ProfileStrengthAnalyzer: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [scores, setScores] = useState<StrengthScores>({
    academics: 65,
    workExperience: 70,
    extracurriculars: 50,
    careerGoals: 60,
    overall: 65
  });
  
  // Calculate scores based on profile data
  useEffect(() => {
    // Academic score calculation
    let academicScore = 0;
    if (profile.academics.testScore.type === 'GMAT') {
      // GMAT scoring
      if (profile.academics.testScore.score >= 740) academicScore += 40;
      else if (profile.academics.testScore.score >= 720) academicScore += 35;
      else if (profile.academics.testScore.score >= 700) academicScore += 30;
      else if (profile.academics.testScore.score >= 680) academicScore += 25;
      else if (profile.academics.testScore.score >= 650) academicScore += 20;
      else academicScore += 15;
    } else if (profile.academics.testScore.type === 'GRE') {
      // Simplified GRE scoring
      if (profile.academics.testScore.score >= 330) academicScore += 40;
      else if (profile.academics.testScore.score >= 325) academicScore += 35;
      else if (profile.academics.testScore.score >= 320) academicScore += 30;
      else if (profile.academics.testScore.score >= 315) academicScore += 25;
      else if (profile.academics.testScore.score >= 310) academicScore += 20;
      else academicScore += 15;
    }
    
    // GPA scoring
    const normalizedGPA = (profile.academics.gpa / profile.academics.gpaScale) * 4.0;
    if (normalizedGPA >= 3.7) academicScore += 40;
    else if (normalizedGPA >= 3.5) academicScore += 35;
    else if (normalizedGPA >= 3.3) academicScore += 30;
    else if (normalizedGPA >= 3.0) academicScore += 25;
    else academicScore += 15;
    
    // Institution and major points (simplified)
    if (profile.academics.undergraduateInstitution) academicScore += 10;
    if (profile.academics.undergraduateMajor) academicScore += 10;
    
    // Adjust to 100 scale
    academicScore = Math.min(Math.round(academicScore), 100);
    
    // Work experience score calculation
    let workScore = 0;
    
    // Years of experience
    if (profile.workExperience.years >= 6) workScore += 25;
    else if (profile.workExperience.years >= 4) workScore += 30;
    else if (profile.workExperience.years >= 2) workScore += 25;
    else workScore += 15;
    
    // Leadership
    workScore += profile.workExperience.leadership * 3;
    
    // International experience
    if (profile.workExperience.international) workScore += 15;
    
    // Industry and function
    if (profile.workExperience.industry || profile.workExperience.function) workScore += 10;
    
    // Adjust to 100 scale
    workScore = Math.min(Math.round(workScore), 100);
    
    // Extracurricular score calculation
    let extraScore = 0;
    
    // Activities
    extraScore += Math.min(profile.extracurriculars.activities.length * 15, 30);
    
    // Leadership and continuity
    if (profile.extracurriculars.leadership) extraScore += 25;
    if (profile.extracurriculars.continuity) extraScore += 15;
    
    // Impact
    extraScore += profile.extracurriculars.impact * 3;
    
    // Adjust to 100 scale
    extraScore = Math.min(Math.round(extraScore), 100);
    
    // Career goals score calculation
    let careerScore = 0;
    
    // Goals articulation
    if (profile.career.goals) careerScore += 25;
    
    // Clarity, feasibility, and fit
    careerScore += profile.career.clarity * 2.5;
    careerScore += profile.career.feasibility * 2.5;
    careerScore += profile.career.fit * 2.5;
    
    // Target schools alignment
    if (profile.targetSchools.tier) careerScore += 15;
    
    // Adjust to 100 scale
    careerScore = Math.min(Math.round(careerScore), 100);
    
    // Calculate overall score
    const overallScore = Math.round(
      (academicScore * 0.3) +
      (workScore * 0.4) +
      (extraScore * 0.15) +
      (careerScore * 0.15)
    );
    
    setScores({
      academics: academicScore,
      workExperience: workScore,
      extracurriculars: extraScore,
      careerGoals: careerScore,
      overall: overallScore
    });
  }, [profile]);
  
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">MBA Profile Strength Analyzer</h2>
        <p className="text-gray-600 mb-4">
          Assess your MBA application profile strength and get personalized improvement recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileEditor profile={profile} onChange={setProfile} />
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <StrengthIndicator scores={scores} />
          <ImprovementSuggestions profile={profile} scores={scores} />
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>This analyzer provides an estimate based on typical MBA admissions criteria.</p>
        <p>Each school weighs factors differently and holistically evaluates candidates.</p>
      </div>
    </div>
  );
};

export default ProfileStrengthAnalyzer;
