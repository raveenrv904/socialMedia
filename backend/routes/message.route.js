const express = require("express");
const getMessage = require("../controllers/message.controller");

const router = express.Router();

router.get("/:userId/:receiverId", getMessage);

module.exports = router;
