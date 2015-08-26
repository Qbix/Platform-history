/**
 * Autogenerated base class representing share rows
 * in the Platform database.
 *
 * Don't change this file, since it can be overwritten.
 * Instead, change the Platform/Share.js file.
 *
 * @module Platform
 */

var Q = require('Q');
var Db = Q.require('Db');
var Platform = Q.require('Platform');
var Row = Q.require('Db/Row');

/**
 * Base class representing 'Share' rows in the 'Platform' database
 * @namespace Base.Platform
 * @class Share
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
 * @type share_id
 */
/**
 * @property {String}
 * @type visit_id
 */
/**
 * @property {integer}
 * @type insertedTime
 */
/**
 * @property {integer}
 * @type shared_time
 */
/**
 * @property {String}
 * @type url
 */
/**
 * @property {String}
 * @type tag1
 */
/**
 * @property {String}
 * @type tag2
 */
/**
 * @property {String}
 * @type tag3
 */
/**
 * @property {integer}
 * @type publisherId
 */
/**
 * @property {integer}
 * @type visit_count
 */
/**
 * @property {integer}
 * @type session_count
 */

/**
 * This method calls Db.connect() using information stored in the configuration.
 * If this has already been called, then the same db object is returned.
 * @method db
 * @return {Db} The database connection
 */
Base.db = function () {
	return Platform.db();
};

/**
 * Retrieve the table name to use in SQL statements
 * @method table
 * @param {boolean} [withoutDbName=false] Indicates wheather table name should contain the database name
 * @return {String|Db.Expression} The table name as string optionally without database name if no table sharding was started
 * or Db.Expression object with prefix and database name templates is table was sharded
 */
Base.table = function (withoutDbName) {
	if (Q.Config.get(['Db', 'connections', 'Platform', 'indexes', 'Share'], false)) {
		return new Db.Expression((withoutDbName ? '' : '{$dbname}.')+'{$prefix}share');
	} else {
		var conn = Db.getConnection('Platform');
		var prefix = conn.prefix || '';
		var tableName = prefix + 'share';
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
	return 'Platform';
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
	q.className = 'Platform_Share';
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
	q.className = 'Platform_Share';
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
	q.className = 'Platform_Share';
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
	q.className = 'Platform_Share';
	return q;
};

/**
 * The name of the class
 * @property className
 * @type string
 */
Base.prototype.className = "Platform_Share";

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
		"share_id",
		"visit_id",
		"insertedTime",
		"shared_time",
		"url",
		"tag1",
		"tag2",
		"tag3",
		"publisherId",
		"visit_count",
		"session_count"
	];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_share_id
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_share_id = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".share_id");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".share_id");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the share_id field
	 * @return {integer}
	 */
Base.prototype.maxSize_share_id = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_visit_id
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_visit_id = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".visit_id");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".visit_id");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the visit_id field
	 * @return {integer}
	 */
Base.prototype.maxSize_visit_id = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_insertedTime
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_insertedTime = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".insertedTime");
		if (value < -9.2233720368548E+18 || value > 9223372036854775807)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".insertedTime");
		return value;
};

	/**
	 * Returns the maximum integer that can be assigned to the insertedTime field
	 * @return {integer}
	 */
Base.prototype.maxSize_insertedTime = function () {

		return 9223372036854775807;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_shared_time
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_shared_time = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".shared_time");
		if (value < -9.2233720368548E+18 || value > 9223372036854775807)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".shared_time");
		return value;
};

	/**
	 * Returns the maximum integer that can be assigned to the shared_time field
	 * @return {integer}
	 */
Base.prototype.maxSize_shared_time = function () {

		return 9223372036854775807;
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
 * @method beforeSet_tag1
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_tag1 = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".tag1");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".tag1");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the tag1 field
	 * @return {integer}
	 */
Base.prototype.maxSize_tag1 = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_tag2
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_tag2 = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".tag2");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".tag2");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the tag2 field
	 * @return {integer}
	 */
Base.prototype.maxSize_tag2 = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_tag3
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_tag3 = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a string to '+this.table()+".tag3");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".tag3");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the tag3 field
	 * @return {integer}
	 */
Base.prototype.maxSize_tag3 = function () {

		return 255;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_publisherId
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_publisherId = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".publisherId");
		if (value < 0 || value > 1.844674407371E+19)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".publisherId");
		return value;
};

	/**
	 * Returns the maximum integer that can be assigned to the publisherId field
	 * @return {integer}
	 */
Base.prototype.maxSize_publisherId = function () {

		return 1.844674407371E+19;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_visit_count
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_visit_count = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".visit_count");
		if (value < 0 || value > 4294967295)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".visit_count");
		return value;
};

	/**
	 * Returns the maximum integer that can be assigned to the visit_count field
	 * @return {integer}
	 */
Base.prototype.maxSize_visit_count = function () {

		return 4294967295;
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_session_count
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_session_count = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".session_count");
		if (value < 0 || value > 4294967295)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".session_count");
		return value;
};

	/**
	 * Returns the maximum integer that can be assigned to the session_count field
	 * @return {integer}
	 */
Base.prototype.maxSize_session_count = function () {

		return 4294967295;
};

module.exports = Base;