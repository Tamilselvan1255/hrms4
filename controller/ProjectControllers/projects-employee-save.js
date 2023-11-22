const express = require("express");
const Projects = require("../../modals/empProjectsSchema/ProjectsSchema");
const Emp_projectsSchema_joi = require("../../modals/empProjectsSchema/Emp_projectsSchema_joi");

exports.ProjectsAdd=( async (req, res) => {
    try {
        const { error } = Emp_projectsSchema_joi.validate(req.body);

        if (error) {
          return res.status(400).send(error);    
        }
        const {Project_Name,Client,Priority,Add_Project_Leader,Team_Members,Description,Rate,Start_Date,end_Date } = req.body;
        const formattedStartDate = new Date(Start_Date).toLocaleDateString('en-GB');
        const formattedEndDate = new Date(end_Date).toLocaleDateString('en-GB');
        const Projects_employees = new Projects({
            Project_Name,
            Client,
            Priority,
            Add_Project_Leader,
            Team_Members,
            Description,
            // Upload_File,
            Rate,
            Start_Date:formattedStartDate,
            end_Date:formattedEndDate
        });
   

        const savedProjects = await Projects_employees.save();

        res.status(200).send("Project Added Successfully"+formattedEndDate);
    } catch (err) {
        console.error(err);
        res.status(401).send( err);
    }
});



