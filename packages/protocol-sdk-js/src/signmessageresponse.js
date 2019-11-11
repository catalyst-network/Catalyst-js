// source: Rpc.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse');

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
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.displayName = 'proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    signature: msg.getSignature_asB64(),
    publicKey: msg.getPublicKey_asB64(),
    originalMessage: msg.getOriginalMessage_asB64()
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
 * @return {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse;
  return proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignature(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPublicKey(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOriginalMessage(value);
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
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getPublicKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getOriginalMessage_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional bytes signature = 1;
 * @return {string}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getSignature = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes signature = 1;
 * This is a type-conversion wrapper around `getSignature()`
 * @return {string}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignature()));
};


/**
 * optional bytes signature = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignature()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignature()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse} returns this
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.setSignature = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes public_key = 2;
 * @return {string}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getPublicKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes public_key = 2;
 * This is a type-conversion wrapper around `getPublicKey()`
 * @return {string}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getPublicKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPublicKey()));
};


/**
 * optional bytes public_key = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPublicKey()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getPublicKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPublicKey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse} returns this
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.setPublicKey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes original_message = 3;
 * @return {string}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getOriginalMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes original_message = 3;
 * This is a type-conversion wrapper around `getOriginalMessage()`
 * @return {string}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getOriginalMessage_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOriginalMessage()));
};


/**
 * optional bytes original_message = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOriginalMessage()`
 * @return {!Uint8Array}
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.getOriginalMessage_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOriginalMessage()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse} returns this
 */
proto.Catalyst.Protocol.Rpc.Node.SignMessageResponse.prototype.setOriginalMessage = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


