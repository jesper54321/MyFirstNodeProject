import db from "../Config/db2.config.js";

const [errorDb] = await db.query("SELECT * FROM error_handling.error_codes");

const localErrors = {
	new: [],
	known: {},
};

for (const error of errorDb) {
	if (error.friendlyText != null) {
		localErrors.known[error.error] = {
			status: error.status,
			message: error.friendlyText,
		};
	} else {
		localErrors.new.push(error.error);
	}
}

const unknownError = async (err_code) => {
	if (!localErrors.new.includes(err_code)) {
		db.query("INSERT INTO error_handling.error_codes (error) values(?)", [
			err_code,
		]);
		localErrors.new.push(err_code);
	}
	return { status: 400, message: err_code };
};

const errorTesting = async (error) => {
	return (await localErrors.known[error]) || (await unknownError(error));
};

export default errorTesting;
