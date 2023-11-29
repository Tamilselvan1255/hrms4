const express = require("express");
const Projects = require("../../modals/empProjectsSchema/ProjectsSchema");
const Emp_projectsSchema_joi = require("../../modals/empProjectsSchema/Emp_projectsSchema_joi");
const Joi = require('@hapi/joi');


exports.ProjectsAdd=( async (req, res) => {
    try {
        const schema = Joi.object({
            Project_Name: Joi.string().required(),
            Client: Joi.string().required(),
            Priority: Joi.string().required(),
            Add_Project_Leader: Joi.string().required(),
            Team_Members: Joi.string().required(),
            Description: Joi.string().required(),
            Rate: Joi.number().required(),
            Start_Date: Joi.date().iso().required(),
            end_Date: Joi.date().iso().greater(Joi.ref('Start_Date')).required()
        });

        const { error } = Emp_projectsSchema_joi.validate(req.body);

        if (error) {
          return res.status(400).send(error);    
        }
        const {Project_Name,Client,Priority,Add_Project_Leader,Team_Members,Description,Rate,Start_Date,end_Date } = req.body;
        // const formattedStartDate = new Date(Start_Date).toLocaleDateString('en-GB');
        // const formattedEndDate = new Date(end_Date).toLocaleDateString('en-GB');
        const Projects_employees = new Projects({
            Project_Name,
            Client,
            Priority,
            Add_Project_Leader,
            Team_Members,
            Description,
            // Upload_File,
            Rate,
            Start_Date,
            end_Date
        });
   

        const savedProjects = await Projects_employees.save();

        res.status(200).send("Project Added Successfully");
    } catch (err) {
        console.error(err);
        res.status(401).send( err);
    }
});



