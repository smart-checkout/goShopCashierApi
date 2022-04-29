const express = require("express")
const { listByUserId, addcheckout } = require("../controllers/checkout")
const router = express.Router()



router.get("/listByUserId", listByUserId)
router.post("/addcheckout", addcheckout)

module.exports = router