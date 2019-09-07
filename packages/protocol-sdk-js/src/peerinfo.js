/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.Catalyst.Protocol.Common.PeerInfo');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.Catalyst.Protocol.Common.PeerId');
goog.require('proto.google.protobuf.Duration');
goog.require('proto.google.protobuf.Timestamp');


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
proto.Catalyst.Protocol.Common.PeerInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Catalyst.Protocol.Common.PeerInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Catalyst.Protocol.Common.PeerInfo.displayName = 'proto.Catalyst.Protocol.Common.PeerInfo';
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
proto.Catalyst.Protocol.Common.PeerInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.Catalyst.Protocol.Common.PeerInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Catalyst.Protocol.Common.PeerInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Common.PeerInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    peerid: (f = msg.getPeerid()) && proto.Catalyst.Protocol.Common.PeerId.toObject(includeInstance, f),
    reputation: jspb.Message.getFieldWithDefault(msg, 2, 0),
    blacklisted: jspb.Message.getFieldWithDefault(msg, 3, false),
    isawolpeer: jspb.Message.getFieldWithDefault(msg, 4, false),
    inactivefor: (f = msg.getInactivefor()) && proto.google.protobuf.Duration.toObject(includeInstance, f),
    lastseen: (f = msg.getLastseen()) && proto.google.protobuf.Timestamp.toObject(includeInstance, f),
    modified: (f = msg.getModified()) && proto.google.protobuf.Timestamp.toObject(includeInstance, f),
    created: (f = msg.getCreated()) && proto.google.protobuf.Timestamp.toObject(includeInstance, f)
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
 * @return {!proto.Catalyst.Protocol.Common.PeerInfo}
 */
proto.Catalyst.Protocol.Common.PeerInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Catalyst.Protocol.Common.PeerInfo;
  return proto.Catalyst.Protocol.Common.PeerInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Catalyst.Protocol.Common.PeerInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Catalyst.Protocol.Common.PeerInfo}
 */
proto.Catalyst.Protocol.Common.PeerInfo.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readInt32());
      msg.setReputation(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBlacklisted(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsawolpeer(value);
      break;
    case 5:
      var value = new proto.google.protobuf.Duration;
      reader.readMessage(value,proto.google.protobuf.Duration.deserializeBinaryFromReader);
      msg.setInactivefor(value);
      break;
    case 6:
      var value = new proto.google.protobuf.Timestamp;
      reader.readMessage(value,proto.google.protobuf.Timestamp.deserializeBinaryFromReader);
      msg.setLastseen(value);
      break;
    case 7:
      var value = new proto.google.protobuf.Timestamp;
      reader.readMessage(value,proto.google.protobuf.Timestamp.deserializeBinaryFromReader);
      msg.setModified(value);
      break;
    case 8:
      var value = new proto.google.protobuf.Timestamp;
      reader.readMessage(value,proto.google.protobuf.Timestamp.deserializeBinaryFromReader);
      msg.setCreated(value);
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
proto.Catalyst.Protocol.Common.PeerInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Catalyst.Protocol.Common.PeerInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Catalyst.Protocol.Common.PeerInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Catalyst.Protocol.Common.PeerInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPeerid();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Catalyst.Protocol.Common.PeerId.serializeBinaryToWriter
    );
  }
  f = message.getReputation();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getBlacklisted();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIsawolpeer();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getInactivefor();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.google.protobuf.Duration.serializeBinaryToWriter
    );
  }
  f = message.getLastseen();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.google.protobuf.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getModified();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.google.protobuf.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getCreated();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.google.protobuf.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional PeerId peerId = 1;
 * @return {?proto.Catalyst.Protocol.Common.PeerId}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getPeerid = function() {
  return /** @type{?proto.Catalyst.Protocol.Common.PeerId} */ (
    jspb.Message.getWrapperField(this, proto.Catalyst.Protocol.Common.PeerId, 1));
};


/** @param {?proto.Catalyst.Protocol.Common.PeerId|undefined} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setPeerid = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.Catalyst.Protocol.Common.PeerInfo.prototype.clearPeerid = function() {
  this.setPeerid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.hasPeerid = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 reputation = 2;
 * @return {number}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getReputation = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setReputation = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bool blackListed = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getBlacklisted = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setBlacklisted = function(value) {
  jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool isAwolPeer = 4;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getIsawolpeer = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 4, false));
};


/** @param {boolean} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setIsawolpeer = function(value) {
  jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional google.protobuf.Duration inactiveFor = 5;
 * @return {?proto.google.protobuf.Duration}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getInactivefor = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.Duration, 5));
};


/** @param {?proto.google.protobuf.Duration|undefined} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setInactivefor = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.Catalyst.Protocol.Common.PeerInfo.prototype.clearInactivefor = function() {
  this.setInactivefor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.hasInactivefor = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.Timestamp lastSeen = 6;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getLastseen = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.Timestamp, 6));
};


/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setLastseen = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.Catalyst.Protocol.Common.PeerInfo.prototype.clearLastseen = function() {
  this.setLastseen(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.hasLastseen = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.Timestamp modified = 7;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getModified = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.Timestamp, 7));
};


/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setModified = function(value) {
  jspb.Message.setWrapperField(this, 7, value);
};


proto.Catalyst.Protocol.Common.PeerInfo.prototype.clearModified = function() {
  this.setModified(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.hasModified = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional google.protobuf.Timestamp created = 8;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.getCreated = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.Timestamp, 8));
};


/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.setCreated = function(value) {
  jspb.Message.setWrapperField(this, 8, value);
};


proto.Catalyst.Protocol.Common.PeerInfo.prototype.clearCreated = function() {
  this.setCreated(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Catalyst.Protocol.Common.PeerInfo.prototype.hasCreated = function() {
  return jspb.Message.getField(this, 8) != null;
};


