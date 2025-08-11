import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestions?: string[];
}

export default function PlaceholderPage({ title, description, suggestions = [] }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Construction className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                {title}
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {suggestions.length > 0 && (
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-3">
                    This page will include:
                  </h3>
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button className="w-full sm:w-auto">
                  Continue Building This Page
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Continue prompting to add more content and features to this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
