import ArtistModel from "../Models/artist.model.js";
const model = new ArtistModel();

class ArtistController {
	constructor() {
		console.log("Class artist controller is loaded");
	}

	list = async (req, res) => {
		const [result, err] = await model.list(req, res);
		if (err) res.status(err.status).json(err.message);
		else res.status(200).json({ resultCount: result.length, items: result });
	};

	search = async (req, res) => {
		const [result, err] = await model.search(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.status(200).json({ resultCount: result.length, items: result });
	};

	get = async (req, res) => {
		const [result, err] = await model.get(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.status(200).json(...result);
	};

	create = async (req, res) => {
		const [result, err] = await model.create(req, res);
		if (err) res.status(err.status).send(err.message);
		else
			res.status(200).json({ status: "OK", id: result.insertId, ...req.body });
	};

	update = async (req, res) => {
		const [result, err] = await model.update(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.status(200).json({ id: req.params.id, ...req.body });
	};

	delete = async (req, res) => {
		const [result, err] = await model.delete(req, res);
		if (err) res.status(err.status).send(err.message);
		else res.status(200).json({ status: "OK", id: req.params.id });
	};
}

export default ArtistController;
