/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.Catalyst.Protocol.Common.ProtocolMessage');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.Catalyst.Protocol.Common.PeerId');


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
proto.Catalyst.Protocol.Common.ProtocolMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Catalyst.Protocol.Common.ProtocolMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Catalyst.Protocol.Common.ProtocolMessage.displayName = 'proto.Catalyst.Protocol.Common.ProtocolMessage';
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
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.Catalyst.Protocol.Common.ProtocolMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Catalyst.Protocol.Common.ProtocolMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    peerid: (f = msg.getPeerid()) && proto.Catalyst.Protocol.Common.PeerId.toObject(includeInstance, f),
    correlationid: msg.getCorrelationid_asB64(),
    typeUrl: jspb.Message.getFieldWithDefault(msg, 3, ""),
    value: msg.getValue_asB64()
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
 * @return {!proto.Catalyst.Protocol.Common.ProtocolMessage}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Catalyst.Protocol.Common.ProtocolMessage;
  return proto.Catalyst.Protocol.Common.ProtocolMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Catalyst.Protocol.Common.ProtocolMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Catalyst.Protocol.Common.ProtocolMessage}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Catalyst.Protocol.Common.PeerId;
      reader.readMessage(value,proto.Catalyst.Protocol.Common.PeerId.deserializeBinaryFromReader);
      msg.setPeerid(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCorrelationid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTypeUrl(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setValue(value);
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
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Catalyst.Protocol.Common.ProtocolMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Catalyst.Protocol.Common.ProtocolMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPeerid();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Catalyst.Protocol.Common.PeerId.serializeBinaryToWriter
    );
  }
  f = message.getCorrelationid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getTypeUrl();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getValue_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * optional PeerId peerId = 1;
 * @return {?proto.Catalyst.Protocol.Common.PeerId}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getPeerid = function() {
  return /** @type{?proto.Catalyst.Protocol.Common.PeerId} */ (
    jspb.Message.getWrapperField(this, proto.Catalyst.Protocol.Common.PeerId, 1));
};


/** @param {?proto.Catalyst.Protocol.Common.PeerId|undefined} value */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.setPeerid = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.clearPeerid = function() {
  this.setPeerid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.hasPeerid = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes correlationId = 2;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getCorrelationid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes correlationId = 2;
 * This is a type-conversion wrapper around `getCorrelationid()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getCorrelationid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCorrelationid()));
};


/**
 * optional bytes correlationId = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCorrelationid()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getCorrelationid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCorrelationid()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.setCorrelationid = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional string type_url = 3;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getTypeUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.setTypeUrl = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bytes value = 4;
 * @return {string}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes value = 4;
 * This is a type-conversion wrapper around `getValue()`
 * @return {string}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getValue()));
};


/**
 * optional bytes value = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getValue()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.getValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getValue()));
};


/** @param {!(string|Uint8Array)} value */
proto.Catalyst.Protocol.Common.ProtocolMessage.prototype.setValue = function(value) {
  jspb.Message.setProto3BytesField(this, 4, value);
};

