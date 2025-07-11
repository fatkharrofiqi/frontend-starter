import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex min-h-svh flex-row space-x-2 items-center justify-center">
      <Button className="focus:cursor-pointer active:translate-y-1">
        Click me
      </Button>
      <ModeToggle />
    </div>
  );
}
