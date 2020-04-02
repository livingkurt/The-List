const db = require("../models/index");
// const axios = require("axios");
// const mongojs = require('mongojs')

// Export API Routes to Express
module.exports = function (app) {
  // ==================================================================================================
  // Create "need" via TILE(images of preset groceries) or INPUT BOX(custom need, like medicine)
  // ==================================================================================================
  app.post('/api/note', async (req, res) => {
    // console.log({ "api_routes.js": "Hello" })
    console.log({ "api_routes.js - post": req.body })
    // Save Need to Database
    try {
      const request = await db.Notes.create({
        title: req.body.title,
        body: req.body.body,
        folder_id: req.body.folder_id,
        list_id: req.body.list_id,
        priority: req.body.priority,
        scheduled: req.body.scheduled,
        scheduled_date: req.body.scheduled_date,
        scheduled_time: req.body.scheduled_time,
        completed: req.body.completed,
        date_modified: new Date().setDate(new Date().getDate())
      })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })

  // ==================================================================================================
  // Get all "notes" from local database based location - Working
  // ==================================================================================================


  app.get('/api/notes', async (req, res) => {
    console.log({ "api_routes.js - get all": req.body })
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
    console.log({ "api_routes.js - get by list_id": req.body })
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
    console.log({ "api_routes.js - get by priority": req.body })
    try {
      const request = await db.Notes.find({ priority: req.params.priority })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })

  // ==================================================================================================
  // Get single "need" from local database based on the user - Working
  // ==================================================================================================
  app.get('/api/note/:id', async (req, res) => {
    console.log({ "api_routes.js - get one": req.body })
    try {
      const request = await db.Notes.findOne({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }

  })

  // ==================================================================================================
  // Update "need" to COMPLETE - Working
  // ==================================================================================================
  app.put('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    console.log({ "api_routes.js - update one": req.body })
    try {
      const request = await db.Notes.updateOne({ _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.body,
          folder_id: req.body.folder_id,
          list_id: req.body.list_id,
          priority: req.body.priority,
          scheduled: req.body.scheduled,
          scheduled_date: req.body.scheduled_date,
          scheduled_time: req.body.scheduled_time,
          completed: req.body.completed,
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

  // ==================================================================================================
  // Delete "need" from database/Mark complete - Working
  // ==================================================================================================
  app.delete('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js": req.params.id})
    console.log({ "api_routes.js - delete one": req.body })
    try {
      const request = await db.Notes.remove({ _id: req.params.id })
      // Send the request back to the front end
      res.send(request)
    }
    catch (err) {
      console.log(err);
    }
  })
}
