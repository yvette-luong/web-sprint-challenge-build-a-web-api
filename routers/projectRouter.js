const express = require("express");
const { getProjectActions } = require("../data/helpers/projectModel");
const Projectdb = require("../data/helpers/projectModel");
const projectRoute = express.Router();

//GET request to /projects/:id
projectRoute.get("/:id", (req, res, next) => {
  Projectdb.get(req.params.id).then((action) => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: " ID does not exist - Project-router" });
    }
  });
});

// PUT request to /projects/:id
projectRoute.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const changes = req.body;

  Projectdb.get(id).then((update) => {
    if (!update) {
      res
        .status(404)
        .json({ message: "Error for PUT requets - project Router" });
    }
    if (changes && update) {
      Projectdb.update(id, changes);
      res.status(200).json(changes);
    } else {
      res.status(500).json({ message: "ehhh failed! - Project- router" });
    }
  });
});

// POST request to /projects
// projectRoute.post("/", (req, res, next) => {
// //   if (req.body.name && req.body.description) {
//     Projectdb.insert(req.body)
//       .then((post) => {
//         res.status(201).json(post);
//       })
//       .catch((error) => {
//         // log error to database
//         console.log(error);
//         res.status(500).json({
//           error: "There was an error while saving the post to the database",
//         });
//       });

// //   } else {
// //     res.status(400).json({
// //       errorMessage: " provide name and decriptions for post request",
// //     });
//   }
// );

//POST resquest without `(400)status`
projectRoute.post("/", (req, res, next) => {
    Projectdb.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    }); 
})

//POST request to /projects/:id
projectRoute.post("/:id/actions", (req, res) => {
    const actions = req.body;
actions.project_id = req.params.id;

    Projectdb.get(req.params.project_id).then((action) => {
      if (!action) {
        res.status(404).json({ message: " Error " });
      }
      if (actions.name === "") {
        res
          .status(400)
          .json({ message: "Please provide name. " });
      }
      if (actions) {
        // actions.project_id = id;
        Projectdb.insert(actions);
        res.status(201).json(action);
      } else {
        res
          .status(500)
          .json({ message: "err err err errrr!" });  
      }
    });
  });
  

// DELETE request to /project/:id

projectRoute.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Projectdb.remove(id)
    .then((id) => {
      if (id > 0) {
        res.status(200).json({ message: " tada tada, you boo, say bye! " });
      } else {
        res.status(404).json({ message: " Deleted success, happy srpint! " });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: " Error in delete request, sad life!",
      });
    });
});

module.exports = projectRoute;
