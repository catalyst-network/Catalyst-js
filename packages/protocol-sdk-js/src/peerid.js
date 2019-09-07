/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.Catalyst.Protocol.Common.PeerId');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Catalyst.Protocol.Common.PeerId = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Catalyst.Protocol.Common.PeerId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Catalyst.Protocol.Common.PeerId.displayName = 'proto.Catalyst.Protocol.Common.PeerId';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.toObject = function(opt_includeInstance) {
  return proto.Catalyst.Protocol.Common.PeerId.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Catalyst.Protocol.Common.PeerId} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Common.PeerId.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientid: msg.getClientid_asB64(),
    protocolversion: msg.getProtocolversion_asB64(),
    ip: msg.getIp_asB64(),
    port: msg.getPort_asB64(),
    publickey: msg.getPublickey_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Catalyst.Protocol.Common.PeerId}
 */
proto.Catalyst.Protocol.Common.PeerId.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Catalyst.Protocol.Common.PeerId;
  return proto.Catalyst.Protocol.Common.PeerId.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Catalyst.Protocol.Common.PeerId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Catalyst.Protocol.Common.PeerId}
 */
proto.Catalyst.Protocol.Common.PeerId.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setClientid(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setProtocolversion(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setIp(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPort(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPublickey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Catalyst.Protocol.Common.PeerId.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Catalyst.Protocol.Common.PeerId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Common.PeerId.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getClientid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getProtocolversion_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getIp_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getPort_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getPublickey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
};


/**
 * optional bytes clientId = 1;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getClientid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes clientId = 1;
 * This is a type-conversion wrapper around `getClientid()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getClientid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getClientid()));
};


/**
 * optional bytes clientId = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getClientid()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getClientid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getClientid()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.PeerId.prototype.setClientid = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes protocolVersion = 2;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getProtocolversion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes protocolVersion = 2;
 * This is a type-conversion wrapper around `getProtocolversion()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getProtocolversion_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getProtocolversion()));
};


/**
 * optional bytes protocolVersion = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getProtocolversion()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getProtocolversion_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getProtocolversion()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.PeerId.prototype.setProtocolversion = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes ip = 3;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getIp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes ip = 3;
 * This is a type-conversion wrapper around `getIp()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getIp_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getIp()));
};


/**
 * optional bytes ip = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getIp()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getIp_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getIp()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.PeerId.prototype.setIp = function(value) {
  jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes port = 4;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getPort = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes port = 4;
 * This is a type-conversion wrapper around `getPort()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getPort_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPort()));
};


/**
 * optional bytes port = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPort()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getPort_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPort()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.PeerId.prototype.setPort = function(value) {
  jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional bytes publicKey = 5;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getPublickey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes publicKey = 5;
 * This is a type-conversion wrapper around `getPublickey()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getPublickey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPublickey()));
};


/**
 * optional bytes publicKey = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPublickey()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.PeerId.prototype.getPublickey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPublickey()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.PeerId.prototype.setPublickey = function(value) {
  jspb.Message.setProto3BytesField(this, 5, value);
};

