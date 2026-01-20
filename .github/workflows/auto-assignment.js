module.exports = async ({github, context}) => {
  let issueNumber;
  let assigneesList;

  if (context.payload.issue) {
    assigneesList = ['Varun-S10'];  // for issues
    issueNumber = context.payload.issue.number;
  } else if (context.payload.pull_request) {
    assigneesList = ['Varun-S10'];  // for PRs
    issueNumber = context.payload.pull_request.number;
  } else {
    console.log('Not an issue or PR');
    return;
  }

  console.log('Assignee list:', assigneesList);
  console.log('Entered auto assignment for this issue/PR:', issueNumber);

  if (!assigneesList.length) {
    console.log('No assignees found for this repo.');
    return;
  }

  const noOfAssignees = assigneesList.length;
  const selection = issueNumber % noOfAssignees;
  const assigneeForIssue = assigneesList[selection];

  console.log(
      `Issue/PR Number = ${issueNumber}, assigning to: ${assigneeForIssue}`);

  return github.rest.issues.addAssignees({
    issue_number: issueNumber,
    owner: context.repo.owner,
    repo: context.repo.repo,
    assignees: [assigneeForIssue],
  });
};