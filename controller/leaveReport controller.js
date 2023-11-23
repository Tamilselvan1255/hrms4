const leaveUsers = require('../modals/leave schema');
const allemployee = require("./../modals/all-empolyeeSchema/allEmpolyeeSchema");
const json2csv = require('json2csv').parse;
const fs = require('fs');

exports.getleaveReport = async (req, res) => {
  try {
    // Execute the query and await the result
    const reportData = await leaveUsers.find();

    const employees = await Promise.all(reportData.map(async (employee) => {
      // Find the employee's details based on the common userId
      const userWithDetails = await allemployee.findOne({ _id: employee.userId });

      if (userWithDetails) {
        return {
          Name: employee.Name,
          Start_Date: employee.Start_Date,
          End_Date: employee.End_Date,
          Reason: employee.Reason,
          Department: userWithDetails ? userWithDetails.Department:null // Adjust as needed
        };
      } else {
        // Handle the case where user details are not found
        console.log(`User details not found for userId: ${employee.userId}`);
        return null;
      }
    }));

    // Remove null values (cases where user details were not found)
    const filteredEmployees = employees.filter(employee => employee !== null);

    if (filteredEmployees.length > 0) {
      // Convert data to CSV format
      const csv = json2csv(filteredEmployees);

      // Save CSV to a file (you can also send it directly to the client)
      fs.writeFileSync('report.csv', csv);

      // Respond with the file download
      res.download('report.csv', 'report.csv', (err) => {
        // Delete the file after sending it
        fs.unlinkSync('report.csv');
      });
    } else {
      res.status(400).send('No leave data found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
