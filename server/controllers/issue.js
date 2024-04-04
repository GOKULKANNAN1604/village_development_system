const mongoose = require('mongoose');
const { Issue } = require('../models/issue');

exports.IssueCreate = async (req, res) => {
    try {
        const { title, description, location, category, userName } = req.body;
        const issue = new Issue({
            title,
            description,
            location,
            category,
            userName,
            status: 'Not Completed'
        });
        await issue.save();
        res.status(201).send({ message: "Issue created successfully" });
    } catch (err) {
        console.error("Error creating issue", err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
exports.updateIssueStatus = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { status } = req.body;

        // Check if the issue exists
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        // Update the status
        issue.status = status;
        await issue.save();

        res.status(200).json({ message: 'Issue status updated successfully' });
    } catch (error) {
        console.error('Error updating issue status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.IssueFetch = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.status(200).json(issues);
    } catch (err) {
        console.error("Error fetching issues", err);
        res.status(400).json({ error: "Internal Server Error" });
    }
};
