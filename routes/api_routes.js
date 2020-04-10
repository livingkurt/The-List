const db = require("../models/index");
// const axios = require("axios");
// const mongojs = require('mongojs')

// Export API Routes to Express
module.exports = function (app) {

  // ==================================================
  // Note Routes
  // ==================================================

  app.post('/api/note', async (req, res) => {
    // console.log({ "api_routes.js": "Hello" })
    // console.log({ "api_routes.js - post": req.body })
    // Save Need to Database
    try {
      const request = await db.Notes.create({
        title: req.body.title,
        body: req.body.body,
        folder_id: req.body.folder_id,
        list_id: req.body.list_id,
        priority: req.body.priority,
        category_id: req.body.category_id,
        scheduled: req.body.scheduled,
        scheduled_date: req.body.scheduled_date,
        scheduled_time: req.body.scheduled_time,
        completed: req.body.completed,
        date_completed: req.body.date_completed,
        // date_completed: req.body.completed ? new Date().setDate(new Date().getDate()) : "Not Complete",
        date_created: new Date().setDate(new Date().getDate()),
        date_modified: new Date().setDate(new Date().getDate())
      })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.get('/api/notes', async (req, res) => {
    // console.log({ "api_routes.js - get all": req.body })
    try {
      const request = await db.Notes.find({}).sort({ x: 1 })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.get('/api/notes/:list_id', async (req, res) => {
    // console.log({ "api_routes.js - get by list_id": req.body })
    try {
      const request = await db.Notes.find({ list_id: req.params.list_id }).sort({ _id: -1 })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.get('/api/notes/:priority', async (req, res) => {
    // console.log({ "api_routes.js - get by priority": req.body })
    try {
      const request = await db.Notes.find({ priority: req.params.priority })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.get('/api/note/:id', async (req, res) => {
    // console.log({ "api_routes.js - get one": req.body })
    try {
      const request = await db.Notes.findOne({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.put('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    console.log({ "api_routes.js - update one note": req.body })
    try {
      const request = await db.Notes.updateOne({ _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.body,
          folder_id: req.body.folder_id,
          list_id: req.body.list_id,
          priority: req.body.priority,
          category_id: req.body.category_id ? req.body.category_id : "5e8f7c48d4e1a46221ddb732",
          scheduled: req.body.scheduled,
          scheduled_date: req.body.scheduled_date,
          scheduled_time: req.body.scheduled_time,
          completed: req.body.completed,
          // date_completed: req.body.completed ? new Date().setDate(new Date().getDate()) : "",
          date_completed: new Date().setDate(new Date().getDate()),
          date_modified: new Date().setDate(new Date().getDate())
        })
      // Send the request back to the front end
      res.send(request)

    }
    catch (err) {
      console.log(err);
    }
  })
  app.delete('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js - delete one": req.body })
    try {
      const request = await db.Notes.remove({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })

  // ==================================================
  // Folder Routes
  // ==================================================

  app.get('/api/folders', async (req, res) => {
    // console.log({ "api_routes.js - get all folders": req.body })
    try {
      const request = await db.Folders.find({}).sort({ folder_name: 1 })
      // Send the request back to the front end
      res.send(request)
      // console.log({ "api_routes.js - get all folders": request })
    }
    catch (err) {
      console.log(err);
    }
  })
  app.post('/api/folder', async (req, res) => {
    // console.log({ "api_routes.js": "Hello" })
    console.log({ "api_routes.js - post folder": req.body })
    // Save Need to Database
    try {
      const request = await db.Folders.create({
        folder_name: req.body.folder_name,
        notes: req.body.notes,
        folders: req.body.folders,
        hidden: req.body.hidden,
        date_created: new Date().setDate(new Date().getDate()),
        date_modified: new Date().setDate(new Date().getDate())
      })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.put('/api/folder/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js - update one folder": req.params.id })
    // console.log({ "api_routes.js - update one folder": req.body })
    try {
      const request = await db.Folders.updateOne({ _id: req.params.id },
        {
          folder_name: req.body.folder_name,
          notes: req.body.notes,
          folders: req.body.folders,
          hidden: req.body.hidden,
          date_modified: new Date().setDate(new Date().getDate())
        })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.get('/api/folder/:id', async (req, res) => {
    // console.log({ "api_routes.js - get one": req.body })
    try {
      const request = await db.Folders.findOne({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.delete('/api/folder/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js - delete one": req.body })
    try {
      const request = await db.Folders.remove({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  // ==================================================
  // Category Routes
  // ==================================================

  app.get('/api/categories', async (req, res) => {
    // console.log({ "api_routes.js - get all Categories": req.body })
    try {
      const request = await db.Categories.find({}).sort({ category_name: 1 })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.post('/api/category', async (req, res) => {
    // console.log({ "api_routes.js": "Hello" })
    console.log({ "api_routes.js - post category": req.body })
    // Save Need to Database
    try {
      const request = await db.Categories.create({
        category_name: req.body.category_name,
        priority: req.body.priority,
        notes: req.body.notes,
        hidden: req.body.hidden,
        date_created: new Date().setDate(new Date().getDate()),
        date_modified: new Date().setDate(new Date().getDate())
      })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.put('/api/category/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js - update one category": req.params.id })
    // console.log({ "api_routes.js - update one category": req.body })
    try {
      const request = await db.Categories.updateOne({ _id: req.params.id },
        {
          category_name: req.body.category_name,
          priority: req.body.priority,
          notes: req.body.notes,
          hidden: req.body.hidden,
          date_modified: new Date().setDate(new Date().getDate())
        })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.get('/api/category/:id', async (req, res) => {
    // console.log({ "api_routes.js - get one": req.body })
    try {
      const request = await db.Categories.findOne({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
  app.delete('/api/category/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js - delete one": req.body })
    try {
      const request = await db.Categories.remove({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
}
