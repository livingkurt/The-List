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
    console.log({ "api_routes.js": req.body })
    // Save Need to Database
    const request = await db.Notes.create({
      title: req.body.title,
      body: req.body.body,
      folder_id: req.body.folder_id,
      list_id: req.body.list_id,
      priority: req.body.priority,
      scheduled: req.body.scheduled,
      scheduled_date_time: req.body.scheduled_date_time,
      completed: req.body.completed,
      date_modified: new Date().setDate(new Date().getDate())
    })
    // Send the request back to the front end
    res.send(request)
  })

  // ==================================================================================================
  // Get all "notes" from local database based location - Working
  // ==================================================================================================


  app.get('/api/notes', async (req, res) => {

    const request = await db.Notes.find({})
    // Send the request back to the front end
    res.send(request)
  })

  app.get('/api/notes/:list_id', async (req, res) => {

    const request = await db.Notes.find({ list_id: req.params.list_id })
    // Send the request back to the front end
    res.send(request)
  })

  // ==================================================================================================
  // Get single "need" from local database based on the user - Working
  // ==================================================================================================
  app.get('/api/note/:id', async (req, res) => {
    const request = await db.Notes.findOne({ _id: req.params.id })
    // Send the request back to the front end
    res.send(request)

  })

  // ==================================================================================================
  // Update "need" to COMPLETE - Working
  // ==================================================================================================
  app.put('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it

    const request = await db.Notes.updateOne({ _id: req.params.id },
      {
        title: req.body.title,
        body: req.body.body,
        folder_id: req.body.folder_id,
        list_id: req.body.list_id,
        priority: req.body.priority,
        scheduled: req.body.scheduled,
        scheduled_date_time: req.body.scheduled_date_time,
        completed: req.body.completed,
        date_created: new Date().setDate(new Date().getDate()),
        date_modified: new Date().setDate(new Date().getDate())
      })
    // Send the request back to the front end
    res.send(request)
  })

  // ==================================================================================================
  // Delete "need" from database/Mark complete - Working
  // ==================================================================================================
  app.delete('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    // console.log({ "api_routes.js": req.params.id})
    const request = await db.Notes.remove({ _id: req.params.id })
    // Send the request back to the front end
    res.send(request)
  })
}
