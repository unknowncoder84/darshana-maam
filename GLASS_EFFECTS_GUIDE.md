# Glass Effects Usage Guide 🪟

## Quick Reference

### Available Glass Classes

| Class | Use Case | Opacity | Blur | Best For |
|-------|----------|---------|------|----------|
| `.glass` | Basic glass | 10% | 10px | Overlays, subtle effects |
| `.glass-card` | Content cards | 70% | 20px | Cards, panels, content |
| `.glass-dark` | Dark backgrounds | 70% | 20px | Modals, dark themes |
| `.glass-sidebar` | Navigation | 95% | 30px | Sidebars, menus |
| `.glass-header` | Headers | 90% | 20px | Sticky headers, nav bars |

## Usage Examples

### 1. Basic Glass Card

```tsx
<div className="glass-card rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold">Card Title</h2>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

**Result**: Frosted glass card with rounded corners and shadow

---

### 2. Interactive Glass Card (with hover)

```tsx
<div className="glass-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
  <h2 className="text-xl font-bold">Interactive Card</h2>
  <p className="text-gray-600">Hover to see the effect!</p>
</div>
```

**Result**: Card that lifts and scales on hover

---

### 3. Glass Sidebar

```tsx
<aside className="glass-sidebar w-64 min-h-screen p-4">
  <nav>
    <ul className="space-y-2">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</aside>
```

**Result**: Frosted glass sidebar with extra blur

---

### 4. Glass Header (Sticky)

```tsx
<header className="glass-header sticky top-0 z-50 px-6 py-4">
  <nav className="flex items-center justify-between">
    <div className="logo">Logo</div>
    <ul className="flex space-x-6">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
```

**Result**: Sticky header with glass effect

---

### 5. Dark Glass Modal

```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="glass-dark rounded-2xl p-8 max-w-md w-full">
    <h2 className="text-white text-2xl font-bold mb-4">Modal Title</h2>
    <p className="text-white/80">Modal content goes here</p>
    <button className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg">
      Close
    </button>
  </div>
</div>
```

**Result**: Dark glass modal with blurred background

---

### 6. Glass Button

```tsx
<button className="glass rounded-lg px-6 py-3 hover:glass-card transition-all duration-300 transform hover:scale-105">
  Click Me
</button>
```

**Result**: Glass button that becomes more opaque on hover

---

### 7. Glass Stats Card

```tsx
<div className="glass-card rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600">Total Users</p>
      <p className="text-3xl font-bold text-gray-900">1,234</p>
    </div>
    <div className="text-4xl">👥</div>
  </div>
</div>
```

**Result**: Stats card with icon and hover effect

---

### 8. Glass Navigation Item

```tsx
<a 
  href="/dashboard" 
  className="flex items-center px-4 py-3 glass rounded-lg hover:glass-card transition-all duration-300"
>
  <svg className="w-5 h-5 mr-3">...</svg>
  <span>Dashboard</span>
</a>
```

**Result**: Navigation link with glass effect

---

### 9. Glass Alert/Notification

```tsx
<div className="glass-card rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
  <div className="flex items-start">
    <div className="text-2xl mr-3">ℹ️</div>
    <div>
      <h4 className="font-semibold text-gray-900">Information</h4>
      <p className="text-gray-600 text-sm">This is an informational message</p>
    </div>
  </div>
</div>
```

**Result**: Alert with glass background and colored border

---

### 10. Glass Form

```tsx
<form className="glass-card rounded-xl shadow-lg p-8 max-w-md">
  <h2 className="text-2xl font-bold mb-6">Sign In</h2>
  
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Email</label>
    <input 
      type="email" 
      className="w-full px-4 py-2 glass rounded-lg focus:glass-card transition-all"
      placeholder="your@email.com"
    />
  </div>
  
  <div className="mb-6">
    <label className="block text-sm font-medium mb-2">Password</label>
    <input 
      type="password" 
      className="w-full px-4 py-2 glass rounded-lg focus:glass-card transition-all"
      placeholder="••••••••"
    />
  </div>
  
  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
    Sign In
  </button>
</form>
```

**Result**: Complete form with glass styling

---

## Combining with Other Effects

### Glass + Gradient Background

```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
  <div className="glass-card rounded-xl shadow-lg p-8">
    <h1>Content on gradient background</h1>
  </div>
</div>
```

---

### Glass + Animated Background

```tsx
<div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
  {/* Floating orbs */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
  
  {/* Glass content */}
  <div className="relative z-10 glass-dark rounded-2xl p-8">
    <h1 className="text-white">Content with animated background</h1>
  </div>
</div>
```

---

### Glass + Image Background

```tsx
<div 
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: 'url(/hero-image.jpg)' }}
>
  <div className="glass-dark rounded-xl p-8 m-8">
    <h1 className="text-white">Content over image</h1>
  </div>
</div>
```

---

## Best Practices

### ✅ Do's

1. **Use appropriate glass class for context**
   ```tsx
   // Good
   <aside className="glass-sidebar">...</aside>
   <header className="glass-header">...</header>
   <div className="glass-card">...</div>
   ```

2. **Combine with rounded corners**
   ```tsx
   // Good
   <div className="glass-card rounded-xl">...</div>
   ```

3. **Add hover effects for interactivity**
   ```tsx
   // Good
   <div className="glass-card hover:shadow-2xl transition-all">...</div>
   ```

4. **Use with appropriate backgrounds**
   ```tsx
   // Good - gradient background
   <div className="bg-gradient-to-br from-blue-50 to-purple-50">
     <div className="glass-card">...</div>
   </div>
   ```

5. **Maintain text contrast**
   ```tsx
   // Good
   <div className="glass-card">
     <h2 className="text-gray-900">High contrast text</h2>
   </div>
   ```

### ❌ Don'ts

1. **Don't stack too many glass layers**
   ```tsx
   // Bad
   <div className="glass-card">
     <div className="glass-card">
       <div className="glass-card">Too much!</div>
     </div>
   </div>
   ```

2. **Don't use on solid backgrounds**
   ```tsx
   // Bad - no visual effect
   <div className="bg-white">
     <div className="glass-card">...</div>
   </div>
   ```

3. **Don't forget hover states**
   ```tsx
   // Bad - no feedback
   <button className="glass-card">Click me</button>
   
   // Good
   <button className="glass-card hover:glass-card transition-all">Click me</button>
   ```

4. **Don't use extreme blur values**
   ```tsx
   // Bad
   <div className="backdrop-blur-[100px]">Too blurry!</div>
   
   // Good
   <div className="glass-card">Just right</div>
   ```

5. **Don't sacrifice readability**
   ```tsx
   // Bad
   <div className="glass text-gray-400">
     <p>Hard to read text</p>
   </div>
   
   // Good
   <div className="glass-card">
     <p className="text-gray-900">Easy to read</p>
   </div>
   ```

---

## Common Patterns

### Dashboard Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="glass-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
    <h3>Card 1</h3>
  </div>
  <div className="glass-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
    <h3>Card 2</h3>
  </div>
  <div className="glass-card rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
    <h3>Card 3</h3>
  </div>
</div>
```

### Sidebar Layout

```tsx
<div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
  <aside className="glass-sidebar w-64">
    <nav>Sidebar content</nav>
  </aside>
  <main className="flex-1 p-8">
    <div className="glass-card rounded-xl p-6">
      Main content
    </div>
  </main>
</div>
```

### Modal Overlay

```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
  <div className="glass-dark rounded-2xl p-8 max-w-lg w-full mx-4">
    <h2 className="text-white text-2xl font-bold mb-4">Modal</h2>
    <p className="text-white/80 mb-6">Modal content</p>
    <div className="flex justify-end space-x-3">
      <button className="px-4 py-2 glass rounded-lg hover:glass-card transition-all">
        Cancel
      </button>
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## Troubleshooting

### Glass effect not visible?
- Check if there's a background behind the glass element
- Ensure backdrop-filter is supported in your browser
- Try increasing opacity or blur values

### Performance issues?
- Limit the number of glass elements on screen
- Use simpler blur values (10-20px)
- Avoid animating backdrop-filter directly

### Text hard to read?
- Increase background opacity
- Use darker text colors
- Add text shadows if needed
- Consider using `.glass-card` instead of `.glass`

---

## Browser Support

All glass effects include fallbacks:

```css
/* Modern browsers */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

/* Fallback for older browsers */
background: rgba(255, 255, 255, 0.9);
```

---

## Summary

Glass effects add a modern, professional touch to your UI. Use them wisely:

- ✨ Choose the right glass class for your use case
- ✨ Combine with appropriate backgrounds
- ✨ Add hover effects for interactivity
- ✨ Maintain readability and contrast
- ✨ Test across different browsers

Happy designing! 🎨
