# 🛡️ Claude Code Permissions Configuration Guide

> **Complete guide for setting up safe, productive Claude Code permissions using research-backed security best practices**

## 📋 Overview

Claude Code uses a **permissions system** in `.claude/settings.local.json` to control which commands can be executed without asking for approval. This guide provides:

- **🚀 Canonical Safe Whitelist** - Research-backed safe commands for development
- **⛔ Essential Blacklist** - Dangerous commands that should always require approval  
- **🎯 Project-Specific Templates** - Tailored configurations for different development environments
- **📚 Implementation Guide** - Step-by-step setup instructions

## 🎯 **Core Security Principles**

### **1. Least Privilege Access**
Only whitelist commands that are:
- **Essential for development workflow**
- **Unable to modify system configuration**  
- **Limited in scope and impact**
- **Predictable in behavior**

### **2. Defense in Depth**
- **Whitelist** takes precedence over blacklist
- **Deny rules** sit on top of allow rules
- **Path restrictions** limit file system access
- **Network restrictions** control external access

### **3. Developer Productivity Balance**
Optimize for:
- **Reduced prompt fatigue** for safe, common operations
- **Maintained security** for sensitive or dangerous commands
- **Workflow efficiency** for repetitive development tasks

---

## 🚀 **Canonical Safe Whitelist**

### **📂 File System Operations (Read-Only)**
```json
"Bash(ls:*)",           // List directory contents
"Bash(find:*)",         // Search for files and directories  
"Bash(grep:*)",         // Search within files
"Bash(cat:*)",          // Display file contents
"Bash(head:*)",         // Show first lines of files
"Bash(tail:*)",         // Show last lines of files
"Bash(wc:*)",           // Count lines, words, characters
"Bash(file:*)",         // Determine file types
"Bash(stat:*)",         // Display file statistics
"Bash(pwd)",            // Show current directory
"Bash(which:*)",        // Locate commands
"Bash(whereis:*)",      // Locate binary, source, manual files
```

### **🗂️ Safe File System Modifications**
```json
"Bash(mkdir:*)",        // Create directories
"Bash(touch:*)",        // Create empty files
"Bash(cp:*)",           // Copy files (with path restrictions)
"Bash(mv:*)",           // Move/rename files (with path restrictions)
```

### **🔄 Version Control (Git)**
```json
"Bash(git status)",     // Check repository status
"Bash(git log:*)",      // View commit history
"Bash(git diff:*)",     // Show changes
"Bash(git show:*)",     // Display commits/objects
"Bash(git branch:*)",   // List/manage branches  
"Bash(git checkout:*)", // Switch branches/commits
"Bash(git add:*)",      // Stage changes
"Bash(git commit:*)",   // Commit changes
"Bash(git push:*)",     // Push to remote
"Bash(git pull:*)",     // Pull from remote
"Bash(git fetch:*)",    // Fetch from remote
"Bash(git merge:*)",    // Merge branches
"Bash(git rebase:*)",   // Rebase branches
"Bash(git stash:*)",    // Stash changes
"Bash(git tag:*)",      // Manage tags
"Bash(git remote:*)",   // Manage remotes
```

### **📦 Package Management**
```json
"Bash(npm install)",    // Install dependencies
"Bash(npm install:*)",  // Install specific packages
"Bash(npm run:*)",      // Run package scripts
"Bash(npm test)",       // Run tests
"Bash(npm start)",      // Start application
"Bash(npm build)",      // Build application
"Bash(npm run build)",  // Run build script
"Bash(npm run test)",   // Run test script
"Bash(npm run lint)",   // Run linting
"Bash(npm run dev)",    // Run development server
"Bash(yarn install)",   // Yarn install
"Bash(yarn run:*)",     // Yarn scripts
"Bash(pip install:*)",  // Python packages
"Bash(pip list)",       // List Python packages
"Bash(composer install)", // PHP dependencies
"Bash(bundle install)", // Ruby dependencies
```

### **🏗️ Build and Development Tools**
```json
"Bash(make:*)",         // Build with Makefile
"Bash(cmake:*)",        // CMake build system
"Bash(cargo build)",    // Rust build
"Bash(cargo test)",     // Rust tests
"Bash(cargo run)",      // Rust run
"Bash(go build:*)",     // Go build
"Bash(go test:*)",      // Go tests
"Bash(go run:*)",       // Go run
"Bash(mvn compile)",    // Maven compile
"Bash(mvn test)",       // Maven test
"Bash(gradle build)",   // Gradle build
"Bash(gradle test)",    // Gradle test
```

### **🔍 Development Analysis**
```json
"Bash(du:*)",           // Disk usage analysis
"Bash(ps:*)",           // Process information
"Bash(top)",            // System monitor (read-only)
"Bash(htop)",           // Enhanced system monitor
"Bash(df:*)",           // Filesystem usage
"Bash(free:*)",         // Memory usage
"Bash(uptime)",         // System uptime
"Bash(whoami)",         // Current user
"Bash(id)",             // User and group IDs
```

### **📊 Data Processing**
```json
"Bash(sort:*)",         // Sort lines
"Bash(uniq:*)",         // Report/omit repeated lines
"Bash(cut:*)",          // Extract columns
"Bash(awk:*)",          // Text processing
"Bash(sed:*)",          // Stream editor
"Bash(tr:*)",           // Character translation
"Bash(jq:*)",           // JSON processor
"Bash(xmllint:*)",      // XML processor
```

---

## ⛔ **Essential Blacklist (Always Require Approval)**

### **🌐 Network Operations**
```json
"Bash(curl:*)",         // Download from web (can execute remote code)
"Bash(wget:*)",         // Download files (security risk)
"Bash(ssh:*)",          // Remote shell access
"Bash(scp:*)",          // Remote file copy
"Bash(rsync:*)",        // Remote synchronization
"Bash(ftp:*)",          // File transfer protocol
"Bash(nc:*)",           // Netcat (network connections)
"Bash(nmap:*)",         // Network mapper
"Bash(ping:*)",         // Network connectivity (can leak info)
```

### **🔐 System Administration**
```json
"Bash(sudo:*)",         // Elevated privileges
"Bash(su:*)",           // Switch user
"Bash(passwd:*)",       // Change passwords
"Bash(chown:*)",        // Change ownership
"Bash(chmod:*)",        // Change permissions
"Bash(chgrp:*)",        // Change group
"Bash(mount:*)",        // Mount filesystems
"Bash(umount:*)",       // Unmount filesystems
"Bash(fdisk:*)",        // Disk partitioning
"Bash(crontab:*)",      // Scheduled tasks
```

### **🗑️ Destructive Operations**
```json
"Bash(rm:*)",           // Remove files (data loss risk)
"Bash(rmdir:*)",        // Remove directories  
"Bash(dd:*)",           // Low-level copy (can destroy data)
"Bash(shred:*)",        // Secure deletion
"Bash(mkfs:*)",         // Create filesystem (destructive)
"Bash(format:*)",       // Format drives
```

### **⚡ Code Execution**
```json
"Bash(eval:*)",         // Execute arbitrary code
"Bash(exec:*)",         // Replace shell process
"Bash(source:*)",       // Execute shell scripts
"Bash(.:*)",            // Execute scripts (dot command)
"Bash(sh:*)",           // Shell execution
"Bash(bash:*)",         // Bash execution
"Bash(python:*)",       // Python execution (unless specific scripts)
"Bash(node:*)",         // Node.js execution (unless specific scripts)
"Bash(ruby:*)",         // Ruby execution (unless specific scripts)
```

### **🔄 Process Control**
```json
"Bash(kill:*)",         // Terminate processes
"Bash(killall:*)",      // Terminate by name
"Bash(pkill:*)",        // Kill processes by criteria
"Bash(nohup:*)",        // Run commands immune to hangups
"Bash(screen:*)",       // Terminal multiplexer
"Bash(tmux:*)",         // Terminal multiplexer
```

### **📝 Environment Modification**
```json
"Bash(export:*)",       // Environment variables
"Bash(unset:*)",        // Remove variables
"Bash(alias:*)",        // Command aliases
"Bash(history:*)",      // Command history manipulation
```

---

## 🎯 **Project-Specific Templates**

### **🌐 Web Development Project**
```json
{
  "permissions": {
    "allow": [
      // Core tools
      "Edit", "Write", "Read", "Glob", "Grep",
      
      // File operations
      "Bash(ls:*)", "Bash(find:*)", "Bash(cat:*)", "Bash(mkdir:*)",
      
      // Git operations
      "Bash(git status)", "Bash(git add:*)", "Bash(git commit:*)",
      "Bash(git push:*)", "Bash(git pull)", "Bash(git diff:*)",
      "Bash(git log:*)", "Bash(git branch:*)", "Bash(git checkout:*)",
      
      // Node.js development
      "Bash(npm install)", "Bash(npm run:*)", "Bash(npm test)",
      "Bash(yarn install)", "Bash(yarn run:*)",
      
      // Development servers
      "Bash(npm start)", "Bash(npm run dev)", "Bash(npm run build)",
      "Bash(npm run lint)", "Bash(npm run test)",
      
      // Analysis tools
      "Bash(grep:*)", "Bash(wc:*)", "Bash(du:*)"
    ],
    "deny": [
      "Bash(curl:*)", "Bash(wget:*)", "Bash(rm:*)", 
      "Bash(sudo:*)", "Bash(chmod:*)", "Bash(eval:*)"
    ]
  }
}
```

### **🐍 Python Development Project**
```json
{
  "permissions": {
    "allow": [
      // Core tools
      "Edit", "Write", "Read", "Glob", "Grep",
      
      // File operations
      "Bash(ls:*)", "Bash(find:*)", "Bash(cat:*)", "Bash(mkdir:*)",
      
      // Git operations
      "Bash(git status)", "Bash(git add:*)", "Bash(git commit:*)",
      "Bash(git push:*)", "Bash(git pull)", "Bash(git diff:*)",
      
      // Python development
      "Bash(pip install:*)", "Bash(pip list)", "Bash(pip freeze)",
      "Bash(python -m pytest:*)", "Bash(python -m unittest:*)",
      "Bash(python -m pip:*)", "Bash(python setup.py:*)",
      
      // Virtual environments
      "Bash(virtualenv:*)", "Bash(source venv/bin/activate)",
      "Bash(conda create:*)", "Bash(conda activate:*)",
      
      // Testing and linting
      "Bash(pytest:*)", "Bash(flake8:*)", "Bash(black:*)", 
      "Bash(mypy:*)", "Bash(pylint:*)"
    ],
    "deny": [
      "Bash(python:*)", "Bash(curl:*)", "Bash(rm:*)", "Bash(sudo:*)"
    ]
  }
}
```

### **🦀 Rust Development Project**
```json
{
  "permissions": {
    "allow": [
      // Core tools
      "Edit", "Write", "Read", "Glob", "Grep",
      
      // File operations
      "Bash(ls:*)", "Bash(find:*)", "Bash(cat:*)", "Bash(mkdir:*)",
      
      // Git operations
      "Bash(git status)", "Bash(git add:*)", "Bash(git commit:*)",
      "Bash(git push:*)", "Bash(git pull)", "Bash(git diff:*)",
      
      // Rust development
      "Bash(cargo build)", "Bash(cargo test)", "Bash(cargo run)",
      "Bash(cargo check)", "Bash(cargo fmt)", "Bash(cargo clippy)",
      "Bash(cargo doc)", "Bash(cargo clean)", "Bash(cargo update)",
      "Bash(cargo install:*)", "Bash(rustup:*)"
    ],
    "deny": [
      "Bash(curl:*)", "Bash(rm:*)", "Bash(sudo:*)", "Bash(cargo install --*)"
    ]
  }
}
```

---

## ⚡ **2-Minute Quick Setup for New Projects**

### **🎯 Copy & Paste Method**
1. **Create permissions directory**:
   ```bash
   mkdir -p .claude
   ```

2. **Copy our proven configuration**:
   ```bash
   # Copy this entire content into .claude/settings.local.json
   ```

3. **Use Universal Safe Template** (copy the JSON from Step 3 below)

4. **Test immediately**:
   ```bash
   # These should work without prompts:
   git status
   ls -la  
   npm install (if Node.js project)
   ```

**⏱️ Total Time**: ~2 minutes  
**✅ Result**: Secure, productive Claude Code setup ready for development

---

## 📚 **Detailed Implementation Guide**

### **Step 1: Backup Current Settings**
```bash
# Backup existing settings if they exist
cp .claude/settings.local.json .claude/settings.local.json.backup
```

### **Step 2: Choose Base Template**
Select the appropriate template from above based on your project type, or use the **Universal Safe Template** below:

### **Step 3: Universal Safe Template**
```json
{
  "permissions": {
    "allow": [
      // Core Claude Code tools
      "Edit", "Write", "Read", "Glob", "Grep", "LS",
      
      // Safe file operations
      "Bash(ls:*)", "Bash(find:*)", "Bash(grep:*)", "Bash(cat:*)", 
      "Bash(head:*)", "Bash(tail:*)", "Bash(wc:*)", "Bash(mkdir:*)",
      "Bash(pwd)", "Bash(which:*)", "Bash(file:*)",
      
      // Git operations (full workflow)
      "Bash(git status)", "Bash(git log:*)", "Bash(git diff:*)",
      "Bash(git show:*)", "Bash(git branch:*)", "Bash(git checkout:*)",
      "Bash(git add:*)", "Bash(git commit:*)", "Bash(git push:*)",
      "Bash(git pull)", "Bash(git fetch:*)", "Bash(git merge:*)",
      "Bash(git stash:*)", "Bash(git remote:*)",
      
      // Package management (common)
      "Bash(npm install)", "Bash(npm run:*)", "Bash(yarn install)", 
      "Bash(yarn run:*)", "Bash(pip install:*)", "Bash(pip list)",
      
      // Development analysis
      "Bash(du:*)", "Bash(ps aux)", "Bash(whoami)", "Bash(id)"
    ],
    "deny": [
      // Network operations
      "Bash(curl:*)", "Bash(wget:*)", "Bash(ssh:*)", "Bash(scp:*)",
      
      // System administration  
      "Bash(sudo:*)", "Bash(su:*)", "Bash(chmod:*)", "Bash(chown:*)",
      
      // Destructive operations
      "Bash(rm:*)", "Bash(rmdir:*)", "Bash(dd:*)", "Bash(shred:*)",
      
      // Code execution
      "Bash(eval:*)", "Bash(exec:*)", "Bash(sh:*)", "Bash(bash:*)",
      "Bash(python:*)", "Bash(node:*)", "Bash(ruby:*)",
      
      // Process control
      "Bash(kill:*)", "Bash(killall:*)", "Bash(pkill:*)"
    ]
  },
  "env": {
    "DISABLE_TELEMETRY": "1"
  },
  "includeCoAuthoredBy": false
}
```

### **Step 4: Test Configuration**
```bash
# Test that Claude Code recognizes the new permissions
claude --help

# Try a whitelisted command (should work without prompt)
# Try a blacklisted command (should require approval)
```

### **Step 5: Iterate and Refine**
Monitor your development workflow and adjust permissions based on:
- **Frequently prompted commands** that should be whitelisted
- **Rarely used risky commands** that should remain on blacklist
- **Project-specific needs** that require custom entries

---

## 🔧 **Advanced Configuration**

### **Path-Restricted Permissions**
```json
"Bash(cp src/*:*)",     // Only copy from src directory
"Bash(mv docs/*:*)",    // Only move files in docs directory
"Write(src/*)",         // Only write to src directory
"Read(config/*)",       // Only read from config directory
```

### **Environment-Specific Settings**
```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev)",    // Development server
      "Bash(npm run test)",   // Testing
      "Bash(npm run build)"   // Production build
    ],
    "deny": [
      "Bash(npm run deploy)"  // Deployment (require manual approval)
    ]
  },
  "env": {
    "NODE_ENV": "development",
    "DISABLE_TELEMETRY": "1"
  }
}
```

### **Team Coordination**
```json
// .claude/settings.json (shared team settings)
{
  "permissions": {
    "allow": [
      // Team-agreed safe commands
    ]
  }
}

// .claude/settings.local.json (personal overrides)
{
  "permissions": {
    "allow": [
      // Additional personal safe commands
    ],
    "deny": [
      // Personal additional restrictions
    ]
  }
}
```

---

## 📊 **Security Validation Checklist**

### **✅ Before Deployment**
- [ ] **Audit whitelist** - Every allowed command is necessary and safe
- [ ] **Test blacklist** - Dangerous commands properly blocked
- [ ] **Path restrictions** - File access limited to project scope
- [ ] **Network isolation** - External network access controlled
- [ ] **Privilege validation** - No elevated permissions granted
- [ ] **Team review** - Configuration reviewed by security-conscious team member

### **✅ Ongoing Monitoring**
- [ ] **Regular audit** - Monthly review of permissions
- [ ] **Command logging** - Track which commands are used frequently
- [ ] **Security updates** - Monitor for new security best practices
- [ ] **Team feedback** - Gather input on prompt fatigue vs security balance

---

## 🎯 **Best Practices Summary**

### **🚀 For Productivity**
1. **Whitelist common workflows** - npm run, git operations, file reading
2. **Allow safe analysis** - grep, find, cat, ls for exploration
3. **Enable development servers** - npm start, cargo run, etc.
4. **Support testing workflows** - test runners and linting tools

### **🛡️ For Security**  
1. **Blacklist network operations** - curl, wget, ssh always require approval
2. **Restrict system admin** - sudo, chmod, chown need explicit permission
3. **Block destructive operations** - rm, dd, format require careful consideration
4. **Prevent code execution** - eval, exec, arbitrary script execution blocked

### **⚖️ For Balance**
1. **Start restrictive** - Begin with minimal permissions and add as needed
2. **Monitor usage patterns** - Track what commands are prompted frequently
3. **Regular reviews** - Audit permissions monthly for optimization
4. **Team consensus** - Ensure all team members agree on security/productivity balance

---

**🎯 This configuration provides a security-hardened foundation that maximizes development productivity while maintaining strong protection against common attack vectors and accidental damage.**