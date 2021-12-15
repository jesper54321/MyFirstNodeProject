import db from "../Config/db2.config.js";

class SongModel {
	constructor() {
		console.log("Class song model is loaded");
	}

	list = async (req, res) => {
		const orderKey = req.query.orderBy || "s.id";
		const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";
		const direction = req.query.direction || "ASC";
		let sql = `SELECT s.id, s.title, a.name AS artist FROM song s INNER JOIN artist a ON s.artist_id = a.id ORDER BY ${orderKey} ${direction} ${limit}`;
		try {
			const [result, meta] = await db.query(sql);
			return [result, null];
		} catch (err) {
			console.error(err);
			return [null, { techMessage: err, message: "", status: 400 }];
		}
	};

	search = async (req, res) => {
		const searchTerm = req.params.search;
		const searchWords = "%" + Object.values(req.body)[0] + "%";
		let sql = `SELECT s.id, s.title, a.name AS artist FROM song s INNER JOIN artist a ON s.artist_id = a.id where ${searchTerm} LIKE ?;`;
		try {
			const [result, meta] = await db.query(sql, [searchWords]);

			return [result, null];
		} catch (err) {
			console.error(err);
			return [null, { techMessage: err, message: "", status: 400 }];
		}
	};

	get = async (req, res) => {
		const sql = `SELECT s.id, s.title, s.content, a.name AS artist  
							FROM song s 
							JOIN artist a 
							ON s.artist_id = a.id 
							WHERE s.id = ?`;
		try {
			const [result, meta] = await db.query(sql, [req.params.id]);

			return [result, null];
		} catch (err) {
			console.error(err);
			return [null, { techMessage: err, message: "", status: 400 }];
		}
	};

	create = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		const sql = `INSERT INTO song(title, content, artist_id) 
							VALUES(?,?,?)`;
		try {
			const [result, meta] = await db.query(sql, arrFormValues);

			return [result, null];
		} catch (err) {
			console.error(err);
			return [null, { techMessage: err, message: "", status: 400 }];
		}
	};

	update = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		arrFormValues.push(req.params.id);
		const sql = `update song set title = ?, content = ?, artist_id = ? where id = ?`;
		try {
			const [result, meta] = await db.query(sql, arrFormValues);

			return [result, null];
		} catch (err) {
			console.error(err);
			return [null, { techMessage: err, message: "", status: 400 }];
		}
	};

	delete = async (req, res) => {
		const sql = `delete from song where id = ?`;
		try {
			const [result, meta] = await db.query(sql, [req.params.id]);

			return [result, null];
		} catch (err) {
			console.error(err);
			return [null, { techMessage: err, message: "", status: 400 }];
		}
	};
}

export default SongModel;
