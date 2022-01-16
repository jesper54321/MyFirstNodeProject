import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/db.config.sql.js";
class ArtistModel extends Model {}

ArtistModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.CHAR,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "ArtistModel",
		tableName: "artist2",
		createdAt: "created",
		updatedAt: false,
	}
);

export default ArtistModel;
