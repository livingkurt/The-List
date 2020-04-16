const db = require("../models/index");

// Export API Routes to Express
module.exports = function (app) {

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
