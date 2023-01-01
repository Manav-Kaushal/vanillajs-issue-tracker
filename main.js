//TODO: Add an event handler which handles the submit event from our form
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;

  // Identifier for an issue (we will use chance js library for generating global identifier for that issue)
  var issueId = chance.guid();

  var issueStatus = "Open"; // because 'Open' is the initial status of any issue

  //TODO: creating a new issue object and adding all the above information in it
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  // before pushing the object to the localStorage, we will check if there is already something present
  if (localStorage.getItem("issues") == null) {
    var issues = []; // initialize an empty array
    issues.push(issue); // then push issue object from above in the array
    localStorage.setItem("issues", JSON.stringify(issues)); // then setting issues array to localStorage as a JSON presentation
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  //TODO: reset our input elements
  document.getElementById("issueInputForm").reset();

  // Again calling 'fetchIssues()' as there is an issue added to the localStorage
  fetchIssues();

  // Preventing the form from submitting and refreshing the page
  e.preventDefault();
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  // Iterate over all the items that we've parsed from the localStorage
  // And then compare the Ids of each of those elements with the Ids that we have passed in this function
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  // Write back to localStorage
  localStorage.setItem("issues", JSON.stringify(issues));

  // Call again to update the list output
  fetchIssues();
}

//
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  // Iterate over all the items that we've parsed from the localStorage
  // And then compare the Ids of each of those elements with the Ids that we have passed in this function
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  // Write back to localStorage
  localStorage.setItem("issues", JSON.stringify(issues));

  // Call again to update the list output
  fetchIssues();
}

// Fetch a list of issues already available from the local storage of the brower
function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues")); //
  var issuesList = document.getElementById("issuesList"); // accessing the div section

  issuesList.innerHTML = ""; // initializing the content of the div section with empty string

  //TODO: Iteration (using 'for' loop) over issue items which are present in the 'issues' object and for each item in the object, we need to generate a HTML code to represent the output data on the screen.
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    //TODO: Generating HTML output for these variables decalred
    issuesList.innerHTML +=
      '<div class="well">' +
      "<h6>Issue ID: " +
      id +
      "</h6>" +
      '<p><span class="label label-success">' +
      status +
      "</span></p>" +
      "<h3>" +
      desc +
      "</h3>" +
      '<p><span class="glyphicon glyphicon-time" style="margin-right: 5px"></span>  ' +
      severity +
      "</p>" +
      '<p><span class="glyphicon glyphicon-user" style="margin-right: 5px"></span>  ' +
      assignedTo +
      "</p>" +
      '<a href="#" onClick="setStatusClosed(\'' +
      id +
      '\')" class="btn btn-warning" style="margin-right: 10px">Close</a>' +
      '<a href="#" onClick="deleteIssue(\'' +
      id +
      '\')" class="btn btn-danger">Delete</a>' +
      "</div>";
  }
}
