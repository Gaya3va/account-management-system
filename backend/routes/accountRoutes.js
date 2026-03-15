import express from "express"
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {getBalance,transferMoney,getStatement} from "../controllers/accountController.js"

const router = express.Router()

router.get("/balance",authMiddleware,getBalance)

router.get("/statement",authMiddleware,getStatement)

router.post("/transfer",authMiddleware,transferMoney)

export default router