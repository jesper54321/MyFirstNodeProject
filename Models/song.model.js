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
		const [result, meta] = await db.query(sql).catch(console.log);
		return result;
	};

	search = async (req, res) => {
		const searchTerm = req.params.search;
		const searchWords = "%" + Object.values(req.body)[0] + "%";
		let sql = `SELECT s.id, s.title, a.name AS artist FROM song s INNER JOIN artist a ON s.artist_id = a.id where ${searchTerm} LIKE ?;`;
		const [result, meta] = await db
			.query(sql, [searchWords])
			.catch(console.log);
		return result;
	};

	get = async (req, res) => {
		const sql = `SELECT s.id, s.title, s.content, a.name AS artist  
							FROM song s 
							JOIN artist a 
							ON s.artist_id = a.id 
							WHERE s.id = ?`;
		const [result, meta] = await db
			.query(sql, [req.params.id])
			.catch(console.log);
		return result;
	};

	create = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		const sql = `INSERT INTO song(title, content, artist_id) 
							VALUES(?,?,?)`;
		const [result, meta] = await db
			.query(sql, arrFormValues)
			.catch(console.log);
		return result;
	};

	update = async (req, res) => {
		const arrFormValues = Object.values(req.body);
		arrFormValues.push(req.params.id);
		const sql = `update song set title = ?, content = ?, artist_id = ? where id = ?`;
		const [result, meta] = await db
			.query(sql, arrFormValues)
			.catch(console.log);
		return result;
	};

	delete = async (req, res) => {
		const sql = `delete from song where id = ?`;
		const [result, meta] = await db
			.query(sql, [req.params.id])
			.catch(console.log);
		return result;
	};
}

export default SongModel;
