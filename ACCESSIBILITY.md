# Accessibility Guide

This document outlines the accessibility features implemented in the law firm web application to ensure WCAG 2.1 Level AA compliance.

## Semantic HTML

### Proper Heading Hierarchy
All pages use proper heading hierarchy (h1 → h2 → h3):
- Each page has one `<h1>` element
- Headings are nested logically
- No heading levels are skipped

### Landmark Regions
Pages use semantic HTML5 elements:
- `<header>` for site header
- `<nav>` for navigation
- `<main>` for main content
- `<footer>` for site footer
- `<article>` for content items
- `<section>` for content sections

## ARIA Labels and Attributes

### Interactive Elements
All interactive elements have appropriate ARIA labels:

```tsx
// Buttons
<button aria-label="Close notification">
  <svg>...</svg>
</button>

// Links
<a href="/contact" aria-label="Contact us">
  Contact
</a>

// Form inputs
<input
  type="text"
  aria-label="Search"
  aria-describedby="search-help"
/>
```

### Loading States
Loading indicators use proper ARIA attributes:
```tsx
<div role="status" aria-label="Loading">
  <span className="sr-only">Loading...</span>
</div>
```

### Toast Notifications
Toast notifications use live regions:
```tsx
<div aria-live="polite" aria-atomic="true">
  {/* Toast messages */}
</div>
```

## Keyboard Navigation

### Focus Management
- All interactive elements are keyboard accessible
- Focus indicators are visible (outline on focus)
- Tab order follows logical reading order
- Skip links allow bypassing navigation

### Keyboard Shortcuts
Standard keyboard navigation:
- `Tab`: Move to next interactive element
- `Shift + Tab`: Move to previous interactive element
- `Enter`: Activate buttons and links
- `Space`: Activate buttons
- `Esc`: Close modals and dropdowns

### Focus Trapping
Modals and dropdowns trap focus:
- Focus stays within the modal when open
- Focus returns to trigger element when closed
- `Esc` key closes modals

## Color Contrast

### Text Contrast
All text meets WCAG AA contrast requirements:
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

### Color Palette
Primary colors with sufficient contrast:
- Royal Navy Blue (#001f3f) on white: 15.3:1 ✓
- White text on Royal Navy Blue: 15.3:1 ✓
- Gray text (#374151) on white: 11.1:1 ✓

### Color Independence
Information is not conveyed by color alone:
- Icons accompany color-coded elements
- Text labels supplement visual indicators
- Error messages include text descriptions

## Form Accessibility

### Labels
All form inputs have associated labels:
```tsx
<label htmlFor="email">Email Address</label>
<input id="email" type="email" name="email" />
```

### Error Messages
Form errors are clearly communicated:
```tsx
<input
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>
)}
```

### Required Fields
Required fields are marked:
```tsx
<label htmlFor="name">
  Name <span aria-label="required">*</span>
</label>
<input id="name" required aria-required="true" />
```

## Images and Media

### Alt Text
All images have descriptive alt text:
```tsx
<Image
  src={image}
  alt="Attorney reviewing legal documents in office"
  fill
/>
```

### Decorative Images
Decorative images use empty alt text:
```tsx
<Image
  src={decorativeImage}
  alt=""
  role="presentation"
  fill
/>
```

### Video Captions
Videos should include captions (to be added by content creators):
- YouTube videos support automatic captions
- Uploaded videos should include caption files

## Screen Reader Support

### Screen Reader Only Text
Important information for screen readers:
```tsx
<span className="sr-only">
  Current page: Home
</span>
```

### Skip Links
Skip links allow bypassing navigation:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Descriptive Links
Links have descriptive text:
- ❌ "Click here"
- ✓ "Read more about our practice areas"

## Responsive Design

### Mobile Accessibility
- Touch targets are at least 44x44 pixels
- Text is readable without zooming
- Content reflows for small screens
- No horizontal scrolling required

### Zoom Support
- Page is usable at 200% zoom
- No content is cut off when zoomed
- Text remains readable

## Testing

### Automated Testing
Run accessibility tests:
```bash
npm run test:a11y
```

### Manual Testing
1. **Keyboard Navigation**: Navigate entire site using only keyboard
2. **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
3. **Color Contrast**: Use browser DevTools to check contrast
4. **Zoom**: Test at 200% zoom level
5. **Mobile**: Test on actual mobile devices

### Testing Tools
- **axe DevTools**: Browser extension for automated testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built into Chrome DevTools
- **Screen Readers**: NVDA, JAWS, VoiceOver

## Common Patterns

### Accessible Button
```tsx
<button
  type="button"
  aria-label="Close dialog"
  onClick={handleClose}
>
  <svg aria-hidden="true">...</svg>
  <span className="sr-only">Close</span>
</button>
```

### Accessible Link
```tsx
<Link href="/about" aria-label="Learn more about our firm">
  About Us
</Link>
```

### Accessible Form
```tsx
<form aria-labelledby="form-title">
  <h2 id="form-title">Contact Form</h2>
  
  <label htmlFor="name">Name *</label>
  <input
    id="name"
    type="text"
    required
    aria-required="true"
    aria-invalid={errors.name ? 'true' : 'false'}
    aria-describedby={errors.name ? 'name-error' : undefined}
  />
  {errors.name && (
    <span id="name-error" role="alert">
      {errors.name}
    </span>
  )}
</form>
```

## Checklist

Use this checklist to ensure accessibility:

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] ARIA labels are present
- [ ] Heading hierarchy is correct
- [ ] Skip links are available
- [ ] Error messages are clear
- [ ] Loading states are announced
- [ ] Modals trap focus
- [ ] Touch targets are large enough
- [ ] Page works at 200% zoom
- [ ] Screen reader testing completed

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
