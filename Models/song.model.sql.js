import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/db.config.sql.js";
class SongModel extends Model {}

SongModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.CHAR,
			defaultValue: "ikke navngivet",
			allowNull: false,
		},
		artist_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "SongModel",
		tableName: "song2",
		createdAt: "created",
		updatedAt: false,
	}
);

export default SongModel;
