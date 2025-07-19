# VoiceOver Developer Testing Guide

> **Part of the A11y Dev Workshop** - See [README.md](./README.md) for complete workshop setup and course overview.

## What is VoiceOver?

VoiceOver is Apple's built-in screen reader for macOS, included free with every Mac. It's widely used by blind and vision-impaired users and provides a comprehensive suite of accessibility testing tools. Unlike Windows screen readers, VoiceOver is deeply integrated into the operating system.

> **📖 For comprehensive VoiceOver documentation**, see the [Official VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac) - this developer guide focuses on testing essentials.

## Quick Setup for Developers

### Enable VoiceOver
**Method 1 - Keyboard**: `Command+F5` (toggle on/off)
**Method 2 - Touch ID Macs**: Triple-click Touch ID
**Method 3 - System Settings**: `Apple Menu` → `System Settings` → `Accessibility` → `VoiceOver`

### Essential Developer Settings

#### Understanding the VO (VoiceOver) Key
The **VO key** is your modifier key for all VoiceOver commands:
- **Default**: `Control+Option` (together)
- **Can be set to**: Caps Lock (easier for testing)

**To change VO key to Caps Lock**:
1. `System Settings` → `Accessibility` → `VoiceOver` → `Open VoiceOver Utility`
2. `General` → `Keys to use as the VoiceOver modifier` → Check `Caps Lock`

#### Control Speech for Development
Essential for developers who need to test without constant audio:

- **Pause/Resume Speech**: `Control` key
- **Stop Speech**: `VO+S`
- **Mute VoiceOver**: `VO+Shift+S` (toggle mute)
- **Speech Settings**: `VO+V` (opens speech menu)

#### Set Up for Visual Testing
**Caption Panel** (Shows VoiceOver output as text):
1. `VO+F8` → `Speech` → `Show Caption Panel`
2. Or `VO+Command+F10` to toggle Caption Panel
3. Keep this open during development for visual feedback

**Braille Viewer** (See braille output):
1. `VO+F8` → `Braille` → `Show Braille Viewer`
2. Useful for understanding how content translates to braille

## Essential VoiceOver Testing Commands

### Basic Navigation
| Command | Action |
|---------|--------|
| `Command+F5` | Start/Stop VoiceOver |
| `Control` | Pause/Resume speech |
| `VO+S` | Stop speech |
| `VO+Shift+S` | Mute/Unmute VoiceOver |
| `VO+H` | VoiceOver Help menu |

### Content Reading
| Command | Action |
|---------|--------|
| `VO+A` | Read All (from current position) |
| `VO+R` | Read row |
| `VO+C` | Read column |
| `VO+W` | Read word |
| `VO+L` | Read line |
| `VO+S` | Read sentence |
| `VO+P` | Read paragraph |

### Quick Navigation
Use the **Web Rotor** (`VO+U`) to navigate by element types:
- `VO+U` opens Web Rotor
- `Left/Right arrows` to change element type (headings, links, form controls, etc.)
- `Up/Down arrows` to navigate through items of that type
- `Enter` to jump to selected item

**Direct navigation** (like NVDA's single-key navigation):
- `VO+Command+H` - Next heading
- `VO+Command+Shift+H` - Previous heading
- `VO+Command+L` - Next link
- `VO+Command+J` - Next form control
- `VO+Command+T` - Next table
- `VO+Command+G` - Next graphic

### Essential Testing Commands
| Command | Purpose |
|---------|---------|
| `VO+U` | Web Rotor (browse by element type) |
| `VO+Shift+Space` | Toggle Quick Nav mode |
| `VO+F3` | Summarize page |
| `VO+T` | Read window title |
| `VO+F` | Find text on page |
| `VO+F1` | Get help for current item |

## Critical Accessibility Testing Scenarios

### 1. Page Structure Analysis
**Use Web Rotor** (`VO+U`):
- **Headings**: Check hierarchy and structure
- **Links**: Review link text quality
- **Form Controls**: Verify labels and types
- **Landmarks**: Check for main, navigation, etc.

**Quick structure check**:
1. `VO+F3` - Get page summary
2. `VO+U` → Select "Headings" → Browse heading structure
3. `VO+U` → Select "Landmarks" → Check page regions

### 2. Form Testing Workflow
1. **Navigate to form**: Use `VO+Command+J` or Tab
2. **Check labels**: Does VoiceOver announce clear labels?
3. **Test input**: Type in fields, verify feedback
4. **Error handling**: Submit invalid data, check error announcements
5. **Required fields**: Verify required status is announced

### 3. Image and Media Testing
- **Images**: `VO+U` → "Images" → Check alt text quality
- **Graphics**: Navigate with `VO+Command+G`
- **Audio/Video**: Check for controls and captions

### 4. Table Navigation
VoiceOver excels at table testing:
- **Find tables**: `VO+Command+T`
- **Navigate cells**: `VO+Arrow keys`
- **Read headers**: `VO+R` (row header), `VO+C` (column header)
- **Get table info**: `VO+Shift+T`

## Developer-Friendly VoiceOver Features

### Quick Nav Mode
**Toggle**: `VO+Shift+Space`

When enabled, use single keys for navigation (no VO modifier needed):
- `H` / `Shift+H` - Headings
- `L` / `Shift+L` - Links  
- `B` / `Shift+B` - Buttons
- `T` / `Shift+T` - Tables
- `G` / `Shift+G` - Graphics

**Perfect for rapid testing** - similar to NVDA's browse mode.

### Web Rotor (`VO+U`) - The Power Tool
Most important VoiceOver feature for developers:

**Element Types Available**:
- Headings (with level indicators)
- Links (with context)
- Form Controls (with types and states)
- Tables (with summary info)
- Landmarks (ARIA regions)
- Images (with alt text status)
- Static Text
- Visited Links

**Usage Tip**: Use Web Rotor to quickly audit all elements of one type across your entire page.

### VoiceOver Utility (Advanced Settings)
**Access**: `VO+F8` or System Settings → Accessibility → VoiceOver → Open VoiceOver Utility

**Useful Developer Settings**:
- **Speech**: Adjust rate, voice, punctuation level
- **Verbosity**: Control how much detail VoiceOver provides
- **Web**: Customize web browsing experience
- **Braille**: Set up braille viewer for additional testing

## Developer Debugging Workflow

### Step 1: Quick Structure Check
1. **Enable Caption Panel**: `VO+Command+F10`
2. **Page overview**: `VO+F3` for summary
3. **Heading check**: `VO+U` → Headings → Browse structure

### Step 2: Navigation Testing
1. **Quick Nav on**: `VO+Shift+Space`
2. **Tab through**: Check focus order and announcements  
3. **Heading navigation**: Press `H` to jump between headings
4. **Link testing**: Press `L` to check all links

### Step 3: Interactive Elements
1. **Form controls**: `VO+U` → Form Controls → Check labels
2. **Button testing**: Press `B` to find all buttons
3. **Test interactions**: Fill forms, activate buttons, check feedback

### Step 4: Document Issues
Use Caption Panel screenshots showing:
- Poor or missing labels
- Broken heading hierarchy
- Unlabeled graphics
- Generic button/link text

## Common Accessibility Issues VoiceOver Reveals

### 🚫 Bad Examples (What VoiceOver Announces)
- **Unlabeled button**: "Button"
- **Missing alt text**: "Image"
- **Generic link**: "Link, more"
- **No form label**: "Edit text" (just the field type)
- **Poor heading structure**: Skipping from H1 to H4

### ✅ Good Examples (What VoiceOver Should Announce)
- **Proper button**: "Submit Registration, button"
- **Good alt text**: "Bar chart showing 25% increase in quarterly sales"
- **Descriptive link**: "Download 2024 Annual Report, PDF, link"
- **Labeled form field**: "Email address, required, edit text"
- **Good headings**: Logical H1 → H2 → H3 progression

## Trackpad Gestures (For Trackpad Testing)

VoiceOver supports trackpad gestures on MacBooks:

### Basic Gestures
- **Single tap**: Select item
- **Double tap**: Activate item
- **Two-finger tap**: Stop speech
- **Three-finger tap**: Speak item
- **Rotor gesture**: Two fingers, rotate clockwise/counterclockwise

### Navigation Gestures
- **Swipe right**: Next item
- **Swipe left**: Previous item
- **Swipe up**: Read all
- **Swipe down**: Start reading from top

**Note**: Trackpad gestures simulate touch device experience, useful for testing mobile accessibility patterns.

## Advanced Testing Features

### Item Chooser (`VO+I`)
Alternative to Web Rotor - shows all page elements in a searchable list:
1. `VO+I` to open
2. Type to search for specific content
3. Arrow keys to browse
4. Enter to jump to item

### Hot Spots (`VO+Shift+N`)
Set bookmarks on complex pages:
1. Navigate to important location
2. `VO+Shift+N` → "Set Hot Spot"
3. `VO+N` to jump back later

### VoiceOver Commander (`VO+Enter`)
Type commands instead of using keyboard shortcuts:
- `VO+Enter` opens commander
- Type commands like "find text" or "next heading"
- Useful for complex navigation

## Testing Checklist for Developers

### Before Testing
- [ ] VoiceOver enabled (`Command+F5`)
- [ ] Caption Panel visible (`VO+Command+F10`)
- [ ] Speech rate comfortable for testing
- [ ] Quick Nav mode ready (`VO+Shift+Space`)

### Structure Test
- [ ] Page summary makes sense (`VO+F3`)
- [ ] Heading hierarchy logical (`VO+U` → Headings)
- [ ] Landmarks present (`VO+U` → Landmarks)
- [ ] Reading order logical (`VO+A` read all)

### Interactive Elements Test
- [ ] All controls reachable by Tab/Quick Nav
- [ ] Form fields have clear labels
- [ ] Buttons describe their purpose
- [ ] Error messages announced and helpful
- [ ] Focus indicators visible and logical

### Content Test
- [ ] Images have appropriate alt text (`VO+U` → Images)
- [ ] Links are descriptive (`VO+U` → Links)
- [ ] Tables have proper headers and navigation
- [ ] Complex content has adequate descriptions

## Quick Reference Card

**Start Testing**: `Command+F5` → `VO+Command+F10` (Caption Panel) → `VO+Shift+Space` (Quick Nav)
**Stop Speech**: `Control` key
**Emergency Exit**: `Command+F5`

**Most Used Commands for Developers:**
- `VO+U` - Web Rotor (essential!)
- `H` / `Shift+H` - Navigate headings (Quick Nav mode)
- `L` / `Shift+L` - Navigate links (Quick Nav mode)
- `VO+F3` - Page summary
- `Control` - Pause speech

## Troubleshooting

### VoiceOver Not Speaking
1. Check if muted (`VO+Shift+S` to unmute)
2. Try `VO+S` to stop, then navigate to restart speech
3. Check system volume and VoiceOver volume (`VO+V`)
4. Restart VoiceOver (`Command+F5` twice)

### Navigation Issues
1. Toggle Quick Nav mode (`VO+Shift+Space`)
2. Check if in form vs. browse mode
3. Use `VO+U` Web Rotor as fallback navigation
4. Try `VO+F1` for context-specific help

### Can't Find Elements
1. Use `VO+F` to find text
2. Try `VO+I` Item Chooser for comprehensive search
3. Check `VO+U` Web Rotor different element types
4. Use `VO+F3` to understand page structure

### Testing Web Apps vs Native Apps
- **Web content**: Use Safari for best VoiceOver support
- **React/Vue/Angular**: Test in Safari, not just Chrome
- **Focus management**: Check custom focus handling in SPAs
- **Live regions**: Test dynamic content updates

## VoiceOver vs NVDA: Key Differences for Developers

### VoiceOver Advantages
- **Built into macOS**: No separate installation
- **Trackpad support**: Test touch-like interactions
- **Deep system integration**: Better app testing
- **Web Rotor**: Powerful element browsing
- **Caption Panel**: Built-in visual output

### Testing Strategy
1. **Primary testing**: Use both NVDA (Windows) and VoiceOver (macOS)
2. **Quick audits**: VoiceOver's Web Rotor is faster for structure checking
3. **Form testing**: Both tools excel, but VoiceOver's integration is smoother
4. **Mobile prep**: VoiceOver trackpad gestures help understand mobile patterns

---

**Remember**: VoiceOver is the gateway to understanding how your site works on iOS devices too. The navigation patterns are similar, so desktop VoiceOver testing prepares you for mobile accessibility.

**Pro Tip**: Keep Caption Panel open during development and glance at it frequently. Like NVDA's Speech Viewer, it catches accessibility issues in real-time without audio distraction.

## Additional Resources

- **📋 Workshop Overview**: [README.md](./README.md) - Complete course setup and objectives
- **🛠️ Fix Instructions**: [how-to-fix.md](./how-to-fix.md) - Step-by-step accessibility remediation
- **🪟 NVDA Testing**: [nvda.md](./nvda.md) - Windows screen reader testing guide
- **📖 Official VoiceOver User Guide**: [support.apple.com/guide/voiceover](https://support.apple.com/guide/voiceover/welcome/mac) - Complete VoiceOver documentation
- **🍎 VoiceOver on iOS**: [support.apple.com/accessibility](https://support.apple.com/accessibility/iphone/) - Mobile VoiceOver guide
