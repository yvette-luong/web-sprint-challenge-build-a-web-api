
const express = require("express");
const Actiondb = require("../data/helpers/actionModel");
const actionRoute = express.Router();

//get request to /actions
actionRoute.get("/:id", (req, res, next) => {
  Actiondb.get(req.params.id).then((action) => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: " ID does not exist" });
    }
  });
});

actionRoute.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const changes = req.body;

  Actiondb.get(id).then((update) => {
    if (!update) {
      res.status(404).json({ message: "Error for PUT requets" });
    }
    if (changes && update) {
      Actiondb.update(id, changes);
      res.status(200).json(changes);
    } else {
      res.status(500).json({ message: "ehhh failed!" });
    }
  });
});


actionRoute.delete("/:id", (req, res, next ) => {
    const id = req.params.id;
    const changes = req.body;

    Actiondb.remove(id)
        .then((id) => {
            if (id > 0) {
                res.status(200).json({ message: " tada tada "});
            } else {
                res.status(404).json({message:" Deleted success "})
            }
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).json({
                message: " Error in delete request",
            })
        })
})

module.exports = actionRoute