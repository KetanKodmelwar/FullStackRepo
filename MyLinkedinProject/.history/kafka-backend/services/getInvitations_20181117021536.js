var { Applicant } = require("../models/Applicant");
var { Recruiter } = require("../models/Recruiter");

var { Invitation } = require("../models/Invitation");
var { Connection } = require("../models/Connection");

function handle_request(msg, callback) {
  console.log(
    "=====================In the kafka-backend get Invitation====================="
  );
  console.log("Message body:" + JSON.stringify(msg));
  Invitation.find({ user_id: msg.request })
    .then(users => {
      if (users) {
        callback(null, users);
      }
    })
    .catch(err => {
      callback(err, "Error getting invitations");
    });
}

exports.handle_request = handle_request;
