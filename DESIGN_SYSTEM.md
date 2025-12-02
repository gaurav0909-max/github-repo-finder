# RepoVision Design System

> A modern, minimal design system inspired by Vercel and Linear

**Version**: 1.0
**Last Updated**: November 29, 2025
**Design Philosophy**: Minimal, clean, professional

---

## 🎨 Color Palette

### Light Mode

```css
--background: #FAFAFA
--foreground: #171717

--card: #FFFFFF
--card-foreground: #171717

--primary: #0070F3 (Vercel Blue)
--primary-foreground: #FFFFFF
--primary-hover: #0761D1

--secondary: #F5F5F5
--secondary-foreground: #171717

--muted: #F5F5F5
--muted-foreground: #737373

--accent: #0070F3
--accent-foreground: #FFFFFF

--border: #E5E5E5
--input: #E5E5E5
--ring: #0070F3

--success: #10B981
--warning: #F59E0B
--destructive: #EF4444
```

### Dark Mode

```css
--background: #0A0A0A
--foreground: #EDEDED

--card: #141414
--card-foreground: #EDEDED

--primary: #0070F3 (Vercel Blue)
--primary-foreground: #FFFFFF
--primary-hover: #0761D1

--secondary: #1A1A1A
--secondary-foreground: #EDEDED

--muted: #1A1A1A
--muted-foreground: #A1A1A1

--accent: #0070F3
--accent-foreground: #FFFFFF

--border: #262626
--input: #262626
--ring: #0070F3

--success: #10B981
--warning: #F59E0B
--destructive: #EF4444
```

---

## 📐 Typography

### Font Families

```css
--font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
--font-mono: JetBrains Mono, monospace
```

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Captions, labels |
| `text-sm` | 14px | 20px | Body text (small) |
| `text-base` | 16px | 24px | Body text |
| `text-lg` | 18px | 28px | Emphasized text |
| `text-xl` | 20px | 28px | Small headings |
| `text-2xl` | 24px | 32px | Section headings |
| `text-3xl` | 30px | 36px | Page headings |
| `text-4xl` | 36px | 40px | Hero headings |
| `text-5xl` | 48px | 48px | Large displays |
| `text-6xl` | 60px | 60px | Extra large |

### Font Weights

- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## 📏 Spacing Scale

Uses Tailwind's default spacing scale with custom additions:

```
1 = 4px
2 = 8px
3 = 12px
4 = 16px
6 = 24px
8 = 32px
12 = 48px
16 = 64px
18 = 72px (custom)
20 = 80px
24 = 96px
```

---

## 🔲 Border Radius

```css
--radius: 8px

/* Generated values */
sm: 4px
md: 6px
lg: 8px
xl: 12px
2xl: 16px
full: 9999px
```

---

## 🎭 Components

### Button

**Variants:**

```tsx
<Button variant="default">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="link">Link Button</Button>
```

**Sizes:**

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**Examples:**

```tsx
import { Button } from "@/components/ui/button";

// Primary action
<Button>Get Started</Button>

// Secondary action
<Button variant="outline">Learn More</Button>

// With icon
<Button>
  <Icon className="mr-2 h-4 w-4" />
  Continue
</Button>
```

---

### Card

**Usage:**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Input

**Usage:**

```tsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter username..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

---

### Badge

**Variants:**

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>
```

**Examples:**

```tsx
import { Badge } from "@/components/ui/badge";

// Language badge
<Badge variant="outline">TypeScript</Badge>

// Status badge
<Badge variant="success">Verified</Badge>

// Count badge
<Badge>42</Badge>
```

---

### Tabs

**Usage:**

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="repos">
  <TabsList>
    <TabsTrigger value="repos">Repositories</TabsTrigger>
    <TabsTrigger value="users">Users</TabsTrigger>
  </TabsList>
  <TabsContent value="repos">
    Repositories content
  </TabsContent>
  <TabsContent value="users">
    Users content
  </TabsContent>
</Tabs>
```

---

### Skeleton

**Usage:**

```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Card skeleton
<Card>
  <CardHeader>
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-20 w-full" />
  </CardContent>
</Card>

// Avatar skeleton
<Skeleton className="h-12 w-12 rounded-full" />
```

---

### Separator

**Usage:**

```tsx
import { Separator } from "@/components/ui/separator";

<div>
  <p>Section 1</p>
  <Separator className="my-4" />
  <p>Section 2</p>
</div>

// Vertical separator
<div className="flex h-5 items-center space-x-4">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
</div>
```

---

## 🎨 Design Patterns

### Glass Morphism (Subtle)

```tsx
<div className="glass">
  {/* Content */}
</div>

// Equivalent to:
// bg-card/50 backdrop-blur-sm border border-border
```

### Gradient Text

```tsx
<h1 className="gradient-text">
  Beautiful Gradient Text
</h1>

// Equivalent to:
// bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent
```

### Hover Effects

```tsx
// Hover with shadow
<div className="transition-shadow hover:shadow-lg">
  Content
</div>

// Hover with background
<div className="hover:bg-muted transition-colors">
  Content
</div>

// Hover with scale
<div className="transition-transform hover:scale-105">
  Content
</div>
```

---

## 🎬 Animations

### Keyframe Animations

```tsx
// Fade in
<div className="animate-fade-in">Content</div>

// Slide in
<div className="animate-slide-in">Content</div>
```

### Transition Durations

```
fast: 150ms
base: 200ms
slow: 300ms
```

**Usage:**

```tsx
<div className="transition-all duration-fast">Fast transition</div>
<div className="transition-all duration-base">Base transition</div>
<div className="transition-all duration-slow">Slow transition</div>
```

---

## 🌓 Theme Toggle

### Using the Theme System

```tsx
import { useTheme } from "@/context/ThemeContext";

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Actual theme: {actualTheme}</p>

      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
```

### Theme Toggle Component

```tsx
import { ThemeToggle } from "@/components/theme-toggle";

// Add to your layout or header
<ThemeToggle />
```

---

## 🔧 Utility Functions

### Class Name Utility

```tsx
import { cn } from "@/lib/utils/cn";

// Merge and deduplicate Tailwind classes
<div className={cn(
  "px-4 py-2",
  isActive && "bg-primary",
  "px-6" // This overrides px-4
)}>
  Content
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```
sm: 640px   (Mobile landscape, small tablets)
md: 768px   (Tablets)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
2xl: 1536px (Extra large desktop)
```

### Mobile-First Examples

```tsx
// Stack on mobile, grid on larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</div>

// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop only content</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">Mobile only content</div>

// Responsive text sizes
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Heading
</h1>
```

---

## 🎯 Best Practices

### 1. Consistency

- Always use design tokens (colors, spacing) instead of hard-coded values
- Use the same component variants across the application
- Maintain consistent spacing between elements

### 2. Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure sufficient color contrast (WCAG 2.1 AA)
- Support keyboard navigation
- Test with screen readers

### 3. Performance

- Use `Skeleton` components for loading states
- Implement proper image optimization with Next.js Image
- Lazy load components below the fold
- Minimize animation complexity

### 4. Responsiveness

- Design mobile-first
- Test on real devices
- Ensure touch targets are at least 44x44px
- Use responsive typography

### 5. Dark Mode

- Test all components in both light and dark modes
- Ensure images/icons work in both themes
- Use semantic color tokens (not hard-coded colors)

---

## 📚 Component Usage Examples

### Repository Card Example

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <div className="flex items-start justify-between">
      <CardTitle>repo-name</CardTitle>
      <ExternalLink className="h-4 w-4 text-muted-foreground" />
    </div>
    <CardDescription>
      A brief description of the repository
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-2">
      <Badge variant="outline">TypeScript</Badge>
      <span className="text-sm text-muted-foreground">⭐ 1.2k</span>
      <span className="text-sm text-muted-foreground">Updated 2 days ago</span>
    </div>
  </CardContent>
</Card>
```

### Search Form Example

```tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

<form className="flex gap-2">
  <Input
    type="text"
    placeholder="Search repositories..."
    className="flex-1"
  />
  <Button type="submit">
    <Search className="mr-2 h-4 w-4" />
    Search
  </Button>
</form>
```

---

## 🚀 Getting Started

### 1. Using Components

All components are available in `@/components/ui/`:

```tsx
import { Button, Card, Input, Badge } from "@/components/ui";
```

### 2. Applying Styles

Use Tailwind utility classes with design tokens:

```tsx
<div className="bg-background text-foreground border border-border rounded-lg p-6">
  Content
</div>
```

### 3. Theme Aware Components

```tsx
// This automatically adapts to light/dark mode
<div className="bg-card text-card-foreground">
  Theme-aware content
</div>
```

---

## 📦 Component Index

| Component | Location | Purpose |
|-----------|----------|---------|
| Button | `@/components/ui/button` | Interactive buttons |
| Card | `@/components/ui/card` | Content containers |
| Input | `@/components/ui/input` | Form inputs |
| Badge | `@/components/ui/badge` | Labels and tags |
| Separator | `@/components/ui/separator` | Visual dividers |
| Skeleton | `@/components/ui/skeleton` | Loading placeholders |
| Tabs | `@/components/ui/tabs` | Tabbed interfaces |
| ThemeToggle | `@/components/theme-toggle` | Theme switcher |

---

## 🎨 Color Usage Guidelines

### When to Use Each Color

| Color | Usage |
|-------|-------|
| `primary` | Call-to-action buttons, links, active states |
| `secondary` | Less prominent actions, backgrounds |
| `muted` | Subtle backgrounds, disabled states |
| `accent` | Highlights, special features |
| `success` | Positive feedback, success messages |
| `warning` | Caution, warnings |
| `destructive` | Errors, dangerous actions, delete buttons |
| `border` | Dividers, card borders, input borders |

---

## 📄 License

This design system is part of the RepoVision project.

---

**Questions or suggestions?** Open an issue or submit a pull request!
