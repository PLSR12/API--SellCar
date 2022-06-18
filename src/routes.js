import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer"

import CarController from "./app/controller/CarController"
import SessionController from "./app/controller/SessionController"
import UserController from "./app/controller/UserController"
import CategoryController from "./app/controller/CategoryController"

import authMiddleware from "./app/middlewares/auth"

const upload = multer(multerConfig)

const routes = new Router()

routes.post("/users", UserController.store)
routes.get("/users", UserController.index)
routes.get("/users/:id", UserController.indexOne)
routes.put("/users/:id", UserController.update)

routes.post("/sessions", SessionController.store)

routes.get("/cars", CarController.index)
routes.get("/cars/:id", CarController.indexOne)
routes.post("/cars", authMiddleware, upload.single("file"), CarController.store)
routes.put(
  "/cars/:id",
  authMiddleware,
  upload.single("file"),
  CarController.update
)
routes.delete("/cars/:id", authMiddleware, CarController.delete)

routes.get("/categories", CategoryController.index)
routes.post(
  "/categories",
  authMiddleware,
  upload.single("file"),
  CategoryController.store
)
routes.put(
  "/categories/:id",
  authMiddleware,
  upload.single("file"),
  CategoryController.update
)

export default routes
