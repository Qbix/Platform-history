/**
 * Autogenerated base class representing visit rows
 * in the Places database.
 *
 * Don't change this file, since it can be overwritten.
 * Instead, change the Places/Visit.js file.
 *
 * @module Places
 */

var Q = require('Q');
var Db = Q.require('Db');
var Places = Q.require('Places');
var Row = Q.require('Db/Row');

/**
 * Base class representing 'Visit' rows in the 'Places' database
 * @namespace Base.Places
 * @class Visit
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
 * @type id
 */
/**
 * @property {String}
 * @type sessionId
 */
/**
 * @property {String}
 * @type insertedTime
 */
/**
 * @property {String}
 * @type url
 */
/**
 * @property {String}
 * @type hostname
 */
/**
 * @property {String}
 * @type from_share_id
 */
/**
 * @property {integer}
 * @type share_count
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
	if (Q.Config.get(['Db', 'connections', 'Places', 'indexes', 'Visit'], false)) {
		return new Db.Expression((withoutDbName ? '' : '{$dbname}.')+'{$prefix}visit');
	} else {
		var conn = Db.getConnection('Places');
		var prefix = conn.prefix || '';
		var tableName = prefix + 'visit';
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
	q.className = 'Places_Visit';
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
	q.className = 'Places_Visit';
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
	q.className = 'Places_Visit';
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
	q.className = 'Places_Visit';
	return q;
};

/**
 * The name of the class
 * @property className
 * @type string
 */
Base.prototype.className = "Places_Visit";

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
		"id",
		"sessionId",
		"insertedTime",
		"url",
		"hostname",
		"from_share_id",
		"share_count"
	];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_id
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_id = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".id");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".id");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the id field
	 * @return {integer}
	 */
Base.prototype.maxSize_id = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_sessionId
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_sessionId = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".sessionId");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".sessionId");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the sessionId field
	 * @return {integer}
	 */
Base.prototype.maxSize_sessionId = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_insertedTime
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_insertedTime = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".insertedTime");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".insertedTime");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the insertedTime field
	 * @return {integer}
	 */
Base.prototype.maxSize_insertedTime = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_url
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_url = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".url");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".url");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the url field
	 * @return {integer}
	 */
Base.prototype.maxSize_url = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_hostname
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_hostname = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".hostname");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".hostname");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the hostname field
	 * @return {integer}
	 */
Base.prototype.maxSize_hostname = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_from_share_id
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_from_share_id = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".from_share_id");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".from_share_id");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the from_share_id field
	 * @return {integer}
	 */
Base.prototype.maxSize_from_share_id = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_share_count
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_share_count = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".share_count");
		if (value < 0 || value > 4294967295)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".share_count");
		return value;
};

/**
 * Returns the maximum integer that can be assigned to the share_count field
 * @return {integer}
 */
Base.prototype.maxSize_share_count = function () {

		return 4294967295;
};

module.exports = Base;