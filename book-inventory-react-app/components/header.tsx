import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Book Inventory
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your collection of books
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
