import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send, RefreshCw, BookOpen, Network, Lightbulb, Zap, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router-dom";
import { generateConceptMap } from "@/lib/api";

const ConceptExplorer = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [conceptMap, setConceptMap] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to explore",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const result = await generateConceptMap(topic);
      setConceptMap(result);
    } catch (error) {
      toast({
        title: "Error generating concept map",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Concept Explorer</h1>
        <p className="text-muted-foreground max-w-2xl">
          Visualize connections between concepts and ideas to deepen your understanding
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              Explore a Topic
            </CardTitle>
            <CardDescription>
              Enter any topic or concept you want to explore and visualize
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Concept</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Photosynthesis, Democracy, Machine Learning"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Network className="mr-2 h-4 w-4" />
                    Generate Concept Map
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              How It Works
            </CardTitle>
            <CardDescription>
              Understanding the concept mapping process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Knowledge Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes the topic and identifies key concepts and relationships
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Relationship Mapping</h3>
                <p className="text-sm text-muted-foreground">
                  Connections between concepts are identified and visualized
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Interactive Exploration</h3>
                <p className="text-sm text-muted-foreground">
                  Explore the concept map to deepen your understanding
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {conceptMap && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Concept Map: {topic}</CardTitle>
            <CardDescription>
              Visual representation of concepts and their relationships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-white dark:bg-gray-900">
              <div dangerouslySetInnerHTML={{ __html: conceptMap }} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setConceptMap("")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={() => navigate("/ai-tutor", { state: { topic } })}>
              Learn More About This Topic
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ConceptExplorer;
