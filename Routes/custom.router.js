import express from "express";
import Controller from "../Controllers/custom.controller.js";

const router = express.Router();
const controller = new Controller();

// Kalder routes med controller metoder
router.get("/api/customs", (req, res) => {
	controller.list(req, res);
});
router.get("/api/customs/:id([0-9]*)", (req, res) => {
	controller.get(req, res);
});
router.get("/api/customs/:search", (req, res) => {
	controller.search(req, res);
});
router.post("/api/customs", (req, res) => {
	controller.create(req, res);
});
router.put("/api/customs/:id([0-9]*)", (req, res) => {
	controller.update(req, res);
});
router.delete("/api/customs/:id([0-9]*)", (req, res) => {
	controller.delete(req, res);
});

export { router };
