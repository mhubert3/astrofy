## Background and Motivation

- We are maintaining Morgan Huberty's personal website.
- The site currently references an older resume file named something like "November Resume" in the `public` directory.
- A newer file, `Morgan Huberty Resume.pdf`, now lives in `public` and should be the canonical resume used everywhere on the site.
- The goal is to ensure all resume download/view links point to the updated resume file without breaking any existing navigation or styling.

## Key Challenges and Analysis

- **Locating references**: A direct search for the exact string `November Resume` in the repo returned no results, so the old resume might be referenced via:
  - A slightly different filename (e.g. `November_Resume.pdf`, `november-resume.pdf`, or similar),
  - A relative path without the full name (e.g. `/resume.pdf` with the actual file named differently in `public`),
  - Or it may only be present as a file in `public` with no current references.
- **Filename conventions**: We should standardize on a single, clear filename for the new resume (likely `Morgan Huberty Resume.pdf`) and ensure that:
  - All links use a consistent, URL-safe path (spaces in the URL are okay but we should confirm how existing links are written),
  - There are no stale references to the old file that could cause 404s.
- **Minimal surface area change**: Since this is a content/file swap, we want to:
  - Avoid unnecessary refactors of unrelated components,
  - Prefer a small, targeted update to any components or pages that expose the resume link.
- **Testing strategy (TDD preference)**:
  - If there is an existing test harness for the resume link (unit/component/E2E), we will update or add tests that assert the href points to the new resume path.
  - If no tests exist, we will add at least a small assertion where it naturally fits (e.g. a component test for a `Resume` or `Hero`/`About` section) or fall back to manual verification if adding tests would be disproportionately heavy.

## High-level Task Breakdown

1. **Inventory resume files in `public`**
   - Inspect the `public` directory to list all resume-related files (e.g. any PDFs with "Resume", "November", or "Morgan" in the name).
   - Confirm the exact filenames and decide which one will be the canonical `Morgan Huberty` resume going forward.
   - **Success criteria**: We have a clear mapping of "old" vs "new" resume filenames and a chosen canonical filename/path for the new resume.

2. **Search codebase for all resume references**
   - Use case-insensitive searches for patterns like `November`, `resume`, `Morgan`, and common filename variants (underscores, hyphens, no spaces).
   - Identify every component/page (e.g. `Hero`, `About`, `Navbar`, `Footer`, `Contact`) that exposes a resume download or view link, and record their current href/URL.
   - **Success criteria**: We have a short list of all components/pages and exact locations where the resume link/path is defined.

3. **Define the canonical resume path and update references**
   - Choose the final public path for the new resume (e.g. `/Morgan%20Huberty%20Resume.pdf` or a cleaner alias like `/Morgan-Huberty-Resume.pdf` if renaming the file is acceptable).
   - Update every resume-related link in the codebase to use this canonical path.
   - If the old `November` resume file is still needed (e.g. for archival reasons), keep it in `public` but ensure it is no longer linked; otherwise, plan to remove it in a later cleanup step (with your explicit approval).
   - **Success criteria**: All known resume links point to the new canonical path, and the site builds without errors.

4. **Add or update tests (where appropriate)**
   - Check if there are existing tests around the components that include the resume link.
   - Where feasible, write or update tests to assert that the resume link’s href matches the new canonical path.
   - **Success criteria**: At least one automated test (if the stack makes this easy) verifies the href for the resume link, or we explicitly document why tests are not added and rely on manual checks instead.

5. **Verification and manual QA**
   - Run the dev server and navigate through the site to:
     - Click any "Resume" / "CV" / similar links,
     - Confirm that the browser downloads or opens the `Morgan Huberty Resume` file without 404s or unexpected behavior.
   - Perform a final search to ensure no references to the old `November` resume remain in the codebase.
   - **Success criteria**: All resume links work in the running site, and there are no lingering references to the `November` resume in the code.

## Project Status Board

- [ ] Task 1: Inventory resume files in `public` (Planner: see High-level Task Breakdown #1; Executor to verify the mapping of old vs new files).
- [ ] Task 2: Search codebase for all resume references (Executor to identify all pages/components and current hrefs).
- [ ] Task 3: Define canonical resume path and update all links (Executor to implement code changes and ensure consistency).
- [ ] Task 4: Add/update tests for resume link (Executor to add or update tests where practical).
- [ ] Task 5: Run dev server and manually verify resume links (Executor to perform QA and final search for old references).

## Current Status / Progress Tracking

- Planner has created the initial plan for replacing any `November` resume usage with the `Morgan Huberty` resume, including a high-level breakdown and concrete success criteria.
- Executor has not yet started work on any tasks in the Project Status Board.

## Executor's Feedback or Assistance Requests

- When you begin Task 1, please:
  - Confirm the exact filenames you find in `public` for both the old and new resumes.
  - Note any unexpected additional resume-related files.
- If you discover that the resume is referenced in a more complex way (e.g. via CMS data, environment variables, or dynamic routes), please:
  - Document the approach here,
  - Pause before making large structural changes and ask the human user for confirmation.

## Lessons

- Include info useful for debugging in program output.
- Always read a file before trying to edit it.
- If vulnerabilities appear in the terminal during npm operations, run `npm audit` before proceeding.
- Avoid using `git push --force` or other force options without explicit human approval.
