import db from "../Config/db2.config.js";

class ArtistModel {
	constructor() {
		console.log("Class artist model is loaded");
	}

	list = async (req, res) => {
		const orderKey = req.query.orderBy || "id";
		const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";
		const direction = req.query.direction || "ASC";
		let sql = `SELECT id, name from artist ORDER BY ${orderKey} ${direction} ${limit}`;
		const [result, meta] = await db.query(sql).catch(console.log);
		return result;
	};

	search = async (req, res) => {
		const searchTerm = req.params.search;
		const searchWords = "%" + Object.values(req.body)[0] + "%";
		let sql = `SELECT id, name FROM artist where ${searchTerm} LIKE ?;`;
		const [result, meta] = await db
			.query(sql, [searchWords])
			.catch(console.log);
		return result;
	};

	get = async (req, res) => {
		const sql = `SELECT id, name  
							FROM artist
							WHERE id = ?`;
		const [result, meta] = await db
			.query(sql, [req.params.id])
			.catch(console.log);
		return result;
	};

	create = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		const sql = `INSERT INTO artist(name) 
							VALUES(?)`;
		const [result, meta] = await db
			.query(sql, arrFormValues)
			.catch(console.log);
		return result;
	};

	update = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		arrFormValues.push(req.params.id);
		const sql = `update artist set name = ? where id = ?`;
		const [result, meta] = await db
			.query(sql, arrFormValues)
			.catch(console.log);
		return result;
	};

	delete = async (req, res) => {
		const sql = `delete from artist where id = ?`;
		const [result, meta] = await db
			.query(sql, [req.params.id])
			.catch(console.log);
		return result;
	};
}

export default ArtistModel;
