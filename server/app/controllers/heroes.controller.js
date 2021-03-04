const { heroes } = require("../models")
const db = require("../models")
const Heroes = db.heroes


// Pagination setting
const getPagination = (page, size) => {
  const limit = size ? +size : 5
  const offset = page ? page * limit : 0

  return { limit, offset }
}

// Create and Save a new Hero
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nickname) {
      res.status(400).send({ message: "Content can not be empty!" })
      return
    }

    const heroes = new Heroes({
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        superpowers: req.body.superpowers,
        catch_phrase: req.body.catch_phrase,
        images: req.body.images
      })
  
    // Save Tutorial in the database
    heroes
      .save(heroes)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Hero."
        })
      })
  }


// Retrieve all Heroes from the database.
exports.findAll = (req, res) => { 

    const { page, size, nickname } = req.query
    // const nickname = req.query.nickname
    var condition = nickname ? { nickname: { $regex: new RegExp(nickname), $options: "i" } } : {}
  
    const { limit, offset } = getPagination(page, size)


    Heroes.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        heroes: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      })
    })
    // Heroes.find(condition)
      .then(data => { 
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving heroes."
        })
      })
  }


// Find a single Hero with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Heroes.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Hero with id " + id })
      else res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Hero with id=" + id })
    })
}


// Update a Hero by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      })
    }
  
    const id = req.params.id
  
    Heroes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Hero with id=${id}. Maybe Hero was not found!`
          })
        } else res.send({ message: "Hero was updated successfully." })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Hero with id=" + id
        })
      })
  }


// Delete a Hero with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id
  
    Heroes.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Hero with id=${id}. Maybe Hero was not found!`
          })
        } else {
          res.send({
            message: "Hero was deleted successfully!"
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hero with id=" + id
        })
      })
  }

