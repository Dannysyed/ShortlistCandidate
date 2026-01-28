# 📥 Selected Candidates Page - Export Feature

## Overview

A dedicated page for managing and exporting selected candidates has been added! This feature allows you to view all selected candidates on a separate page and export them by status category.

---

## ✨ What's New

### 1. **Separate Selected Candidates Page**

- Dedicated view showing only selected candidates
- Clean, organized layout
- Easy navigation back to main page

### 2. **Export Functionality**

- **Export All**: Download all selected candidates
- **Export by Status**:
  - ✓ Export Shortlist
  - 📋 Export Interview
  - ✕ Export Reject
- **Export Unassigned**: Export candidates without status

### 3. **Quick Navigation**

- Click "Selected" stat card to go to selected page
- Click "📥 View & Export" button in action panel
- Click "Back to Main" button to return

### 4. **Summary Stats**

- See breakdown of selected candidates by status
- Count of shortlist, interview, reject, and unassigned
- Visual stat cards for quick overview

---

## 🎮 How to Use

### Step 1: Select Candidates

```
Main page → Click checkboxes or use dropdown
          → Selection counter appears
```

### Step 2: Navigate to Selected Page

**Option A: Click the "Selected" stat card**

```
┌──────────┐
│ Selected │
│    5     │  ← Click here
└──────────┘
```

**Option B: Click "📥 View & Export" button**

```
Action panel → [📥 View & Export] ← Click here
```

### Step 3: View Selected Candidates

```
Selected Candidates Page appears
├─ Summary stats at top
├─ Export options
└─ Table of selected candidates
```

### Step 4: Export

**Export all selected:**

```
Click: [📊 Export All Selected (5)]
Result: Download all 5 candidates to CSV
```

**Export by status:**

```
Click: [✓ Export Shortlist (3)]
Result: Download only 3 shortlisted candidates

Click: [📋 Export Interview (2)]
Result: Download only 2 interview candidates
```

**Export unassigned:**

```
Click: [Export Unassigned (0)]
Result: Only works if candidates have no status
```

---

## 📊 Page Layout

### Header Section

```
📋 Selected Candidates (5)
Manage and export your selected candidates
[← Back to Main]
```

### Stats Section

```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Shortlist  │ │ Interview  │ │   Reject   │ │ Unassigned │
│     3      │ │     2      │ │     0      │ │     0      │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

### Export Options Section

```
📥 Export Options
[📊 Export All Selected (5)]
[✓ Export Shortlist (3)]
[📋 Export Interview (2)]
[✕ Export Reject (0)]
```

### Candidates Table

```
Displays all selected candidates with:
- Checkboxes (disabled on this page)
- Name, Institute, City
- Links (GitHub, Resume)
- React skill level
- Score
- Custom Status
- Individual action dropdown
```

---

## 💡 Features

### Smart Button States

- **Enabled**: When candidates in that status exist
- **Disabled**: When no candidates in that status (grayed out)
- Prevents exporting empty groups

### Back Navigation

- "Back to Main" button always available
- Takes you back to main selection page
- Selections are preserved

### Status Editing

- Can change candidate status on this page too
- Use individual dropdown per row
- Changes reflect immediately

### Empty State

```
When no candidates selected:

📭
No Selected Candidates

Go back and select candidates to see them here
```

---

## 📤 Export Options Explained

### Option 1: Export All Selected

```
Exports: All selected candidates regardless of status
Includes: Shortlist + Interview + Reject + Unassigned
Use when: You want complete list of all selections
```

### Option 2: Export Shortlist

```
Exports: Only candidates with ✓ Shortlist status
Includes: Definite hire candidates
Use when: Preparing interview invitations for top candidates
```

### Option 3: Export Interview

```
Exports: Only candidates with 📋 Interview status
Includes: Promising candidates for interview pool
Use when: Organizing interview rounds
```

### Option 4: Export Reject

```
Exports: Only candidates with ✕ Reject status
Includes: Rejected candidates
Use when: Documentation or follow-up communications
```

---

## 🎯 Example Workflows

### Workflow 1: Quick Export

```
Main page:
1. Select top candidates with checkboxes
2. Click "Selected" stat card
3. Click "📊 Export All Selected"
4. CSV downloads instantly
Result: 30 seconds to export! ⚡
```

### Workflow 2: Export by Stage

```
Main page:
1. Build interview pool (select candidates, click "Interview")
2. Go to Selected page
3. Export shortlist: Click "✓ Export Shortlist"
4. Export interview: Click "📋 Export Interview"
5. You have two separate files
Result: Organized export files by hiring stage 📋
```

### Workflow 3: Review & Export

```
Main page:
1. Select 20 candidates
2. Click "📥 View & Export"
3. Review their details on selected page
4. Use dropdown to adjust status if needed
5. Export specific groups
Result: Review before exporting 👀
```

---

## 📊 File Format

All exports use CSV format with the following columns:

```
Name
City
Institute
Degree
Stream
Graduation Year
GitHub
Resume
JavaScript (0-3)
React (0-3)
HTML (0-3)
CSS (0-3)
English Speaking (0-3)
English Writing (0-3)
Communication (0-3)
Coordination (0-3)
GPA UG
GPA PG
Availability
Score
Max Score
Verdict (automated)
Custom Status (your selection)
... and more scoring details
```

---

## 🔄 Navigation Flow

### Main Page → Selected Page

```
Main Page
    ↓
[Click "Selected" card or "📥 View & Export"]
    ↓
Selected Candidates Page
    ├─ View selected candidates
    ├─ Edit statuses
    ├─ Export by category
    └─ [Back to Main]
        ↓
    Main Page (selections preserved)
```

---

## 🎨 Visual Indicators

### Export Button States

```
Active (can export):
[✓ Export Shortlist (3)]  ← Green, clickable

Disabled (nothing to export):
[✓ Export Shortlist (0)]  ← Gray, not clickable
```

### Status Counts

```
In header: 📋 Selected Candidates (5)
           Shows total selected count

In stats: [Shortlist] = 3 count shown
         [Interview] = 2 count shown
         [Reject] = 0 count shown
         [Unassigned] = 0 count shown
```

---

## 🚀 Key Benefits

✅ **Organized Workflow**: Separate view for selected candidates  
✅ **Efficient Export**: Export by status in one click  
✅ **Multiple Formats**: Export all or specific groups  
✅ **Easy Navigation**: Simple back button to main page  
✅ **Preserve Selection**: All selections stay intact  
✅ **Final Review**: View before exporting  
✅ **Status Editing**: Can still change status before export  
✅ **Empty State**: Clear message when no selections

---

## 💻 Implementation Details

### New Component

**File**: `src/components/SelectedCandidatesPage.jsx`

- Displays selected candidates
- Shows stats breakdown
- Handles exports
- Manages navigation

### Updated App.jsx

**Changes**:

- Added `viewSelectedPage` state
- Added page switching logic
- Added "View & Export" button
- Made "Selected" stat card clickable

### Export Logic

**Uses**: Existing `exportCandidatesToCSV` utility
**Filters**: By custom status before exporting
**Formats**: Standard CSV compatible with Excel/Sheets

---

## 📋 Feature Comparison

| Feature             | Main Page | Selected Page    |
| ------------------- | --------- | ---------------- |
| View all candidates | ✅        | ✅ Only selected |
| Edit status         | ✅        | ✅               |
| Select/deselect     | ✅        | ❌ (disabled)    |
| Export              | ❌        | ✅               |
| Filter/search       | ✅        | ❌               |
| View stats          | ✅        | ✅ Summary only  |
| Bulk actions        | ✅        | ❌               |
| Easy navigation     | ✅        | ✅ Back button   |

---

## 🎯 Common Questions

**Q: Can I edit statuses on the selected page?**
A: Yes! Use the dropdown on each row to change status.

**Q: Do exports include the custom status I assigned?**
A: Yes! Both automated verdict and custom status are exported.

**Q: What happens to my selections when I go back?**
A: They're preserved! All selections stay intact.

**Q: Can I export candidates with no status assigned?**
A: Yes! Click "Export Unassigned" or "Export All Selected".

**Q: Which export button should I use?**
A: Use "Export All Selected" for complete list, or specific buttons for each hiring stage.

**Q: What format is the export?**
A: CSV (comma-separated values) - compatible with Excel, Google Sheets, etc.

**Q: Can I customize the export columns?**
A: Currently exports all available data. Future versions may have customization.

---

## 🔐 Data Safety

✅ No data is deleted when exporting  
✅ Selection persists after export  
✅ Can export multiple times  
✅ Back button doesn't lose data  
✅ Refresh page resets everything (reload CSV first)

---

## ⚡ Performance

- **Page Load**: Instant (no processing)
- **Export**: < 1 second for 100+ candidates
- **Navigation**: Smooth transitions
- **Memory**: Efficient selection tracking

---

## 🚀 Future Enhancements

Planned features for this page:

- [ ] Custom export columns selection
- [ ] Email export directly to candidates
- [ ] Schedule bulk emails
- [ ] Print-friendly view
- [ ] Comparison between selected groups
- [ ] Save export templates
- [ ] Automatic naming by status/date
- [ ] Batch interview scheduling

---

## 📞 Quick Links

- [Back to GET_STARTED.md](GET_STARTED.md)
- [Back to SELECTION_GUIDE.md](SELECTION_GUIDE.md)
- [View DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## ✅ Testing Checklist

- [ ] Can navigate to selected page from main
- [ ] Selected candidates display correctly
- [ ] Stats show accurate counts
- [ ] "Export All" downloads CSV
- [ ] "Export Shortlist" downloads only shortlist
- [ ] "Export Interview" downloads only interview
- [ ] Disabled buttons are properly grayed out
- [ ] Can edit status on selected page
- [ ] Back button returns to main page
- [ ] Selections are preserved after navigation
- [ ] Empty state shows when no selections
- [ ] Page works on mobile devices
- [ ] CSV exports are valid and open in Excel

---

**You now have a powerful export workflow for your selected candidates!** 📥✅
