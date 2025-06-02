export default function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sudan Shines. All rights reserved.</p>
        <p className="mt-1">Education is the right of every child – everywhere.</p>
      </div>
    </footer>
  );
}
