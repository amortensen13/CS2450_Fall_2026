
*****************************************************
*                                                   *
* How to create a pull request and request a review *
*                                                   *
*****************************************************

# Step 0. **Only once**: 
  Install the latest release of the github-cli (see: https://github.com/cli/cli/releases)

# Step 1.Before merging, ensure that your working directory is clean and your branch is up-to-date.  In other words:
  1. Commit all of the files/changes to your local development/feature branch
	2. Push all of the changes to your remote feature branch

# Step 2. Check Out the Main Branch
Start by switching to the main branch.
```bash
		git checkout main
```


# Step 3. Pull the Latest Changes
Fetch and integrate the latest changes from the remote repository.
```bash
		git pull origin main
		git pull origin main
```


# Step 4. Check Out the Feature Branch
Switch to the branch you want to merge into main.
```bash
		git checkout your-feature-branch
```


# Step 5. Ensure the Branch is Up-to-Date (and that all unit tests work and that the MAUI GUI works)
Update your feature branch with the latest changes from main to minimize conflicts.
```bash
		git pull origin main
```

Step 6. Resolve Conflicts (If Any)
If Git reports conflicts, you'll need to resolve them manually. Do the following two steps.
	- **Step 6a.** Resolve Conflicts (If Any)
	Open the files with conflicts, resolve the issues, and then mark them as resolved.
```bash
		git add resolved-file
```

  - **Step 5b.** Commit Resolved Conflicts (If Any)
	This step only needs to be done if there were conflicts that were resolved.  After resolving all conflicts, complete the merge with:
```bash
		git commit
```

# Step 6. Create pull Request and Request Review
```bash
		gh pr create
		gh pr review
```

Best Practices for Merging
•	Regularly Merge Main into Feature Branches: This minimizes the risk of conflicts and keeps your feature branch up-to-date.  
•	Commit Frequently: Smaller, frequent commits are easier to manage and less likely to cause conflicts.  Commit early.  Commit often.  (To your local branch.)
•	Write Clear Commit Messages: Good commit messages make it easier to understand the history of changes.
•	Use Pull Requests: For collaborative projects, pull requests provides code review and discussion before merging.

Based on (but with important differences!)
https://www.geeksforgeeks.org/how-to-merge-a-git-branch-into-master/

****************************************************
*                                                  *
* How to merge pull request <#>,                   *
* https://cli.github.com/manual/gh_pr              *
*                                                  *
****************************************************
``` bash
		gh pr list
		gh pr checkout <#>
# one of:
		gh pr review --comment
		gh pr review --request-changes
		gh pr review --approve
```