const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all players
const getAll = async (req, res) => {
  try {
    const players = await mongodb
      .getDb()
      .collection("players")
      .find()
      .toArray();

    res.status(200).json(players);
  } catch (error) {
    console.error("Error retrieving players:", error);
    res.status(500).json({
      message: "Failed to retrieve players"
    });
  }
};

// GET one player
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid player ID"
      });
    }

    const player = await mongodb
      .getDb()
      .collection("players")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!player) {
      return res.status(404).json({
        message: "Player not found"
      });
    }

    res.status(200).json(player);
  } catch (error) {
    console.error("Error retrieving player:", error);
    res.status(500).json({
      message: "Failed to retrieve player"
    });
  }
};

// CREATE player
const createPlayer = async (req, res) => {
  try {
    const player = {
      name: req.body.name,
      username: req.body.username,
      favoriteGame: req.body.favoriteGame,
      country: req.body.country,
      platform: req.body.platform,
      age: req.body.age,
      hoursPlayed: req.body.hoursPlayed,
      online: req.body.online
    };

    const response = await mongodb
      .getDb()
      .collection("players")
      .insertOne(player);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({
      message: "Failed to create player"
    });
  }
};

// UPDATE player
const updatePlayer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid player ID"
      });
    }

    const player = {
      name: req.body.name,
      username: req.body.username,
      favoriteGame: req.body.favoriteGame,
      country: req.body.country,
      platform: req.body.platform,
      age: req.body.age,
      hoursPlayed: req.body.hoursPlayed,
      online: req.body.online
    };

    const response = await mongodb
      .getDb()
      .collection("players")
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        player
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: "Player not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({
      message: "Failed to update player"
    });
  }
};

// DELETE player
const deletePlayer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid player ID"
      });
    }

    const response = await mongodb
      .getDb()
      .collection("players")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: "Player not found"
      });
    }

    res.status(200).json({
      message: "Player deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({
      message: "Failed to delete player"
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer
};