const db = require("../models/index");

module.exports = function (app) {

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

}
