const attendanceUsers = require('../modals/attendance schema');
const json2csv = require('json2csv').parse;
const fs = require('fs');

exports.getateendanceReport = async (req, res) => {
  try {
    // Execute the query and await the result
    const reportData = await attendanceUsers.find();

            const employees = reportData.map(employee => ({
            Name: employee.Name,
            Team: employee.Team,
            Date: employee.Date,
            Punch_In: employee.Punch_In,
            Punch_Out: employee.Punch_Out,
            Production: employee.Production,

        }));

    if (employees && employees.length > 0) {
      // Convert data to CSV format
      const csv = json2csv(employees);

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
