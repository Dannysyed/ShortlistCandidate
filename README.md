# 🎯 Intern Shortlisting Tool

A lightweight, client-side React application for automatically shortlisting internship candidates from Internshala CSV exports.

## Overview

This tool automates the candidate evaluation process by:

- Parsing CSV files from Internshala
- Validating and normalizing GitHub URLs
- Scoring candidates based on predefined criteria
- Displaying results in a sortable, color-coded table

**No backend required | No database | No authentication**

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **PapaParse** - CSV parsing
- **Vanilla CSS** - Styling (no CSS libraries)
- **JavaScript (ES6+)** - No TypeScript

## Features

### 1. CSV Upload

- Upload `.csv` files from Internshala
- Automatic parsing with proper header detection
- Graceful error handling

### 2. GitHub Validation

- Auto-normalization of GitHub URLs
- Detects GitHub profiles vs. repositories
- Validates URL structure with regex
- Handles common mistakes (missing https://, www., etc.)

### 3. Intelligent Scoring

Candidates are scored out of 10 based on:
| Criteria | Points |
|----------|--------|
| Valid GitHub link | +1 |
| GitHub repository link | +1 |
| React project mentioned or repo | +2 |
| Immediate availability | +1 |
| Relevant degree (CSE/IT/MCA) | +1 |
| Bangalore based | +1 |

### 4. Verdict Classification

- **Interview (8-10)** - Green badge ✓
- **Screen Further (5-7)** - Yellow badge ⚠
- **Reject (<5)** - Red badge ✗

### 5. Interactive Table

- Sortable columns (click headers)
- Clickable GitHub links
- Color-coded verdict badges
- Candidate statistics dashboard

## Project Structure

```
src/
├── components/
│   ├── FileUpload.jsx      # CSV file upload & parsing
│   └── CandidateTable.jsx  # Candidate display & sorting
├── utils/
│   ├── csvParser.js        # CSV parsing logic
│   ├── github.js           # GitHub URL validation & normalization
│   └── scorer.js           # Scoring engine
├── App.jsx                 # Main app component
├── App.css                 # App styling
├── index.css               # Global styles
└── main.jsx                # React entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5174/`

### Build

```bash
npm run build
```

Generates optimized production build in `dist/` folder.

### Linting

```bash
npm run lint
```

## Usage

1. **Prepare CSV** - Export candidates from Internshala with columns:
   - Candidate Name
   - City
   - GitHub
   - Availability
   - Degree

2. **Upload** - Click file input and select your CSV

3. **Review** - Table automatically populates with scored candidates

4. **Sort** - Click any column header to sort

5. **Link** - Click GitHub links to verify profiles/repos

## CSV Format Example

```csv
Candidate Name,City,GitHub,Availability,Degree
John Doe,Bangalore,https://github.com/johndoe/react-app,Immediately,B.Tech CSE
Jane Smith,Mumbai,github.com/janesmith,Available,B.Tech IT
```

**Supported Column Names:**

- Name, Candidate Name
- City, Location
- GitHub, GitHub Profile
- Availability, Available
- Degree, Education

## Algorithm Details

### GitHub URL Normalization

- Adds `https://` if missing
- Removes `www.` prefix
- Accepts usernames as GitHub profiles
- Validates against regex pattern

### Scoring Logic

1. Validates GitHub URL
2. Checks for repository vs. profile
3. Scans for React mentions in data
4. Checks availability keywords
5. Matches degree against CSE/IT/MCA patterns
6. Checks if city contains "Bangalore"

## Code Quality

- ✅ ESLint compliant
- ✅ Modular & reusable utilities
- ✅ No external CSS libraries
- ✅ Clean, readable code
- ✅ Comprehensive comments
- ✅ Error handling

## Sample Data

A sample CSV is included: `sample-candidates.csv`

## Customization

### Modify Scoring Weights

Edit [src/utils/scorer.js](src/utils/scorer.js) to adjust points per criteria:

```javascript
// Increase React project weight to +3
if (hasReactMention) {
  score += 3; // Changed from 2
}
```

### Change Verdict Thresholds

Edit the verdict assignment in [src/utils/scorer.js](src/utils/scorer.js):

```javascript
if (score >= 9) {
  // Changed from 8
  verdict = "Interview";
} else if (score >= 6) {
  // Changed from 5
  verdict = "Screen Further";
}
```

### Customize CSV Column Mapping

Edit [src/utils/csvParser.js](src/utils/csvParser.js):

```javascript
export function extractCandidateFields(candidates) {
  return candidates.map((candidate) => ({
    name: candidate["Your Column Name"] || "",
    // ... more fields
  }));
}
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- File API support required

## Performance

- CSV parsing: < 1 second for 1000 rows
- Scoring: O(n) complexity
- Table sorting: O(n log n)
- No page reloads or network requests

## Limitations

- CSV only (no Excel import)
- No data persistence (in-memory only)
- No bulk export
- Single file upload at a time

## Future Enhancements

- [ ] Excel file support
- [ ] Download results as CSV
- [ ] Custom scoring templates
- [ ] Candidate filtering & search
- [ ] Email integration
- [ ] Data persistence with IndexedDB
- [ ] Dark mode toggle
- [ ] Import/export settings

## License

MIT

## Support

For issues or suggestions, please create an issue in the repository.

---

**Built with React + Vite for speed and simplicity** 🚀
