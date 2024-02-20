/*
 * ❌ Bad commit messages
 * git commit -m "add feature"
 * git commit -m "JIRA-123 add feature"
 * git commit -m "feat / add feature"
 */

/*
 * ✅ Good commit messages
 * git commit -m "feat: add feature"
 * git commit -m "feat: JIRA-123 add feature"
 * git commit -m "feat(my-module): JIRA-123 add feature"
 */

module.exports = { extends: ['@commitlint/config-conventional'] };
