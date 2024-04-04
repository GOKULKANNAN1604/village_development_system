const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const event=require('../controllers/event');
const image = require('../controllers/image');
const Issue = require('../controllers/issue');
const people=require('../controllers/people');

router.post('/adminLogin', authController.loginAdmin);
router.post('/fetchuser',authController.fetchAdmin);
router.post('/subadminRegister',authController.registerSubAdmin);
router.post('/subadminLogin',authController.subadminLogin);
router.post('/fetchSubAdmin',authController.fetchSubAdmin);
router.post('/VoluntierRegister',authController.registerVoluntier);
router.post('/voluntierLogin',authController.VoluntierLogin);
router.post('/fetchvoluntier',authController.fetchVoluntier);
router.post('/createevent',event.CreateEvent)
router.get('/fetchevent',event.FetchEvent)
router.put('/updatestatus/:eventId',event.UpdateStatus)
router.put('/updateeventdata/:eventId',event.UpdatedEventData)
router.delete('/deleteevent/:eventId',event.DeletedEvent)
router.post('/images',image.uploadimage)
router.get('/fetchimage',image.fetchimage)
router.get('/getvoluntierdetails',authController.getAllVoluntiers)
router.get('/getallsubadmin',authController.getAllsubadmin)
router.post('/createissue',Issue.IssueCreate)
router.get('/fetchissue',Issue.IssueFetch)
router.post('/addpeople',people.addPeople)
router.put('/statusupdate/:volunteerId',authController.updateVolunteerStatus)
router.put('/updateissuestatus/:issueId',Issue.updateIssueStatus)
module.exports = router;
