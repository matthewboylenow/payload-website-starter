# Typography & Font Management Guide

Complete guide to using the typography system in your Payload CMS site.

## 🎨 Overview

Your site now has a comprehensive typography system with:
- **Global typography settings** - Set defaults for the entire site
- **Per-block overrides** - Customize typography for individual blocks
- **12 built-in Google Fonts** - Popular, web-optimized fonts
- **Custom font support** - Add any Google Font
- **Color controls** - Choose text and heading colors
- **Font pairing** - Different fonts for body and headings

---

## 🌐 Global Settings

### Accessing Settings
1. Go to Payload admin
2. Navigate to **Settings** in the sidebar
3. Open the **Typography** tab

### Available Options

#### Default Body Font
Choose the font for all body text across your site.

**Built-in Options:**
- Geist Sans (Default) - Modern sans-serif
- Geist Mono - Monospace font
- Inter - Clean, highly legible
- Roboto - Google's signature font
- Open Sans - Friendly and readable
- Lato - Warm, professional
- Montserrat - Geometric sans-serif
- Playfair Display - Elegant serif
- Merriweather - Classic serif for readability
- Poppins - Geometric, friendly
- Raleway - Stylish thin lines
- Source Sans Pro - Adobe's versatile sans-serif

#### Default Heading Font
Choose a separate font for all headings (H1-H6).

**Pro Tip:** Pair a serif with a sans-serif for visual contrast!

**Popular Pairings:**
- Playfair Display + Open Sans
- Montserrat + Merriweather
- Raleway + Lato

#### Default Text Color
Set the default color for body text.

**Options:**
- Foreground (Default) - Uses theme foreground
- Muted Foreground - Softer, less prominent
- Accent Foreground
- Brand Foreground
- Primary/Secondary Foreground
- White/Black - For specific backgrounds

#### Default Heading Color
Set the default color for all headings.

**Options:**
- Foreground (Default)
- Brand - Use your brand color
- Primary/Secondary/Accent
- Muted Foreground
- White/Black

---

## 🔤 Custom Google Fonts

Want a font not in the built-in list? Add any Google Font!

### How to Add Custom Fonts

1. Go to **Settings → Typography**
2. Scroll to **Custom Google Fonts**
3. Click **Add Item**
4. Fill in:
   - **Font Name:** Exact name from Google Fonts (e.g., "Dancing Script")
   - **Slug:** URL-friendly version (e.g., "dancing-script")
   - **Weights:** Comma-separated weights (e.g., "300,400,700")

5. Save settings
6. The font will now appear in all font dropdowns!

### Example: Adding "Bebas Neue"

```
Font Name: Bebas Neue
Slug: bebas-neue
Weights: 400,700
```

Now "Bebas Neue" appears in:
- Global settings dropdowns
- Block typography overrides
- Automatically loads from Google Fonts

---

## 📦 Per-Block Typography

Every block can override global typography settings.

### How to Use

1. Edit any block on a page
2. Scroll to the **Typography** section
3. Choose overrides for:
   - Font Family
   - Heading Font
   - Text Color
   - Heading Color

**Note:** Each dropdown has a "Default (Global Setting)" option to inherit from global settings.

### Use Cases

#### Hero with Brand Colors
```
Typography:
  Font Family: Montserrat
  Heading Font: Playfair Display
  Text Color: White
  Heading Color: White
Background Color: Brand
```

#### CTA with Emphasis
```
Typography:
  Heading Color: Brand
  Text Color: Muted Foreground
Background Color: Card
```

#### Stats Block
```
Typography:
  Font Family: Poppins
  Heading Font: Poppins
  Text Color: Foreground
  Heading Color: Brand
```

---

## 🎯 Font Loading

Fonts are automatically loaded from Google Fonts when needed.

### How It Works

1. **Global fonts** are loaded on every page
2. **Block-specific fonts** are loaded only when that block is used
3. Fonts are preconnected for optimal performance
4. Display=swap ensures text remains visible during font load

### Performance Tips

1. **Limit font variations** - Fewer weights = faster loading
2. **Use system fonts when possible** - Geist Sans/Mono are already installed
3. **Pair wisely** - Don't use too many different fonts (max 3-4 on a page)
4. **Test on slow connections** - Ensure fonts load quickly

---

## 🎨 Color System

### Theme Colors

All color options use your site's theme colors for consistency:

**Main Colors:**
- `brand` - Your brand color (#C0367B by default)
- `primary` - Primary UI color
- `secondary` - Secondary UI color
- `accent` - Accent highlights

**Text Colors:**
- `foreground` - Default text color
- `muted-foreground` - Secondary text
- `*-foreground` - Text that works on colored backgrounds

**Backgrounds:**
- `background` - Default page background
- `card` - Card/container backgrounds
- `muted` - Subtle backgrounds

### Custom Colors

Want to add custom colors to the palette?

1. Go to **Settings → Colors** tab
2. Add custom colors with:
   - Name (e.g., "Ocean Blue")
   - Slug (e.g., "ocean-blue")
   - Value (Hex: "#0066CC" or HSL: "210 100% 40%")

3. Custom colors will be available throughout the site!

---

## 💡 Best Practices

### Font Pairing

**Serif + Sans-Serif** (Classic)
- Headings: Playfair Display
- Body: Open Sans

**Geometric Pairing** (Modern)
- Headings: Montserrat
- Body: Lato

**Monospace Accent** (Tech)
- Headings: Geist Mono
- Body: Inter

**Elegant + Readable** (Editorial)
- Headings: Merriweather
- Body: Source Sans Pro

### Color Contrast

**High Contrast** - Best for readability
```
Background: White
Text: Black
Headings: Brand
```

**Soft Contrast** - Easier on eyes
```
Background: Muted
Text: Foreground
Headings: Primary
```

**Dark Mode** - For dark sections
```
Background: Brand/Black
Text: White
Headings: Accent
```

### Typography Hierarchy

1. **H1 - Hero Headings** - Largest, most prominent
2. **H2 - Section Headings** - Main content divisions
3. **H3 - Subsections** - Content organization
4. **H4-H6 - Smaller headings** - Fine-grained structure
5. **Body Text** - Main content
6. **Muted Text** - Secondary information

---

## 🔧 Technical Details

### Tailwind Integration

Fonts are added to Tailwind config:

```javascript
fontFamily: {
  inter: ['Inter', 'sans-serif'],
  roboto: ['Roboto', 'sans-serif'],
  playfair: ['Playfair Display', 'serif'],
  // ... etc
}
```

Classes are safelisted to prevent purging:
```javascript
safelist: [
  'font-inter',
  'font-roboto',
  'text-brand',
  '[&_h1]:text-brand',
  // ... etc
]
```

### CSS Variables

Theme colors use CSS variables for easy customization:

```css
--foreground: ...
--brand: ...
--primary: ...
```

These are defined in your theme configuration.

---

## 📋 Quick Reference

### Font Classes
```
font-sans, font-mono
font-inter, font-roboto, font-open-sans
font-lato, font-montserrat, font-playfair
font-merriweather, font-poppins
font-raleway, font-source-sans
```

### Text Color Classes
```
text-foreground
text-muted-foreground
text-brand, text-brand-foreground
text-primary, text-primary-foreground
text-secondary, text-secondary-foreground
text-white, text-black
```

### Heading Color Classes
```
[&_h1]:text-brand (applies to all h1 elements)
[&_h2]:text-primary
[&_h3]:text-accent
... etc
```

---

## 🚀 Common Workflows

### Setting Up Site Typography

1. Go to **Settings → Typography**
2. Choose default body font (e.g., Inter)
3. Choose heading font (e.g., Montserrat)
4. Set default text color: Foreground
5. Set default heading color: Brand
6. Save settings

Now all blocks inherit these defaults!

### Creating a Dark Hero Section

1. Add Hero block
2. Set background to Brand/Black
3. Override typography:
   - Text Color: White
   - Heading Color: White or Accent
4. Result: Beautiful dark hero with readable text

### Building a Landing Page

**Hero:**
- Font: Montserrat
- Heading Color: White
- Background: Brand

**Features Section:**
- Default fonts (inherited)
- Heading Color: Brand
- Background: Card

**Stats Block:**
- Font: Poppins
- Heading Color: Primary
- Text: Brand

**Testimonials:**
- Font: Merriweather (for readability)
- Default colors
- Background: Muted

**CTA:**
- Font: Montserrat
- Heading Color: White
- Background: Brand

---

## 🐛 Troubleshooting

**Fonts not loading?**
- Check browser console for errors
- Verify font name matches Google Fonts exactly
- Ensure weights are valid (100-900)

**Colors not applying?**
- Check that color slug matches theme
- Verify Tailwind safelist includes the class
- Regenerate types: `npm run payload generate:types`

**Typography not changing?**
- Clear browser cache
- Check block has typography overrides set
- Ensure "default" is not selected for overrides

**Custom font not appearing?**
- Save Settings after adding font
- Refresh admin panel
- Check slug has no spaces or special characters

---

## 📚 Resources

- [Google Fonts](https://fonts.google.com/) - Browse all available fonts
- [Font Pair](https://www.fontpair.co/) - Find great font combinations
- [Type Scale](https://typescale.com/) - Generate harmonious font sizes
- [Colorable](https://colorable.jxnblk.com/) - Check color contrast

---

**Your typography system is fully configured and ready to use!** 🎉

Enjoy beautiful, flexible typography across your entire site.
