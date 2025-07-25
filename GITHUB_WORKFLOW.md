# GitHub Project Management Workflow

## Overview

This document outlines our development workflow using GitHub's native project management tools for organizing, tracking, and managing the Typing Defender project.

## Tools We'll Use

### 1. **GitHub Issues** 
- Individual work items (features, bugs, experiments, documentation)
- Discussion threads for each topic
- Assignee and milestone tracking
- Automatic linking to code changes

### 2. **GitHub Projects (Kanban Board)**
- Visual workflow management
- Column-based progress tracking (Backlog → In Progress → Review → Done)
- Cross-repository item management
- Custom fields for priority, effort, etc.

### 3. **Labels**
- Categorization and filtering system
- Color-coded for quick visual identification
- Priority and type indicators

### 4. **Milestones**
- Version/release grouping
- Progress tracking toward larger goals
- Timeline management

## Proposed Label System

### **Type Labels**
- `🐛 bug` - Something isn't working correctly
- `✨ feature` - New functionality or enhancement
- `🧪 experiment` - Research or proof-of-concept work
- `📚 documentation` - Documentation improvements
- `🔧 maintenance` - Code cleanup, refactoring, dependencies
- `🎨 design` - UI/UX improvements and visual enhancements
- `🎯 gameplay` - Game mechanics and balance changes
- `⚡ performance` - Optimization and performance improvements

### **Priority Labels**
- `🔥 priority-critical` - Blocking issues that need immediate attention
- `📈 priority-high` - Important features for next release
- `📊 priority-medium` - Nice to have improvements
- `📋 priority-low` - Future considerations

### **Workflow Status**
Status is managed through **Project Board Columns**, not labels:
- **📋 Backlog** - New issues not yet prioritized
- **🎯 Sprint Ready** - Issues ready to start work
- **🚧 In Progress** - Currently being worked on  
- **👀 Review** - Completed work awaiting review
- **✅ Done** - Completed and verified work

### **Complexity Labels**
- `🟢 complexity-small` - 1-2 hours of work
- `🟡 complexity-medium` - Half day to full day
- `🔴 complexity-large` - Multiple days or requires breaking down

## Project Board Structure

### **Accessing the Board**
🎯 **Main Project URL**: https://github.com/users/yannicklaclau/projects/2

Navigate to: **Repository → Projects tab → "Typing Defender Development"**

### **Default Columns** (GitHub Projects v2)
GitHub Projects v2 starts with default columns that can be customized:
1. **📋 Todo** - New items (equivalent to Backlog)
2. **🚧 In Progress** - Currently being worked on  
3. **✅ Done** - Completed work

### **Recommended Custom Columns**
You can add these columns through the web interface:
4. **🎯 Ready** - Well-defined items ready to start
5. **👀 Review** - Items waiting for testing/review
6. **🚫 Blocked** - Items that cannot proceed

### **Custom Fields**
- **Priority**: Critical, High, Medium, Low
- **Complexity**: Small, Medium, Large
- **Type**: Bug, Feature, Experiment, etc.
- **Sprint**: Which iteration the item belongs to

## Workflow Process

### 1. **Creating New Work Items**
```bash
# Create a new feature request
gh issue create --title "Add sound effects to game" --body "Description..." --label "✨ feature,📊 priority-medium,🟡 complexity-medium"

# Create a bug report  
gh issue create --title "Words not falling at correct speed" --body "Steps to reproduce..." --label "bug,📈 priority-high,🟢 complexity-small"

# Automatically add new issues to project board
gh project item-add 2 --owner yannicklaclau --url https://github.com/yannicklaclau/typing-tutor/issues/[ISSUE_NUMBER]
```

### 2. **Using the Visual Board**
- **Web Interface**: Go to https://github.com/users/yannicklaclau/projects/2
- **Drag & Drop**: Move issues between columns (Todo → In Progress → Done)
- **Quick Add**: Click "+" in any column to add new items
- **Filtering**: Use labels to filter by type, priority, or complexity

### 3. **Working on Items**
- Move item from "Sprint Ready" to "In Progress"
- Create feature branch: `git checkout -b feature/issue-123-add-sound-effects`
- Make commits with issue references: `git commit -m "Add explosion sound effects (fixes #123)"`
- Push and create PR: `gh pr create --title "Add sound effects" --body "Closes #123"`

### 4. **Review and Completion**
- Move to "Review" column when PR is ready
- Test and validate the changes
- Merge PR (automatically closes linked issue)
- Move to "Done" column

### 5. **Archiving**
- Periodically move old "Done" items to "Archive"
- Keep "Done" for current sprint visibility

## CLI Commands Reference

### **Issues**
```bash
# List issues
gh issue list --label "🐛 bug" --state open

# Create issue with template
gh issue create --title "Title" --body "Description" --label "type,priority,complexity"

# Comment on issue
gh issue comment 123 --body "Update or question"

# Close issue
gh issue close 123
```

### **Projects**
```bash
# List projects
gh project list --owner yannicklaclau

# View project
gh project view [PROJECT_ID] --web

# Add item to project
gh project item-add [PROJECT_ID] --url [ISSUE_URL]

# List project items
gh project item-list [PROJECT_ID]
```

### **Labels**
```bash
# List labels
gh label list

# Create label
gh label create "🎯 gameplay" --description "Game mechanics and balance" --color "ff6b6b"

# Edit label
gh label edit "old-name" --name "new-name" --color "new-color"
```

## Benefits of This Workflow

### **Organization**
- All project information centralized in GitHub
- Clear categorization and prioritization
- Historical record of decisions and changes

### **Visibility**
- Visual Kanban board shows current status
- Easy filtering by type, priority, or assignee
- Progress tracking toward milestones

### **Integration**
- Automatic linking between issues, PRs, and commits
- Branch and PR creation directly from issues
- Automated status updates when code is merged

### **Collaboration**
- Discussion threads on each issue
- @mentions and notifications
- External contributor friendly

## Next Steps

1. **Set up project board** with columns and custom fields
2. **Create enhanced label system** with our custom categories
3. **Add initial issues** from current todo list and game feedback
4. **Create first milestone** for "MVP Enhancement" or "Version 1.1"
5. **Start using the workflow** for all new work

## Example First Issues

Based on the current state of Typing Defender, here are some example issues we could create:

1. **🐛 Bug**: "Fix missile collision detection accuracy"
2. **✨ Feature**: "Add user profile system with photos"
3. **🎨 Design**: "Improve city building visual design"
4. **🧪 Experiment**: "Research HTML5 Web Audio API for sound effects"
5. **🎯 Gameplay**: "Balance word difficulty progression between levels"
6. **📚 Documentation**: "Create deployment guide for web hosting"

This workflow will scale with the project and provide a professional development experience while keeping everything organized and trackable.