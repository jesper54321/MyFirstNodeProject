import ArtistModel from "../Models/artist.model.js";
const model = new ArtistModel();

class ArtistController {
	constructor() {
		console.log("Class artist controller is loaded");
	}

	list = async (req, res) => {
		const result = await model.list(req, res);
		res.json(result);
	};

	search = async (req, res) => {
		const result = await model.search(req, res);
		res.json({ resultCount: result.length, items: result });
	};

	get = async (req, res) => {
		const result = await model.get(req, res);
		res.json(result);
	};

	create = async (req, res) => {
		const result = await model.create(req, res);
		res.json({ status: "OK", id: result.insertId });
	};

	update = async (req, res) => {
		const result = await model.update(req, res);
		res.json(result);
	};

	delete = async (req, res) => {
		const result = await model.delete(req, res);
		res.json(result);
	};
}

export default ArtistController;
