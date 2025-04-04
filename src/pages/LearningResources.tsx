import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Clock, ExternalLink, Filter, Play, Plus, Search, Star, Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const initialCourses = [
  {
    id: 1,
    title: "Advanced Data Structures and Algorithms",
    platform: "Coursera",
    instructor: "Dr. Robert Thompson",
    level: "Advanced",
    duration: "8 weeks",
    progress: 45,
    lastAccessed: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
    rating: 4.8,
    reviews: 1254,
    tags: ["DSA", "Problem Solving", "Algorithms"]
  },
  {
    id: 2,
    title: "Full-Stack React Development",
    platform: "Udemy",
    instructor: "Jessica Miller",
    level: "Intermediate",
    duration: "12 weeks",
    progress: 78,
    lastAccessed: "Yesterday",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    rating: 4.6,
    reviews: 3789,
    tags: ["React", "JavaScript", "Web Development"]
  },
  {
    id: 3,
    title: "Machine Learning Foundations",
    platform: "edX",
    instructor: "Prof. Andrew Lee",
    level: "Intermediate",
    duration: "10 weeks",
    progress: 22,
    lastAccessed: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
    rating: 4.9,
    reviews: 2156,
    tags: ["ML", "Python", "Data Science"]
  }
];

const videos = [
  {
    id: 1,
    title: "System Design Interview Preparation",
    channel: "Tech Interview Pro",
    views: "245K",
    uploaded: "2 months ago",
    duration: "45:22",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    tags: ["System Design", "Interview"]
  },
  {
    id: 2,
    title: "Building Microservices with Docker and Kubernetes",
    channel: "Cloud Native",
    views: "189K",
    uploaded: "3 months ago",
    duration: "1:12:45",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
    tags: ["Docker", "Kubernetes", "Microservices"]
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    channel: "Web Dev Mastery",
    views: "312K",
    uploaded: "1 month ago",
    duration: "32:10",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    tags: ["React", "Hooks", "JavaScript"]
  },
  {
    id: 4,
    title: "Mastering Advanced CSS Techniques",
    channel: "CSS Wizards",
    views: "178K",
    uploaded: "2 weeks ago",
    duration: "28:45",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    tags: ["CSS", "Web Design", "UI"]
  }
];

const books = [
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    pages: 464,
    readingStatus: "In Progress (Page 156)",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    genre: "Software Engineering",
    rating: 4.9
  },
  {
    id: 2,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    pages: 416,
    readingStatus: "Not Started",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    genre: "Software Design",
    rating: 4.7
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    pages: 352,
    readingStatus: "Completed",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    genre: "Software Development",
    rating: 4.8
  }
];

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState(initialCourses);
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    instructor: "",
    level: "Beginner",
    duration: "",
    tags: "",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop"
  });
  
  const filterResources = (resources: any[]) => {
    if (!searchQuery) return resources;
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.tags && resource.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  };
  
  const filteredCourses = filterResources(courses);
  const filteredVideos = filterResources(videos);
  const filteredBooks = filterResources(books);

  const handleAddResource = async () => {
    try {
      const submissionData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        lastAccessed: "Just now",
        rating: 4.5,
        reviews: 0
      };

      // Send to backend
      const response = await fetch("http://localhost:5000/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to add resource');
      }

      const data = await response.json();
      
      // Update UI state
      setCourses(prevCourses => [
        ...prevCourses,
        {
          id: prevCourses.length + 1,
          ...submissionData,
          progress: submissionData.progress,
          lastAccessed: "Just now",
          rating: 4.5,
          reviews: 0
        }
      ]);

      toast({
        title: "Success!",
        description: "Resource added successfully",
      });
      
      // Reset form and close dialog
      setOpen(false);
      setFormData({
        title: "",
        platform: "",
        instructor: "",
        level: "Beginner",
        duration: "",
        tags: "",
        progress: 0,
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop"
      });

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to add resource",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Learning Resources</h1>
          <p className="text-muted-foreground">Courses, videos, and books to enhance your skills</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Fill in the details of the course you want to add.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Input
                    id="platform"
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructor" className="text-right">
                    Instructor
                  </Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="level" className="text-right">
                    Level
                  </Label>
                  <Input
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tags" className="text-right">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="col-span-3"
                    placeholder="Comma separated (e.g., React, JavaScript)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="progress" className="text-right">
                    Progress
                  </Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddResource}>
                  Save Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="relative flex-1 mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search resources by title, topic, or tags..."
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="courses">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-40">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <Badge className="bg-primary text-white">{course.platform}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Level</p>
                        <p className="font-medium">{course.level}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="bg-muted h-2 rounded-full">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Last accessed {course.lastAccessed}
                    </div>
                    <Button size="sm">Continue</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or browse our recommended courses.</p>
              <Button>Explore Courses</Button>
            </div>
          )}
        </TabsContent>
        
        {/* Rest of your existing tabs content (videos, books, recommended) */}
        {/* ... */}
        
      </Tabs>
    </div>
  );
};

export default LearningResources;