# Manual Candidate Selection Guide 🎯

## Overview

The tool has been enhanced to give you **full control over candidate selection** with an intuitive interface for reviewing, filtering, and organizing candidates manually.

---

## ✨ New Features

### 1. **Checkbox Selection**

- **How it works**: Each candidate row has a checkbox on the left side
- **Select individual**: Click any candidate checkbox to select/deselect them
- **Select all**: Click the checkbox in the header to select/deselect all visible candidates
- **Visual feedback**: Selected rows are highlighted in light orange with a left border

### 2. **Live Selection Counter**

- Shows how many candidates you've selected
- Appears as a new stat card when you have selections
- Animated pulse effect to draw attention

### 3. **Bulk Actions Panel**

- **When it appears**: After selecting 1 or more candidates
- **Available actions**:
  - ✓ **Shortlist** - Mark candidates for immediate interviews
  - 📋 **Interview** - Add to interview pool
  - ✕ **Reject** - Decline candidates
  - Clear Selection - Deselect all

### 4. **Individual Action Dropdown**

- **Location**: Last column of each row ("Action")
- **Quick status assignment**: Set custom status per candidate without bulk selection
- **Status override**: Overrides the automated verdict if needed

### 5. **Status Display**

When a custom status is applied, the Verdict column shows:

- ✓ **Shortlist** (green background)
- 📋 **Interview** (blue background)
- ✕ **Reject** (red background)

---

## 🎮 How to Use

### Workflow 1: Filter → Select → Bulk Assign

```
1. Upload CSV file
2. Use Search/Filter to narrow down candidates
3. Select candidates by clicking checkboxes
4. Click bulk action button (Shortlist/Interview/Reject)
5. Selection clears automatically after action
```

### Workflow 2: Individual Quick Decisions

```
1. Upload CSV file
2. For each candidate, use the "Action" dropdown
3. Select status (Shortlist/Interview/Reject)
4. Status appears in the Verdict column
```

### Workflow 3: Mixed Approach

```
1. Use search to find specific candidates (e.g., React = 3)
2. Bulk select multiple candidates
3. Apply action to group
4. Use individual dropdown for edge cases
```

---

## 📊 Interface Layout

### Header Section

- Title: "Intern Shortlisting Tool"
- Subtitle: "Upload Internshala CSV and manually select top candidates"

### Stats Row

- **Strong Interview**: Automated high-score count
- **Interview**: Automated medium-score count
- **Screen Further**: Candidates needing review
- **Maybe**: Borderline candidates
- **Reject**: Low-score candidates
- **Selected**: Your current selection count (appears only when selecting)

### Selection Panel

Appears when candidates are selected:

```
[Selected count] candidate(s) selected
[✓ Shortlist] [📋 Interview] [✕ Reject] [Clear Selection]
```

### Candidate Table

| Column        | Feature                                    |
| ------------- | ------------------------------------------ |
| **☐**         | Checkbox for selection                     |
| **Name**      | Candidate name (clickable → details modal) |
| **Institute** | College/university                         |
| **City**      | Location                                   |
| **Links**     | 👤 (GitHub) and 📄 (Resume) icons          |
| **React**     | React skill level (0-3)                    |
| **Score**     | Calculated score                           |
| **Verdict**   | Auto-verdict or custom status              |
| **Action**    | Dropdown for quick status assignment       |

---

## 💡 Tips & Best Practices

### Finding Top Candidates

1. Sort by **Score** (descending) to see highest rated first
2. Filter by **React skill** (3 only) for specialized roles
3. Sort by **Verdict** to group recommendations

### Efficient Selection

- Use "Select All" checkbox to quickly select filtered results
- Apply bulk action to entire filtered group
- Then deselect any exceptions

### Sorting & Filtering

- Click column headers to sort (Name, Institute, City, Score, Verdict)
- Use Search Filter to narrow by skills, location, or keywords
- Sorting works with filtered results

### Combining Feedback

- Automated verdict: Based on scoring algorithm
- Custom status: Your manual override
- Both visible in the verdict column

---

## 🔄 Data Persistence

**Important Notes:**

- Selected candidates are stored during your session
- Statuses persist as long as the page is open
- Refreshing the page clears selections (upload CSV again)
- **Export feature** coming soon to save your selections

---

## 🎯 Example Scenarios

### Scenario 1: Find React Experts

1. Sort by Score (descending)
2. Use Search to filter: "React: 3"
3. Select matching candidates
4. Click "Shortlist"
5. Review in details modal for final decisions

### Scenario 2: Balanced Pool Selection

1. Select all candidates (use header checkbox)
2. Click "Interview" to add all to interview pool
3. Then individually downgrade weak candidates using Action dropdown

### Scenario 3: Location-Based Hiring

1. Use Search Filter for "City: Bangalore"
2. This shows only Bangalore candidates
3. Select all visible
4. Apply "Shortlist" action
5. Clear filter and repeat for other locations

---

## 🚀 Keyboard Tips

- **Spacebar on row**: Check/uncheck if row is focused
- **Ctrl/Cmd + Click**: Multiple selection (standard browser behavior)
- **Shift + Click**: Range selection (standard browser behavior)

---

## ❓ FAQ

**Q: Can I undo a bulk action?**
A: The checkboxes remain visible even after action. You can reselect the same candidates and choose a different action. We recommend reviewing in the details modal before confirming.

**Q: What happens to the automated verdict?**
A: The automated verdict is always calculated. Your custom status (via dropdown or bulk action) **overrides** it in the display.

**Q: Can I export my selections?**
A: Currently selections are session-based. Feature to export custom statuses is coming soon.

**Q: Why do some candidates have no verdict?**
A: All candidates get an automated verdict. If you don't assign a custom status, the automated verdict shows. If you assign a custom status, that appears instead.

---

## 📝 Next Steps

After selecting candidates:

1. **Review Details**: Click any candidate name to see full profile
2. **Check Links**: Access GitHub and Resume links directly
3. **Confirm Decisions**: See detailed scoring breakdown in modal
4. **Export**: Save your list (feature in development)

---

## 🎨 Visual Guide

### Row Colors

- **Orange highlight**: Selected row (with left orange border)
- **Alternating white/gray**: Unselected rows
- **Hover effect**: Subtle gray background on hover (if not selected)

### Badge Colors

- **Green**: Strong scores/shortlist status
- **Blue**: Interview status/good matches
- **Yellow**: Borderline candidates
- **Red**: Reject status/low scores
- **Orange**: Selected state

---

Happy selecting! 🎉
