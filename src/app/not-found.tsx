
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
      <AlertTriangle className="h-24 w-24 text-destructive mb-6" />
      <h1 className="text-5xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. Maybe it was moved, or you mistyped the address.
      </p>
      <Button asChild size="lg">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  );
}
