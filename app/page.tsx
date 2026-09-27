import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="p-12 space-y-6">
      <div className="space-x-4">
        <Button variant="primary">Shop Bikes</Button>
        <Button variant="secondary">Explore E-Bikes</Button>
        <Button variant="ghost">Learn More</Button>
      </div>
      <Card className="p-6 w-64">
        <p>Test card content</p>
      </Card>
    </main>
  );
}