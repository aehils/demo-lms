# Doura National College - Color Usage Guide

This guide explains how to properly use the school's brand colors in the LMS application.

## Brand Colors

The logo colors have been extracted and made available as CSS variables and Tailwind utility classes:

### Primary Colors

**Deep Green** (`brand-green`)
- Base: `hsl(160, 55%, 22%)` - #1a5744
- Light: `hsl(160, 50%, 35%)` - #2d8766
- Dark: `hsl(160, 60%, 15%)` - #0f3a29

**Gold/Brass** (`brand-gold`)
- Base: `hsl(40, 45%, 58%)` - #c3a86b
- Light: `hsl(40, 50%, 70%)` - #d9c393
- Dark: `hsl(40, 40%, 45%)` - #997e4c

## Usage in Components

### Tailwind Classes

You can use these colors with any Tailwind utility:

```jsx
// Background colors
<div className="bg-brand-green">...</div>
<div className="bg-brand-gold">...</div>

// Text colors
<h1 className="text-brand-green">Doura National College</h1>
<p className="text-brand-gold">Welcome message</p>

// Border colors
<div className="border-2 border-brand-green">...</div>

// Hover states with variations
<button className="bg-brand-green hover:bg-brand-green-light">
  Primary Action
</button>

<button className="bg-brand-gold hover:bg-brand-gold-dark">
  Secondary Action
</button>
```

### Direct CSS Variables

If you need to use the colors in custom CSS or inline styles:

```css
.custom-header {
  background-color: hsl(var(--brand-green));
  color: hsl(var(--brand-gold));
}

.custom-badge {
  border: 2px solid hsl(var(--brand-green-dark));
}
```

## Recommended Usage Patterns

### 1. Headers and Navigation
Use **brand-green** for primary headers, navigation bars, and major section dividers:
```jsx
<header className="bg-brand-green text-white">
  <h1>Doura National College LMS</h1>
</header>
```

### 2. Accents and Highlights
Use **brand-gold** for accents, badges, highlights, and call-to-action elements:
```jsx
<span className="text-brand-gold font-semibold">New</span>
<button className="bg-brand-gold text-brand-green-dark">Enroll Now</button>
```

### 3. Interactive Elements
For buttons and links, use color variations for hover states:
```jsx
<button className="bg-brand-green hover:bg-brand-green-light text-white">
  Submit Assignment
</button>

<a className="text-brand-gold hover:text-brand-gold-dark">
  View Course Details
</a>
```

### 4. Borders and Dividers
Use darker variations for subtle borders:
```jsx
<div className="border-l-4 border-brand-green-dark">
  Important Notice
</div>
```

### 5. Status Indicators
Combine with opacity for subtle backgrounds:
```jsx
<div className="bg-brand-green/10 border border-brand-green text-brand-green-dark">
  Course Active
</div>

<div className="bg-brand-gold/10 border border-brand-gold text-brand-gold-dark">
  Pending Review
</div>
```

## Accessibility Guidelines

### Contrast Ratios
- **brand-green on white**: High contrast ✓ (AAA compliant)
- **brand-gold on white**: Good contrast ✓ (AA compliant)
- **brand-gold on brand-green**: Good contrast ✓
- **white on brand-green**: High contrast ✓

### Best Practices
1. Always use white or very light text on `brand-green` backgrounds
2. Use `brand-green-dark` or `brand-green` for text on light backgrounds
3. For gold text, ensure sufficient contrast with the background
4. Test all color combinations with accessibility tools

## Examples by Component Type

### Cards with School Branding
```jsx
<div className="border-t-4 border-brand-green bg-white rounded-lg shadow">
  <div className="p-6">
    <h3 className="text-brand-green-dark font-semibold">Course Title</h3>
    <span className="inline-block px-2 py-1 bg-brand-gold/20 text-brand-gold-dark text-sm rounded">
      Active
    </span>
  </div>
</div>
```

### Branded Buttons
```jsx
// Primary button
<button className="bg-brand-green hover:bg-brand-green-light text-white px-6 py-2 rounded-lg transition-colors">
  Primary Action
</button>

// Secondary button
<button className="bg-white hover:bg-brand-gold/10 text-brand-green border-2 border-brand-green px-6 py-2 rounded-lg transition-colors">
  Secondary Action
</button>

// Accent button
<button className="bg-brand-gold hover:bg-brand-gold-dark text-white px-6 py-2 rounded-lg transition-colors">
  Special Action
</button>
```

### Alert/Banner with School Colors
```jsx
<div className="bg-brand-green text-white p-4 rounded-lg">
  <div className="flex items-center gap-2">
    <span className="text-brand-gold text-xl">★</span>
    <p>Important announcement from Doura National College</p>
  </div>
</div>
```

## Color Psychology and Usage

**Deep Green** represents:
- Academic excellence and tradition
- Growth and learning
- Stability and trust
- Use for: Headers, primary actions, official communications

**Gold/Brass** represents:
- Achievement and success
- Premium quality and excellence
- Warmth and celebration
- Use for: Accents, awards, highlights, special features

## Don't Do

❌ Don't use brand colors for error states (use existing `destructive` color)
❌ Don't mix too many brand color variations in one component
❌ Don't use low-opacity brand colors for important text
❌ Don't override brand colors for temporary themes

## Integration Checklist

When adding school branding to a new section:
- [ ] Use `brand-green` for main headers/navigation
- [ ] Use `brand-gold` for accents and highlights
- [ ] Ensure proper contrast ratios
- [ ] Add hover states with color variations
- [ ] Test in both light and dark modes
- [ ] Verify consistency with other branded sections

## Questions?

For color adjustments or additional brand color needs, modify:
1. `/src/styles/globals.css` - CSS variables (lines 47-53, 92-98)
2. `/tailwind.config.js` - Tailwind utilities (lines 66-73)
