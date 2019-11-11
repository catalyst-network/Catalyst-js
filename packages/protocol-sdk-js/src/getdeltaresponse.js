// source: Rpc.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.Catalyst.Protocol.Deltas.Delta');

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
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.displayName = 'proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse';
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
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    delta: (f = msg.getDelta()) && proto.Catalyst.Protocol.Deltas.Delta.toObject(includeInstance, f)
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
 * @return {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse}
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse;
  return proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse}
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Catalyst.Protocol.Deltas.Delta;
      reader.readMessage(value,proto.Catalyst.Protocol.Deltas.Delta.deserializeBinaryFromReader);
      msg.setDelta(value);
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
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDelta();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Catalyst.Protocol.Deltas.Delta.serializeBinaryToWriter
    );
  }
};


/**
 * optional Catalyst.Protocol.Deltas.Delta delta = 1;
 * @return {?proto.Catalyst.Protocol.Deltas.Delta}
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.prototype.getDelta = function() {
  return /** @type{?proto.Catalyst.Protocol.Deltas.Delta} */ (
    jspb.Message.getWrapperField(this, proto.Catalyst.Protocol.Deltas.Delta, 1));
};


/**
 * @param {?proto.Catalyst.Protocol.Deltas.Delta|undefined} value
 * @return {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse} returns this
*/
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.prototype.setDelta = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse} returns this
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.prototype.clearDelta = function() {
  return this.setDelta(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Catalyst.Protocol.Rpc.Node.GetDeltaResponse.prototype.hasDelta = function() {
  return jspb.Message.getField(this, 1) != null;
};


