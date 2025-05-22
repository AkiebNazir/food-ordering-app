
export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MunchEase. All rights reserved.</p>
        <p className="mt-1">Delicious food, delivered to your door.</p>
      </div>
    </footer>
  );
}
