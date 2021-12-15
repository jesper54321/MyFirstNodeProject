import express from "express";
import artistController from "../Controllers/artist.controller.js";

const router = express.Router();
const controller = new artistController();

// Kalder routes med controller metoder
router.get("/api/artists", (req, res) => {
	controller.list(req, res);
});
router.get("/api/artists/:id([0-9]*)", (req, res) => {
	controller.get(req, res);
});
router.get("/api/artists/:search", (req, res) => {
	controller.search(req, res);
});
router.post("/api/artists", (req, res) => {
	controller.create(req, res);
});
router.put("/api/artists/:id([0-9]*)", (req, res) => {
	controller.update(req, res);
});
router.delete("/api/artists/:id([0-9]*)", (req, res) => {
	controller.delete(req, res);
});

export { router };
