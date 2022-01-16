import { ArtistModel, SongModel } from "../Models/custom.model.js";
import { Op, Sequelize, DataTypes } from "sequelize";
import sequelize from "../Config/db.config.sql.js";

class Controller {
	constructor() {
		console.log(`Sequelize ${this.constructor.name} initialised`);
	}

	list = async (req, res) => {
		const result = await SongModel.findAll({
			attributes: ["id", "title", "artist_id"],
			include: ArtistModel,
			limit: parseInt(req.query.limit) || 1000000,
			order: [[req.query.orderBy || "id", req.query.direction || "ASC"]],
		});
		res.status(200).send({ status: "OK", items: result });
	};

	search = async (req, res) => {
		const result = await SongModel.findAll({
			attributes: ["id", "name"],
			where: sequelize.where(sequelize.col(req.params.search), {
				[Op.like]: "%" + req.body.searchWords + "%",
			}),
		});
		res.status(200).send({ status: "OK", items: result });
	};

	get = async (req, res) => {
		const result = await SongModel.findByPk(req.params.id);
		res.status(200).send({ status: "OK", items: result });
	};

	create = async (req, res) => {
		const result = await SongModel.create(req.body);
		res.status(200).send({ status: "OK", items: result });
	};

	update = async (req, res) => {
		const result = await SongModel.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).send({ status: "OK", items: req.body });
	};

	delete = async (req, res) => {
		const result = await SongModel.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).send({ status: "OK", id: req.params.id });
	};
}

export default Controller;
