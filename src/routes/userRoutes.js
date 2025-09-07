import express from "express";
import { getUsers, updateUserRole, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("admin"), getUsers);
router.put("/:id/role", authMiddleware, roleMiddleware("admin"), updateUserRole);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

export default router;
