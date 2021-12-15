import SongModel from "../Models/song.model.js";
const model = new SongModel();

class SongController {
	constructor() {
		console.log("Class song controller is loaded");
	}

	list = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.json({ resultCount: result[1].length, items: result[1] });
	};

	search = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.json({ resultCount: result[1].length, items: result[1] });
	};

	get = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.json(...result[1]);
	};

	create = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.json({ status: "OK", id: result[1].insertId, ...req.body });
	};

	update = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.json({ id: req.params.id, ...req.body });
	};

	delete = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.json({ status: "OK", id: req.params.id });
	};
}

export default SongController;
