<?php

/**
 * Autogenerated base class representing stream rows
 * in the Streams database.
 *
 * Don't change this file, since it can be overwritten.
 * Instead, change the Streams_Stream.php file.
 *
 * @module Streams
 */
/**
 * Base class representing 'Stream' rows in the 'Streams' database
 * @class Base_Streams_Stream
 * @extends Db_Row
 *
 * @property string $publisherId
 * @property string $name
 * @property string|Db_Expression $insertedTime
 * @property string|Db_Expression $updatedTime
 * @property string $type
 * @property string $title
 * @property string $icon
 * @property string $content
 * @property string $attributes
 * @property integer $readLevel
 * @property integer $writeLevel
 * @property integer $adminLevel
 * @property string $inheritAccess
 * @property integer $messageCount
 * @property integer $participantCount
 * @property string|Db_Expression $closedTime
 */
abstract class Base_Streams_Stream extends Db_Row
{
	/**
	 * @property $publisherId
	 * @type string
	 */
	/**
	 * @property $name
	 * @type string
	 */
	/**
	 * @property $insertedTime
	 * @type string|Db_Expression
	 */
	/**
	 * @property $updatedTime
	 * @type string|Db_Expression
	 */
	/**
	 * @property $type
	 * @type string
	 */
	/**
	 * @property $title
	 * @type string
	 */
	/**
	 * @property $icon
	 * @type string
	 */
	/**
	 * @property $content
	 * @type string
	 */
	/**
	 * @property $attributes
	 * @type string
	 */
	/**
	 * @property $readLevel
	 * @type integer
	 */
	/**
	 * @property $writeLevel
	 * @type integer
	 */
	/**
	 * @property $adminLevel
	 * @type integer
	 */
	/**
	 * @property $inheritAccess
	 * @type string
	 */
	/**
	 * @property $messageCount
	 * @type integer
	 */
	/**
	 * @property $participantCount
	 * @type integer
	 */
	/**
	 * @property $closedTime
	 * @type string|Db_Expression
	 */
	/**
	 * The setUp() method is called the first time
	 * an object of this class is constructed.
	 * @method setUp
	 */
	function setUp()
	{
		$this->setDb(self::db());
		$this->setTable(self::table());
		$this->setPrimaryKey(
			array (
			  0 => 'publisherId',
			  1 => 'name',
			)
		);
	}

	/**
	 * Connects to database
	 * @method db
	 * @static
	 * @return {iDb} The database object
	 */
	static function db()
	{
		return Db::connect('Streams');
	}

	/**
	 * Retrieve the table name to use in SQL statement
	 * @method table
	 * @static
	 * @param {boolean} [$with_db_name=true] Indicates wheather table name should contain the database name
 	 * @return {string|Db_Expression} The table name as string optionally without database name if no table sharding
	 * was started or Db_Expression class with prefix and database name templates is table was sharded
	 */
	static function table($with_db_name = true)
	{
		if (Q_Config::get('Db', 'connections', 'Streams', 'indexes', 'Stream', false)) {
			return new Db_Expression(($with_db_name ? '{$dbname}.' : '').'{$prefix}'.'stream');
		} else {
			$conn = Db::getConnection('Streams');
  			$prefix = empty($conn['prefix']) ? '' : $conn['prefix'];
  			$table_name = $prefix . 'stream';
  			if (!$with_db_name)
  				return $table_name;
  			$db = Db::connect('Streams');
  			return $db->dbName().'.'.$table_name;
		}
	}
	/**
	 * The connection name for the class
	 * @method connectionName
	 * @static
	 * @return {string} The name of the connection
	 */
	static function connectionName()
	{
		return 'Streams';
	}

	/**
	 * Create SELECT query to the class table
	 * @method select
	 * @static
	 * @param {array} $fields The field values to use in WHERE clauseas as 
	 * an associative array of `column => value` pairs
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function select($fields, $alias = null)
	{
		if (!isset($alias)) $alias = '';
		$q = self::db()->select($fields, self::table().' '.$alias);
		$q->className = 'Streams_Stream';
		return $q;
	}

	/**
	 * Create UPDATE query to the class table
	 * @method update
	 * @static
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function update($alias = null)
	{
		if (!isset($alias)) $alias = '';
		$q = self::db()->update(self::table().' '.$alias);
		$q->className = 'Streams_Stream';
		return $q;
	}

	/**
	 * Create DELETE query to the class table
	 * @method delete
	 * @static
	 * @param {object} [$table_using=null] If set, adds a USING clause with this table
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function delete($table_using = null, $alias = null)
	{
		if (!isset($alias)) $alias = '';
		$q = self::db()->delete(self::table().' '.$alias, $table_using);
		$q->className = 'Streams_Stream';
		return $q;
	}

	/**
	 * Create INSERT query to the class table
	 * @method insert
	 * @static
	 * @param {object} [$fields=array()] The fields as an associative array of `column => value` pairs
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function insert($fields = array(), $alias = null)
	{
		if (!isset($alias)) $alias = '';
		$q = self::db()->insert(self::table().' '.$alias, $fields);
		$q->className = 'Streams_Stream';
		return $q;
	}
	/**
	 * Inserts multiple records into a single table, preparing the statement only once,
	 * and executes all the queries.
	 * @method insertManyAndExecute
	 * @static
	 * @param {array} [$records=array()] The array of records to insert. 
	 * (The field names for the prepared statement are taken from the first record.)
	 * You cannot use Db_Expression objects here, because the function binds all parameters with PDO.
	 * @param {array} [$options=array()]
	 *   An associative array of options, including:
	 *
	 * * "chunkSize" {integer} The number of rows to insert at a time. defaults to 20.<br/>
	 * * "onDuplicateKeyUpdate" {array} You can put an array of fieldname => value pairs here,
	 * 		which will add an ON DUPLICATE KEY UPDATE clause to the query.
	 *
	 */
	static function insertManyAndExecute($records = array(), $options = array())
	{
		self::db()->insertManyAndExecute(
			self::table(), $records,
			array_merge($options, array('className' => 'Streams_Stream'))
		);
	}
	
	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_publisherId
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_publisherId($value)
	{
		if ($value instanceof Db_Expression) {
			return array('publisherId', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".publisherId");
		if (strlen($value) > 31)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".publisherId");
		return array('publisherId', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the publisherId field
	 * @return {integer}
	 */
	function maxSize_publisherId()
	{

		return 31;			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_name
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_name($value)
	{
		if ($value instanceof Db_Expression) {
			return array('name', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".name");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".name");
		return array('name', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the name field
	 * @return {integer}
	 */
	function maxSize_name()
	{

		return 255;			
	}

	/**
	 * Method is called before setting the field and normalize the DateTime string
	 * @method beforeSet_insertedTime
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not represent valid DateTime
	 */
	function beforeSet_insertedTime($value)
	{
		if ($value instanceof Db_Expression) {
			return array('insertedTime', $value);
		}
		$date = date_parse($value);
		if (!empty($date['errors'])) {
			throw new Exception("DateTime $value in incorrect format being assigned to ".$this->getTable().".insertedTime");
		}
		foreach (array('year', 'month', 'day', 'hour', 'minute', 'second') as $v) {
			$$v = $date[$v];
		}
		$value = sprintf("%04d-%02d-%02d %02d:%02d:%02d", $year, $month, $day, $hour, $minute, $second);
		return array('insertedTime', $value);			
	}

	/**
	 * Method is called before setting the field and normalize the DateTime string
	 * @method beforeSet_updatedTime
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not represent valid DateTime
	 */
	function beforeSet_updatedTime($value)
	{
		if (!isset($value)) {
			return array('updatedTime', $value);
		}
		if ($value instanceof Db_Expression) {
			return array('updatedTime', $value);
		}
		$date = date_parse($value);
		if (!empty($date['errors'])) {
			throw new Exception("DateTime $value in incorrect format being assigned to ".$this->getTable().".updatedTime");
		}
		foreach (array('year', 'month', 'day', 'hour', 'minute', 'second') as $v) {
			$$v = $date[$v];
		}
		$value = sprintf("%04d-%02d-%02d %02d:%02d:%02d", $year, $month, $day, $hour, $minute, $second);
		return array('updatedTime', $value);			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_type
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_type($value)
	{
		if ($value instanceof Db_Expression) {
			return array('type', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".type");
		if (strlen($value) > 63)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".type");
		return array('type', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the type field
	 * @return {integer}
	 */
	function maxSize_type()
	{

		return 63;			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_title
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_title($value)
	{
		if ($value instanceof Db_Expression) {
			return array('title', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".title");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".title");
		return array('title', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the title field
	 * @return {integer}
	 */
	function maxSize_title()
	{

		return 255;			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_icon
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_icon($value)
	{
		if ($value instanceof Db_Expression) {
			return array('icon', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".icon");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".icon");
		return array('icon', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the icon field
	 * @return {integer}
	 */
	function maxSize_icon()
	{

		return 255;			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_content
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_content($value)
	{
		if ($value instanceof Db_Expression) {
			return array('content', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".content");
		if (strlen($value) > 1023)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".content");
		return array('content', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the content field
	 * @return {integer}
	 */
	function maxSize_content()
	{

		return 1023;			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_attributes
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_attributes($value)
	{
		if (!isset($value)) {
			return array('attributes', $value);
		}
		if ($value instanceof Db_Expression) {
			return array('attributes', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".attributes");
		if (strlen($value) > 1023)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".attributes");
		return array('attributes', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the attributes field
	 * @return {integer}
	 */
	function maxSize_attributes()
	{

		return 1023;			
	}

	/**
	 * Method is called before setting the field and verifies if integer value falls within allowed limits
	 * @method beforeSet_readLevel
	 * @param {integer} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not integer or does not fit in allowed range
	 */
	function beforeSet_readLevel($value)
	{
		if ($value instanceof Db_Expression) {
			return array('readLevel', $value);
		}
		if (!is_numeric($value) or floor($value) != $value)
			throw new Exception('Non-integer value being assigned to '.$this->getTable().".readLevel");
		if ($value < -2147483648 or $value > 2147483647)
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".readLevel");
		return array('readLevel', $value);			
	}

	/**
	 * Returns the maximum integer that can be assigned to the readLevel field
	 * @return {integer}
	 */
	function maxSize_readLevel()
	{

		return 2147483647;			
	}

	/**
	 * Method is called before setting the field and verifies if integer value falls within allowed limits
	 * @method beforeSet_writeLevel
	 * @param {integer} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not integer or does not fit in allowed range
	 */
	function beforeSet_writeLevel($value)
	{
		if ($value instanceof Db_Expression) {
			return array('writeLevel', $value);
		}
		if (!is_numeric($value) or floor($value) != $value)
			throw new Exception('Non-integer value being assigned to '.$this->getTable().".writeLevel");
		if ($value < -2147483648 or $value > 2147483647)
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".writeLevel");
		return array('writeLevel', $value);			
	}

	/**
	 * Returns the maximum integer that can be assigned to the writeLevel field
	 * @return {integer}
	 */
	function maxSize_writeLevel()
	{

		return 2147483647;			
	}

	/**
	 * Method is called before setting the field and verifies if integer value falls within allowed limits
	 * @method beforeSet_adminLevel
	 * @param {integer} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not integer or does not fit in allowed range
	 */
	function beforeSet_adminLevel($value)
	{
		if ($value instanceof Db_Expression) {
			return array('adminLevel', $value);
		}
		if (!is_numeric($value) or floor($value) != $value)
			throw new Exception('Non-integer value being assigned to '.$this->getTable().".adminLevel");
		if ($value < -2147483648 or $value > 2147483647)
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".adminLevel");
		return array('adminLevel', $value);			
	}

	/**
	 * Returns the maximum integer that can be assigned to the adminLevel field
	 * @return {integer}
	 */
	function maxSize_adminLevel()
	{

		return 2147483647;			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_inheritAccess
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_inheritAccess($value)
	{
		if (!isset($value)) {
			return array('inheritAccess', $value);
		}
		if ($value instanceof Db_Expression) {
			return array('inheritAccess', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".inheritAccess");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".inheritAccess");
		return array('inheritAccess', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the inheritAccess field
	 * @return {integer}
	 */
	function maxSize_inheritAccess()
	{

		return 255;			
	}

	/**
	 * Method is called before setting the field and verifies if integer value falls within allowed limits
	 * @method beforeSet_messageCount
	 * @param {integer} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not integer or does not fit in allowed range
	 */
	function beforeSet_messageCount($value)
	{
		if ($value instanceof Db_Expression) {
			return array('messageCount', $value);
		}
		if (!is_numeric($value) or floor($value) != $value)
			throw new Exception('Non-integer value being assigned to '.$this->getTable().".messageCount");
		if ($value < -2147483648 or $value > 2147483647)
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".messageCount");
		return array('messageCount', $value);			
	}

	/**
	 * Returns the maximum integer that can be assigned to the messageCount field
	 * @return {integer}
	 */
	function maxSize_messageCount()
	{

		return 2147483647;			
	}

	/**
	 * Method is called before setting the field and verifies if integer value falls within allowed limits
	 * @method beforeSet_participantCount
	 * @param {integer} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not integer or does not fit in allowed range
	 */
	function beforeSet_participantCount($value)
	{
		if ($value instanceof Db_Expression) {
			return array('participantCount', $value);
		}
		if (!is_numeric($value) or floor($value) != $value)
			throw new Exception('Non-integer value being assigned to '.$this->getTable().".participantCount");
		if ($value < -2147483648 or $value > 2147483647)
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".participantCount");
		return array('participantCount', $value);			
	}

	/**
	 * Returns the maximum integer that can be assigned to the participantCount field
	 * @return {integer}
	 */
	function maxSize_participantCount()
	{

		return 2147483647;			
	}

	/**
	 * Method is called before setting the field and normalize the DateTime string
	 * @method beforeSet_closedTime
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not represent valid DateTime
	 */
	function beforeSet_closedTime($value)
	{
		if (!isset($value)) {
			return array('closedTime', $value);
		}
		if ($value instanceof Db_Expression) {
			return array('closedTime', $value);
		}
		$date = date_parse($value);
		if (!empty($date['errors'])) {
			throw new Exception("DateTime $value in incorrect format being assigned to ".$this->getTable().".closedTime");
		}
		foreach (array('year', 'month', 'day', 'hour', 'minute', 'second') as $v) {
			$$v = $date[$v];
		}
		$value = sprintf("%04d-%02d-%02d %02d:%02d:%02d", $year, $month, $day, $hour, $minute, $second);
		return array('closedTime', $value);			
	}

	/**
	 * Check if mandatory fields are set and updates 'magic fields' with appropriate values
	 * @method beforeSave
	 * @param {array} $value The array of fields
	 * @return {array}
	 * @throws {Exception} If mandatory field is not set
	 */
	function beforeSave($value)
	{
		if (!$this->retrieved) {
			$table = $this->getTable();
			foreach (array('name') as $name) {
				if (!isset($value[$name])) {
					throw new Exception("the field $table.$name needs a value, because it is NOT NULL, not auto_increment, and lacks a default value.");
				}
			}
		}						
		// convention: we'll have updatedTime = insertedTime if just created.
		$this->updatedTime = $value['updatedTime'] = new Db_Expression('CURRENT_TIMESTAMP');
		return $value;			
	}

	/**
	 * Retrieves field names for class table
	 * @method fieldNames
	 * @static
	 * @param {string} [$table_alias=null] If set, the alieas is added to each field
	 * @param {string} [$field_alias_prefix=null] If set, the method returns associative array of `'prefixed field' => 'field'` pairs
	 * @return {array} An array of field names
	 */
	static function fieldNames($table_alias = null, $field_alias_prefix = null)
	{
		$field_names = array('publisherId', 'name', 'insertedTime', 'updatedTime', 'type', 'title', 'icon', 'content', 'attributes', 'readLevel', 'writeLevel', 'adminLevel', 'inheritAccess', 'messageCount', 'participantCount', 'closedTime');
		$result = $field_names;
		if (!empty($table_alias)) {
			$temp = array();
			foreach ($result as $field_name)
				$temp[] = $table_alias . '.' . $field_name;
			$result = $temp;
		} 
		if (!empty($field_alias_prefix)) {
			$temp = array();
			reset($field_names);
			foreach ($result as $field_name) {
				$temp[$field_alias_prefix . current($field_names)] = $field_name;
				next($field_names);
			}
			$result = $temp;
		}
		return $result;			
	}
};