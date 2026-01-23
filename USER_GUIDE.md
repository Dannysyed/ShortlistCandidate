# 🎓 Intern Shortlisting Tool - User Guide

## Getting Started

### 1. Open the Application

- Navigate to **http://localhost:5173** in your browser
- You'll see the main interface with upload section

### 2. Upload Your CSV File

- Click **"Upload Internshala CSV"**
- Select your CSV file from Internshala
- The system will automatically:
  - Parse all candidate data
  - Calculate scores for each candidate
  - Display statistics
  - Load results in the table

---

## Understanding the Dashboard

### Stats Section

Shows breakdown of all candidates by verdict:

- 🟢 **Strong Interview** (18-25 points) - Top candidates
- 🟢 **Interview** (14-17 points) - Qualified candidates
- 🟠 **Screen Further** (10-13 points) - Worth reviewing
- 🟡 **Maybe** (6-9 points) - Borderline candidates
- 🔴 **Reject** (0-5 points) - Not a fit

### Main Table

Shows quick overview of each candidate:

- **Name** - Candidate name
- **Institute** - Educational institution
- **City** - Location
- **React** - React skill rating (color-coded badge)
- **Score** - Final score out of 25
- **Verdict** - Category with color indicator

---

## Using Search & Filter

### Quick Filter Options

Located above the candidate table:

1. **Text Search**
   - Search by candidate name or institute
   - Case-insensitive
   - Real-time results

2. **Verdict Filter**
   - Show only specific verdict categories
   - Options: All / Strong Interview / Interview / Screen Further / Maybe / Reject

3. **Score Range**
   - Slider to filter by score (0-25)
   - Set minimum and maximum scores
   - E.g., show only 14+ (Interview quality)

4. **City Filter**
   - Filter by location
   - Auto-populated from candidates
   - Show Bangalore-based interns

5. **Availability Filter**
   - Filter by availability status
   - E.g., "Immediately", "After exams", etc.

### Example Searches

- **Find all top candidates**: Score 18-25 + Verdict "Strong Interview"
- **Find Bangalore interns ready now**: City "Bangalore" + Availability "Immediately"
- **Review medium candidates**: Score 10-13 + Verdict "Screen Further"
- **Quick search by name**: Search "Ananya"

---

## Viewing Candidate Details

### Click to Open Modal

- **Click any table row** to see full candidate profile
- Modal opens as overlay on same page
- Shows complete information

### What You'll See

**Header Section**

- Candidate name
- Institute and stream
- Close button (top right)

**Score Summary**

- Overall score (e.g., 21/25)
- Verdict category with color
- Quick stats (city, graduation year, availability, GitHub status)

**Technical Skills Section**

- JavaScript (progress bar, 0-3)
- React (progress bar, 0-3)
- HTML (progress bar, 0-3)
- CSS (progress bar, 0-3)

**Soft Skills Section**

- English Spoken (0-3)
- English Written (0-3)
- Communication (0-3)
- Coordination (0-3)

**Academic Performance Section**

- GPA UG (Undergraduate)
- GPA PG (Postgraduate)
- GPA 12th (if available)
- GPA 10th (if available)

**Score Breakdown Section**

- GitHub Profile: X/2 points
- Technical Skills: X/10 points
- React Expertise: X/3 points
- Soft Skills: X/5 points
- Academic: X/3 points
- Availability: X/1 points
- Location: X/1 points
- Degree: X/1 points
- **Total: X/25 points**

### Close Modal

- Click the **X button** in top right, or
- Click outside the modal (dark area)

---

## Exporting Results

### Download CSV for Team

- Click **"📥 Export Results"** button (appears after upload)
- File downloads automatically
- Filename: `shortlist-[timestamp].csv`

### What's Included

Each row contains:

- Name, City, Institute, Degree, Stream
- Graduation year
- GitHub URL
- All skill ratings (JavaScript, React, HTML, CSS)
- All soft skills (English, Communication, etc.)
- GPA values
- Availability
- **Score and Verdict**
- **Score breakdown by factor**

### Using the Export

- Open in Excel or Google Sheets
- Sort by score or verdict
- Share with hiring managers
- Print for reference
- Archive for records

---

## Understanding Scores

### How Scoring Works

**GitHub Profile (0-2 points)**

- 0 points: No GitHub link provided
- 1 point: GitHub link found but not validated
- 2 points: Valid GitHub profile or repository

**Technical Skills (0-10 points)**

- Sum of: JavaScript + React + HTML + CSS (each 0-3 scale)
- Capped at 10 maximum

**React Expertise (0-3 points)**

- Bonus for React specialization
- React rating × 1.5, capped at 3
- E.g., React 2/3 = 3 points, React 1/3 = 1.5→2 points

**Soft Skills (0-5 points)**

- Sum of: English Spoken + English Written + Communication + Coordination
- Capped at 5 maximum

**Academic Performance (0-3 points)**

- GPA 9+ = 3 points
- GPA 8-9 = 2.5 points
- GPA 7-8 = 2 points
- GPA 6-7 = 1 point
- GPA <6 = 0 points

**Availability (0-1 point)**

- 1 point: Immediately available
- 0 points: Otherwise

**Location (0-1 point)**

- 1 point: Bangalore or Bengaluru
- 0 points: Other cities

**Degree Relevance (0-1 point)**

- 1 point: IT, CS, or Engineering degree
- 0 points: Other degrees

### Example Score

```
Candidate: Ananya Singh
GitHub:           2/2 ✓
Tech Skills:      8/10 (JS:3 + React:3 + HTML:1 + CSS:1)
React Bonus:      3/3 ✓
Soft Skills:      4/5 (English:2+1, Communication:1, Coordination:0)
Academic:        2/3 (GPA 7.8)
Availability:     1/1 ✓
Location:         1/1 ✓ (Bangalore)
Degree:           0/1 (Not IT/CS)
─────────────────────────
Total:           21/25 → "Strong Interview" 🟢
```

---

## Verdict Categories Explained

### 🟢 Strong Interview (18-25 points)

**Action**: Schedule interviews immediately

- Excellent candidate pool
- High technical skills
- Good soft skills
- Available and motivated
- Likely high performers

### 🟢 Interview (14-17 points)

**Action**: Schedule interviews

- Good technical skills
- Adequate soft skills
- Some missing pieces
- Good potential

### 🟠 Screen Further (10-13 points)

**Action**: Phone screen or detailed review

- Moderate skills
- Some gaps to assess
- Needs deeper conversation
- Potential with training

### 🟡 Maybe (6-9 points)

**Action**: Consider other candidates first

- Limited relevant skills
- Significant gaps
- Borderline fit
- Review only if desperate

### 🔴 Reject (0-5 points)

**Action**: Do not interview

- Insufficient skills
- Major gaps
- Not ready yet
- Focus on better candidates

---

## Tips for Better Shortlisting

### 1. **Set Clear Criteria**

- Decide minimum score for interview
- Example: Only interview candidates with 14+ points

### 2. **Use Filters Effectively**

- Filter by verdict first
- Then refine with score range
- Then check by location/availability

### 3. **Check Skill Balance**

- Look for balanced skills, not just high score
- A candidate with 2/3 in all skills might be better than 3/3 in one skill
- React expertise bonus helps identify specialists

### 4. **Consider Your Needs**

- For short-term interns: Prioritize "Immediately" availability
- For technical roles: Look at React/JavaScript/technical scores
- For communication roles: Look at soft skills

### 5. **Review Edge Cases**

- High scorers: Always interview
- Medium scorers: Review details in modal
- Low scorers: Skip unless desperate

### 6. **Team Collaboration**

- Export results
- Share with hiring team
- Discuss borderline candidates
- Make final decisions together

---

## Keyboard Shortcuts (Table)

- **Click column header** to sort (ascending/descending)
- **Click a row** to view full details
- **Click outside modal** to close details

---

## Troubleshooting

### CSV Upload Issues

- **Error**: "Error parsing CSV"
  - Check file format (must be `.csv`)
  - Ensure columns match expected format
  - Look for special characters in data

- **Missing data**
  - Some fields are optional (GPA, graduate year)
  - System handles missing fields gracefully
  - Score still calculates with available data

### Filter Not Working

- **No results shown**
  - Try loosening filter criteria
  - Check that candidates match filters
  - Try "All" verdict option first

- **Score slider**
  - Drag both ends to set range
  - Shows count of matching candidates

### Export Issues

- **File won't download**
  - Check browser popup/download settings
  - Try a different browser
  - Ensure at least 1 candidate is loaded

---

## Data Privacy

- **All processing happens in your browser**
- No data is sent to any server
- No cookies or tracking
- No external API calls
- Safe to use with confidential candidate data

---

## FAQ

**Q: Can I edit candidate scores?**
A: No, but you can re-upload with different CSV data.

**Q: What if a candidate has no GitHub?**
A: They get 0 points for GitHub but can still score high on other factors.

**Q: How do I compare two candidates?**
A: Click each to see their details and score breakdown. Export CSV for detailed comparison.

**Q: Can I modify the scoring criteria?**
A: Currently fixed, but you can request modifications. All scores are transparent and auditable.

**Q: What CSV format is expected?**
A: Standard Internshala export with columns like: Name, City, GitHub, availability, skills, GPA, etc.

**Q: Is the app mobile-friendly?**
A: Works on mobile but best on desktop for full table view.

---

## Support

For issues or questions:

1. Check this guide
2. Review the ENHANCED_FEATURES.md file
3. Check the IMPLEMENTATION_COMPLETE.md file
4. Verify CSV format matches expected columns

---

**Happy shortlisting!** 🚀

Your hiring decisions are now data-driven and transparent.
