# NVDA Developer Testing Guide

> **Part of the A11y Dev Workshop** - See [README.md](./README.md) for complete workshop setup and course overview.

## What is NVDA?

NVDA (NonVisual Desktop Access) is a free, open-source screen reader for Windows that enables blind and vision-impaired users to access computers using synthetic speech and braille. It's the most popular free screen reader and essential for accessibility testing.

> **📖 For comprehensive NVDA documentation**, see the [Official NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html) - this developer guide focuses on testing essentials.

## Quick Setup for Developers

### Installation
1. **Download**: Visit [nvaccess.org/download](https://www.nvaccess.org/download/)
2. **Install**: Run the installer and choose "Install NVDA on this computer"
3. **Start**: Press `Ctrl+Alt+N` or find NVDA in the Start Menu

### Essential Developer Settings

#### Enable Speech Viewer (Critical for Developers)
The Speech Viewer shows NVDA's speech output as text - perfect for developers who need to see what's being announced without audio:

1. **Access**: `NVDA Menu` → `Tools` → `Speech Viewer`
2. **Or use hotkey**: `NVDA+Control+S` (if configured)
3. **Keep open**: Check "Show speech viewer on startup"

**Why Speech Viewer is Essential:**
- See exactly what screen reader users hear
- Debug accessibility issues without audio interference
- Document accessibility problems with visual proof
- Share screenshots of speech output with team

#### Turn Off/Control Speech
When testing, you often need to silence NVDA:

- **Stop speech immediately**: Press `Control` key
- **Pause/resume speech**: Press `Shift` key  
- **Toggle speech on/off**: `NVDA+S` (cycles through speech modes)

#### Speech Modes for Testing
`NVDA+S` cycles through these modes:
- **Talk**: Normal mode (everything announced)
- **On-demand**: Only speaks when you request it
- **Off**: No speech at all
- **Beeps**: Replaces speech with beeps

## Essential NVDA Testing Commands

### Basic Navigation (Desktop Layout)
| Command | Action |
|---------|--------|
| `NVDA+Control+N` | Start NVDA |
| `NVDA+Q` | Quit NVDA |
| `Control` | Stop speech immediately |
| `Shift` | Pause/resume speech |
| `NVDA+S` | Cycle speech modes |

### Reading Content
| Command | Action |
|---------|--------|
| `NVDA+Down Arrow` | Say All (read from current position) |
| `NVDA+Up Arrow` | Read current line |
| `NVDA+Tab` | Report current focus |
| `NVDA+T` | Report window title |
| `NVDA+B` | Read entire window |

### Quick Navigation (Browse Mode)
| Key | Navigate To |
|-----|-------------|
| `H` | Next heading |
| `Shift+H` | Previous heading |
| `1-6` | Headings by level (H1, H2, etc.) |
| `K` | Next link |
| `Shift+K` | Previous link |
| `F` | Next form field |
| `Shift+F` | Previous form field |
| `T` | Next table |
| `B` | Next button |
| `G` | Next graphic |
| `L` | Next list |
| `I` | Next list item |

### Essential Testing Commands
| Command | Purpose |
|---------|---------|
| `NVDA+F7` | Elements List (browse headings, links, etc.) |
| `NVDA+F` | Report formatting |
| `NVDA+K` | Report link destination |
| `NVDA+Insert` | Switch to Focus Mode (forms) |
| `Escape` | Switch to Browse Mode |

## Critical Accessibility Testing Scenarios

### 1. Form Testing
- **Tab through forms**: Can you reach all controls?
- **Form labels**: Does NVDA announce proper labels?
- **Error messages**: Are validation errors announced?
- **Required fields**: Does NVDA indicate required status?

### 2. Heading Structure
- **Press `H`**: Navigate through headings
- **Use `NVDA+F7`**: Open Elements List → Headings
- **Check hierarchy**: Are headings properly nested (H1→H2→H3)?

### 3. Link Testing
- **Press `K`**: Navigate through links
- **Check descriptions**: Do links have meaningful text?
- **Purpose clarity**: Is link destination clear from context?

### 4. Image Testing
- **Press `G`**: Navigate through graphics
- **Alt text check**: Does NVDA read appropriate descriptions?
- **Decorative images**: Are they properly ignored?

### 5. Table Testing
- **Press `T`**: Navigate to tables
- **Header announcement**: Are column/row headers read?
- **Cell navigation**: Use `Ctrl+Alt+Arrow keys` to navigate cells

## Developer Debugging Workflow

### Step 1: Enable Speech Viewer
Always start with Speech Viewer enabled so you can see NVDA's output.

### Step 2: Use Browse Mode for Structure
- Start with `NVDA+Down Arrow` (Say All) to get overview
- Use `H` to check heading structure
- Use `NVDA+F7` to see elements list

### Step 3: Test Interactive Elements
- Tab through all interactive elements
- Check form labels and error handling
- Verify button and link descriptions

### Step 4: Document Issues
Screenshot the Speech Viewer showing:
- Missing or poor alt text
- Unlabeled form controls
- Poor heading structure
- Generic link text

## Common Accessibility Issues NVDA Reveals

### 🚫 Bad Examples (What NVDA Announces)
- **Unlabeled button**: "Button"
- **Missing alt text**: "Graphic"
- **Generic link**: "Click here"
- **Poor heading structure**: "Heading level 1, Heading level 4" (skipping levels)

### ✅ Good Examples (What NVDA Should Announce)
- **Proper button**: "Submit form, button"
- **Good alt text**: "Chart showing sales increased 25% in Q3"
- **Descriptive link**: "Download Q3 financial report PDF"
- **Good headings**: "Overview, heading level 1", "Sales data, heading level 2"

## Advanced Developer Features

### Elements List (`NVDA+F7`)
Critical for testing site structure:
- **Headings tab**: Check heading hierarchy
- **Links tab**: Review all link text
- **Form fields tab**: See all form controls
- **Buttons tab**: Review button labels

### Input Help Mode (`NVDA+1`)
When enabled, NVDA announces what each key does instead of performing the action. Useful for learning commands.

### Configuration for Development
**Essential NVDA settings for developers:**
1. **Speech Viewer**: Always enabled
2. **Braille Viewer**: Helpful for understanding braille output
3. **Speech rate**: Slow down for detailed testing
4. **Punctuation level**: Set to "All" for detailed feedback

## Testing Checklist for Developers

### Before Testing
- [ ] NVDA installed and running
- [ ] Speech Viewer enabled
- [ ] Test page loaded in browser
- [ ] Headphones ready (if testing with audio)

### Structure Test
- [ ] Navigate headings with `H` - proper hierarchy?
- [ ] Check `NVDA+F7` Elements List - organized well?
- [ ] Test `NVDA+Down Arrow` Say All - logical reading order?

### Interactive Elements Test
- [ ] Tab through all controls - everything reachable?
- [ ] Form labels clear and descriptive?
- [ ] Error messages announced properly?
- [ ] Button purposes clear?

### Content Test
- [ ] All images have appropriate alt text or are marked decorative?
- [ ] Links descriptive and meaningful?
- [ ] Tables have proper headers?
- [ ] Complex content has adequate descriptions?

## Quick Reference Card

**Start Testing**: `Ctrl+Alt+N` → Enable Speech Viewer → Navigate with `Tab` and `H`
**Stop Speech**: `Control` key
**Emergency Exit**: `NVDA+Q`

**Most Used Commands for Developers:**
- `H` / `Shift+H` - Browse headings
- `Tab` / `Shift+Tab` - Navigate interactive elements  
- `NVDA+F7` - Elements List (super useful!)
- `NVDA+Down Arrow` - Say All
- `Control` - Stop speech

## Troubleshooting

### NVDA Not Speaking
1. Check Speech Viewer - is text appearing?
2. Press `NVDA+S` to cycle speech modes
3. Check audio settings in Windows
4. Restart NVDA with `NVDA+Q` then `Ctrl+Alt+N`

### Missing Elements
1. Try Browse Mode vs Focus Mode (`Insert` / `Escape`)
2. Check if JavaScript is modifying content
3. Use Elements List (`NVDA+F7`) to find hidden elements

### Strange Announcements
1. Check for aria-labels and roles
2. Look for CSS that affects screen readers
3. Test with Speech Viewer to see exact output

---

**Remember**: NVDA reveals how your site actually works for screen reader users. What looks perfect visually might be completely broken for accessibility. Always test with Speech Viewer enabled to catch issues early!

**Pro Tip**: Keep NVDA running in the background during development. Every few changes, quickly tab through your interface to catch accessibility regressions immediately.

## Additional Resources

- **📋 Workshop Overview**: [README.md](./README.md) - Complete course setup and objectives
- **🛠️ Fix Instructions**: [how-to-fix.md](./how-to-fix.md) - Step-by-step accessibility remediation
- **🍎 VoiceOver Testing**: [voiceOver.md](./voiceOver.md) - macOS screen reader testing guide
- **📖 Official NVDA User Guide**: [nvaccess.org/documentation](https://www.nvaccess.org/files/nvda/documentation/userGuide.html) - Complete NVDA documentation
- **🎓 NVDA Training**: [nvaccess.org/get-help](https://www.nvaccess.org/get-help/) - Official training resources
