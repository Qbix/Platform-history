/**
 * Autogenerated base class representing zipcode rows
 * in the Places database.
 *
 * Don't change this file, since it can be overwritten.
 * Instead, change the Places/Zipcode.js file.
 *
 * @module Places
 */

var Q = require('Q');
var Db = Q.require('Db');
var Places = Q.require('Places');
var Row = Q.require('Db/Row');

/**
 * Base class representing 'Zipcode' rows in the 'Places' database
 * @namespace Base.Places
 * @class Zipcode
 * @extends Db.Row
 * @constructor
 * @param {object} [fields={}] The fields values to initialize table row as 
 * an associative array of `{column: value}` pairs
 */
function Base (fields) {
	Base.constructors.apply(this, arguments);
}

Q.mixin(Base, Row);

/**
 * @property {String}
 * @type countryCode
 */
/**
 * @property {String}
 * @type zipcode
 */
/**
 * @property {String}
 * @type placeName
 */
/**
 * @property {String}
 * @type stateName
 */
/**
 * @property {String}
 * @type state
 */
/**
 * @property {String}
 * @type regionName
 */
/**
 * @property {String}
 * @type region
 */
/**
 * @property {String}
 * @type community
 */
/**
 * @property {number}
 * @type latitude
 */
/**
 * @property {number}
 * @type longitude
 */
/**
 * @property {integer}
 * @type accuracy
 */

/**
 * This method calls Db.connect() using information stored in the configuration.
 * If this has already been called, then the same db object is returned.
 * @method db
 * @return {Db} The database connection
 */
Base.db = function () {
	return Places.db();
};

/**
 * Retrieve the table name to use in SQL statements
 * @method table
 * @param {boolean} [withoutDbName=false] Indicates wheather table name should contain the database name
 * @return {String|Db.Expression} The table name as string optionally without database name if no table sharding was started
 * or Db.Expression object with prefix and database name templates is table was sharded
 */
Base.table = function (withoutDbName) {
	if (Q.Config.get(['Db', 'connections', 'Places', 'indexes', 'Zipcode'], false)) {
		return new Db.Expression((withoutDbName ? '' : '{$dbname}.')+'{$prefix}zipcode');
	} else {
		var conn = Db.getConnection('Places');
		var prefix = conn.prefix || '';
		var tableName = prefix + 'zipcode';
		var dbname = Base.table.dbname;
		if (!dbname) {
			var dsn = Db.parseDsnString(conn['dsn']);
			dbname = Base.table.dbname = dsn.dbname;
		}
		return withoutDbName ? tableName : dbname + '.' + tableName;
	}
};

/**
 * The connection name for the class
 * @method connectionName
 * @return {string} The name of the connection
 */
Base.connectionName = function() {
	return 'Places';
};

/**
 * Create SELECT query to the class table
 * @method SELECT
 * @param {object|string} fields The field values to use in WHERE clauseas as an associative array of `{column: value}` pairs
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.SELECT = function(fields, alias) {
	var q = Base.db().SELECT(fields, Base.table()+(alias ? ' '+alias : ''));
	q.className = 'Places_Zipcode';
	return q;
};

/**
 * Create UPDATE query to the class table. Use Db.Query.Mysql.set() method to define SET clause
 * @method UPDATE
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.UPDATE = function(alias) {
	var q = Base.db().UPDATE(Base.table()+(alias ? ' '+alias : ''));
	q.className = 'Places_Zipcode';
	return q;
};

/**
 * Create DELETE query to the class table
 * @method DELETE
 * @param {object}[table_using=null] If set, adds a USING clause with this table
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.DELETE = function(table_using, alias) {
	var q = Base.db().DELETE(Base.table()+(alias ? ' '+alias : ''), table_using);
	q.className = 'Places_Zipcode';
	return q;
};

/**
 * Create INSERT query to the class table
 * @method INSERT
 * @param {object} [fields={}] The fields as an associative array of `{column: value}` pairs
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.INSERT = function(fields, alias) {
	var q = Base.db().INSERT(Base.table()+(alias ? ' '+alias : ''), fields || {});
	q.className = 'Places_Zipcode';
	return q;
};

/**
 * The name of the class
 * @property className
 * @type string
 */
Base.prototype.className = "Places_Zipcode";

// Instance methods

/**
 * Create INSERT query to the class table
 * @method INSERT
 * @param {object} [fields={}] The fields as an associative array of `{column: value}` pairs
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.prototype.setUp = function() {
	// does nothing for now
};

/**
 * Create INSERT query to the class table
 * @method INSERT
 * @param {object} [fields={}] The fields as an associative array of `{column: value}` pairs
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.prototype.db = function () {
	return Base.db();
};

/**
 * Retrieve the table name to use in SQL statements
 * @method table
 * @param {boolean} [withoutDbName=false] Indicates wheather table name should contain the database name
 * @return {String|Db.Expression} The table name as string optionally without database name if no table sharding was started
 * or Db.Expression object with prefix and database name templates is table was sharded
 */
Base.prototype.table = function () {
	return Base.table();
};

/**
 * Retrieves primary key fields names for class table
 * @method primaryKey
 * @return {string[]} An array of field names
 */
Base.prototype.primaryKey = function () {
	return [
		
	];
};

/**
 * Retrieves field names for class table
 * @method fieldNames
 * @return {array} An array of field names
 */
Base.prototype.fieldNames = function () {
	return [
		"countryCode",
		"zipcode",
		"placeName",
		"stateName",
		"state",
		"regionName",
		"region",
		"community",
		"latitude",
		"longitude",
		"accuracy"
	];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_countryCode
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_countryCode = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".countryCode");
		if (typeof value === "string" && value.length > 2)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".countryCode");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the countryCode field
	 * @return {integer}
	 */
Base.prototype.maxSize_countryCode = function () {

		return 2;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_zipcode
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_zipcode = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".zipcode");
		if (typeof value === "string" && value.length > 10)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".zipcode");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the zipcode field
	 * @return {integer}
	 */
Base.prototype.maxSize_zipcode = function () {

		return 10;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_placeName
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_placeName = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".placeName");
		if (typeof value === "string" && value.length > 180)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".placeName");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the placeName field
	 * @return {integer}
	 */
Base.prototype.maxSize_placeName = function () {

		return 180;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_stateName
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_stateName = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".stateName");
		if (typeof value === "string" && value.length > 100)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".stateName");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the stateName field
	 * @return {integer}
	 */
Base.prototype.maxSize_stateName = function () {

		return 100;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_state
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_state = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".state");
		if (typeof value === "string" && value.length > 20)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".state");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the state field
	 * @return {integer}
	 */
Base.prototype.maxSize_state = function () {

		return 20;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_regionName
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_regionName = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".regionName");
		if (typeof value === "string" && value.length > 100)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".regionName");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the regionName field
	 * @return {integer}
	 */
Base.prototype.maxSize_regionName = function () {

		return 100;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_region
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_region = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".region");
		if (typeof value === "string" && value.length > 20)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".region");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the region field
	 * @return {integer}
	 */
Base.prototype.maxSize_region = function () {

		return 20;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_community
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_community = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".community");
		if (typeof value === "string" && value.length > 100)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".community");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the community field
	 * @return {integer}
	 */
Base.prototype.maxSize_community = function () {

		return 100;
};

/**
 * Method is called before setting the field to verify if value is a number
 * @method beforeSet_latitude
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} If 'value' is not number
 */
Base.prototype.beforeSet_latitude = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value))
			throw new Error('Non-number value being assigned to '+this.table()+".latitude");
		return value;
};

/**
 * Method is called before setting the field to verify if value is a number
 * @method beforeSet_longitude
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} If 'value' is not number
 */
Base.prototype.beforeSet_longitude = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value))
			throw new Error('Non-number value being assigned to '+this.table()+".longitude");
		return value;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_accuracy
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_accuracy = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".accuracy");
		if (value < -2147483648 || value > 2147483647)
			throw new Error("Out-of-range value '"+value+"' being assigned to "+this.table()+".accuracy");
		return value;
};

	/**
	 * Returns the maximum integer that can be assigned to the accuracy field
	 * @return {integer}
	 */
Base.prototype.maxSize_accuracy = function () {

		return 2147483647;
};

module.exports = Base;