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
      priority: req.body.priority,
      scheduled: req.body.scheduled,
      scheduled_date_time: req.body.scheduled_date_time,
      date_created: Date.now,
      date_modified: Date.now
    })
    // Send the request back to the front end
    res.send(request)
  })

  // ==================================================================================================
  // Get all "needs" from local database based location - Working
  // ==================================================================================================
  app.get('/api/notes', async (req, res) => {


    const request = await db.Notes.find({})
    // Send the request back to the front end
    // console.log({ "api_routes.js": request })
    res.send(request)
  })

  // ==================================================================================================
  // Get single "need" from local database based on the user - Working
  // ==================================================================================================
  app.get('/api/note/:id', async (req, res) => {
    const request = await db.Notes.findOne({ _id: req.params.id })
    // Send the request back to the front end
    res.send({ "Get Single Note": request })

  })

  // ==================================================================================================
  // Update "need" to COMPLETE - Working
  // ==================================================================================================
  app.patch('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    const request = await db.Notes.findOneAndUpdate({ _id: req.params.id },
      {
        title: req.body.title,
        body: req.body.body,
        folder_id: req.body.folder_id,
        priority: req.body.priority,
        scheduled: req.body.scheduled,
        scheduled_date_time: req.body.scheduled_date_time,
        date_modified: Date.now
      })
    // Send the request back to the front end
    res.send({ "Update Note": request })
  })

  // ==================================================================================================
  // Delete "need" from database/Mark complete - Working
  // ==================================================================================================
  app.delete('/api/note/:id', async (req, res) => {
    // Create an empty workout object ready for exercises to get put into it
    const request = await db.Notes.remove({ _id: req.params.id })
    // Send the request back to the front end
    res.send({ "Deleted Note": request })
  })
}
