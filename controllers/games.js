const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all games
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("games").find();
    const games = await result.toArray();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one game
const getSingle = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    const game = await mongodb
      .getDb()
      .collection("games")
      .findOne({ _id: gameId });

    if (!game) {
      return res.status(404).json({
        message: "Game not found"
      });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE game
const createGame = async (req, res) => {
  try {
    const game = {
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
      developer: req.body.developer,
      publisher: req.body.publisher,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      completed: req.body.completed,
      hoursPlayed: req.body.hoursPlayed
    };

    const response = await mongodb
      .getDb()
      .collection("games")
      .insertOne(game);

    if (response.acknowledged) {
      res.status(201).json({
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: "Failed to create game."
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE game
const updateGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    const game = {
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
      developer: req.body.developer,
      publisher: req.body.publisher,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      completed: req.body.completed,
      hoursPlayed: req.body.hoursPlayed
    };

    const response = await mongodb
      .getDb()
      .collection("games")
      .replaceOne(
        { _id: gameId },
        game
      );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Game not found."
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE game
const deleteGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection("games")
      .deleteOne({
        _id: gameId
      });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "Game deleted."
      });
    } else {
      res.status(404).json({
        message: "Game not found."
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createGame,
  updateGame,
  deleteGame
};