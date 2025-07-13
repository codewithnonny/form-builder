import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Palette, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12 fade-in-up">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="p-3 rounded-xl glass-strong glow-primary">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold">Form GUI Builder</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
          Build beautiful, functional forms with our visual drag-and-drop editor
        </p>
        <p className="text-muted-foreground mb-8">
          Design engineering meets form creation - fast, intuitive, and powerful
        </p>
        <Link href="/builder">
          <Button 
            variant="secondary" 
            size="lg"
            className="group hover:glow-primary cursor-pointer"
          >
            <Zap className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            Start Building
            <Sparkles className="w-4 h-4 ml-2 transition-transform group-hover:rotate-12" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="p-6 glass hover-lift group">
          <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
            <Palette className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
          <p className="text-muted-foreground text-sm">
            Modern, responsive forms with smooth animations and polished interactions
          </p>
        </Card>
        <Card className="p-6 glass hover-lift group">
          <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4 group-hover:bg-accent/20 transition-colors">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Drag & Drop</h3>
          <p className="text-muted-foreground text-sm">
            Intuitive visual builder with real-time preview and seamless component management
          </p>
        </Card>
        <Card className="p-6 glass hover-lift group">
          <div className="p-3 rounded-lg bg-success/10 w-fit mb-4 group-hover:bg-success/20 transition-colors">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Export Ready</h3>
          <p className="text-muted-foreground text-sm">
            Generate clean, production-ready code with proper validation and accessibility
          </p>
        </Card>
      </div>
    </main>
  );
}
