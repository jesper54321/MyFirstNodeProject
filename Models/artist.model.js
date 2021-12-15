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
		try {
			const [result, meta] = await db.query(sql);
			return [result, null];
		} catch (err) {
			const error = await errorTesting(err.errno + ": " + err.code);
			console.log(error);
			return [
				null,
				{
					techMessage: err,
					message: error.message,
					status: error.status || 400,
				},
			];
		}
	};

	search = async (req, res) => {
		const searchTerm = req.params.search;
		const searchWords = "%" + Object.values(req.body)[0] + "%";
		let sql = `SELECT id, name FROM artist where ${searchTerm} LIKE ?;`;
		try {
			const [result, meta] = await db.query(sql, [searchWords]);
			return [result, null];
		} catch (err) {
			const error = await errorTesting(err.errno + ": " + err.code);
			console.log(error);
			return [
				null,
				{
					techMessage: err,
					message: error.message,
					status: error.status || 400,
				},
			];
		}
	};

	get = async (req, res) => {
		const sql = `SELECT id, name  
							FROM artist
							WHERE id = ?`;
		try {
			const [result, meta] = await db.query(sql, [req.params.id]);
			return [result, null];
		} catch (err) {
			const error = await errorTesting(err.errno + ": " + err.code);
			console.log(error);
			return [
				null,
				{
					techMessage: err,
					message: error.message,
					status: error.status || 400,
				},
			];
		}
	};

	create = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		const sql = `INSERT INTO artist(name) 
							VALUES(?)`;
		try {
			const [result, meta] = await db.query(sql, arrFormValues);
			return [result, null];
		} catch (err) {
			const error = await errorTesting(err.errno + ": " + err.code);
			console.log(error);
			return [
				null,
				{
					techMessage: err,
					message: error.message,
					status: error.status || 400,
				},
			];
		}
	};

	update = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		arrFormValues.push(req.params.id);
		const sql = `update artist set name = ? where id = ?`;
		try {
			const [result, meta] = await db.query(sql, arrFormValues);
			return [result, null];
		} catch (err) {
			const error = await errorTesting(err.errno + ": " + err.code);
			console.log(error);
			return [
				null,
				{
					techMessage: err,
					message: error.message,
					status: error.status || 400,
				},
			];
		}
	};

	delete = async (req, res) => {
		const sql = `delete from artist where id = ?`;
		try {
			const [result, meta] = await db.query(sql, [req.params.id]);
			return [result, null];
		} catch (err) {
			const error = await errorTesting(err.errno + ": " + err.code);
			console.log(error);
			return [
				null,
				{
					techMessage: err,
					message: error.message,
					status: error.status || 400,
				},
			];
		}
	};
}

export default ArtistModel;
