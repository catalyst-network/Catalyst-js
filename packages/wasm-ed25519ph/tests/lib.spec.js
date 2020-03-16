import {
    sign,
    generate_private_key,
    verify,
    verify_batch,
} from '../pkg/index';
import { bytesFromHexString, bytesFromString } from './utils.js';
import * as protos from '@catalystnetwork/protocol-sdk';
var assert = require('assert');

// set up the crypto property globally
var nodeCrypto = require('crypto');
global.crypto = {
    getRandomValues: function(buffer) { return nodeCrypto.randomFillSync(buffer);}
};

describe('the library can produce and validate signatures', function() {
    
    it('should be able to generate a random private key', function() {
        const private_key = new Uint8Array(32);
        var result = generate_private_key(private_key);
        assert(result==protos.ErrorCode.NO_ERROR, "failed to generate random key");
    });

    it('should produce a valid signature when signing a message', function() {
        const signature = new Uint8Array(64);
        const public_key = new Uint8Array(32);
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const context1_length = context1.length;
        
        const result = sign(
            signature,
            public_key,
            private_key,
            message,
            context1,
            context1_length,
        );
        assert(result==protos.ErrorCode.NO_ERROR, "failed to create a signature");
    });

    it('should be able to validate a valid signature', function() {
        const signature = new Uint8Array(64);
        const public_key = new Uint8Array(32);
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context1_length = context1.length;
        
        const signature_result = sign(
            signature,
            public_key,
            private_key,
            message,
            context1,
            context1_length,
        );
        
        const verified = verify(
            signature,
            public_key,
            message,
            context1,
            context1_length,
        );
        assert(verified==protos.ErrorCode.NO_ERROR, "failed to validate a signature");
    });

    it('should not be able to validate an invalid signature', async function() {
        const signature = new Uint8Array(64);
        const public_key = new Uint8Array(32);
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context2 = bytesFromString('different context');
        const context1_length = context1.length;
        const context2_length = context2.length;
        const signature_result = sign(
            signature,
            public_key,
            private_key,
            message,
            context1,
            context1_length,
        );
        const verified = verify(
            signature,
            public_key,
            message,
            context2,
            context2_length,
        );
        assert(verified==protos.ErrorCode.SIGNATURE_VERIFICATION_FAILURE, "validated an incorrect signature");
    });

    it('should not be able to validate with the incorrect public key', function() {
        const signature = new Uint8Array(64);
        var public_key = new Uint8Array(32);
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context1_length = context1.length;
        const sign_result = sign(
            signature,
            public_key,
            private_key,
            message,
            context1,
            context1_length,
        );
        public_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f',
        );
        const verified = verify(
            signature,
            public_key,
            message,
            context1,
            context1_length,
        );
        assert(verified==protos.ErrorCode.INVALID_PUBLIC_KEY, "validation succeeded using an invalid public key");
    });

    it('should not be able to validate with the incorrect private key', function() {
        const signature = new Uint8Array(64);
        const public_key = new Uint8Array(32);
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f',
        );
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context1_length = context1.length;

        const result = sign(
            signature,
            public_key,
            private_key,
            message,
            context1,
            context1_length,
        );
        assert(result==3, "validation succeeded using an invalid private key");
    });

    it('should not be able to validate with the incorrect context', function() {
        const signature = new Uint8Array(64);
        const public_key = new Uint8Array(32);
        const message = bytesFromString('hello');
        const context1 = bytesFromString(
            'context context context context context context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context context',
        );
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const context1_length = context1.length;
        const result = sign(
            signature,
            public_key,
            private_key,
            message,
            context1,
            context1_length,
        );
        assert(result==protos.ErrorCode.INVALID_CONTEXT_LENGTH, "validation succeeded using an invalid context length");
    });

    it('should be able to pass a known test vector', function() {
        const signature = bytesFromHexString(
            '98a70222f0b8121aa9d30f813d683f809e462b469c7ff87639499bb94e6dae4131f85042463c2a355a2003d062adf5aaa10b8c61e636062aaad11c2a26083406',
        );
        const public_key = bytesFromHexString(
            'ec172b93ad5e563bf4932c70e1245034c35467ef2efd4d64ebf819683467e2bf',
        );
        const message = bytesFromHexString('616263');
        
        const context1 = bytesFromString('');
        const context1_length = context1.length;
        const verified = verify(
            signature,
            public_key,
            message,
            context1,
            context1_length,
        );
        assert(verified==protos.ErrorCode.NO_ERROR, "failed to validate using a known test vector");
    });
    
});

describe('the library can batch verify signatures', function() {
    it('batch_verify_validates_multiple_correct_signatures', function() {
        var signature = new Uint8Array(64);
        var public_key = new Uint8Array(32);
        var private_key = new Uint8Array(32);
        
        var messages = [bytesFromString('Twas brillig, and the slithy toves'), 
                        bytesFromString('Did gyre and gimble in the wabe:'), 
                        bytesFromString('All mimsy were the borogoves,'),
                        bytesFromString('And the mome raths outgrabe.'),
                        bytesFromString('Beware the Jabberwock, my son!'),
                    ];
        const context = bytesFromString("context");

        const batch = new protos.SignatureBatch();
        var pks = [];
        var sigs = [];

        for (let i = 0; i < messages.length; i++) {
            generate_private_key(private_key);
            sign(
                signature,
                public_key,
                private_key,
                messages[i],
                context,
                context.length,
            );
            pks.push(new Uint8Array(public_key));
            sigs.push(new Uint8Array(signature));
        }

        batch.setContext(context);
        batch.setMessagesList(messages);
        batch.setPublicKeysList(pks);
        batch.setSignaturesList(sigs);
        
        const verified = verify_batch(batch.serializeBinary());

        assert(verified==protos.ErrorCode.NO_ERROR, "failed to batch verify");
    });
    
    it('batch verify validates single correct signature', function() {
        const signature = bytesFromHexString(
            '98a70222f0b8121aa9d30f813d683f809e462b469c7ff87639499bb94e6dae4131f85042463c2a355a2003d062adf5aaa10b8c61e636062aaad11c2a26083406',
        );
        const public_key = bytesFromHexString(
            'ec172b93ad5e563bf4932c70e1245034c35467ef2efd4d64ebf819683467e2bf',
        );
        const message = bytesFromHexString('616263');
        
        const context1 = bytesFromString('');
        
        const batch = new protos.SignatureBatch();      
        batch.addMessages(message);
        batch.addPublicKeys(public_key);
        batch.addSignatures(signature);
        batch.setContext(context1);

        const verified = verify_batch(batch.serializeBinary());
        assert(verified==protos.ErrorCode.NO_ERROR, "failed to batch verify");
    });
    
    it('batch verify fails on single incorrect message', function() {
        var signature = new Uint8Array(64);
        var public_key = new Uint8Array(32);
        var private_key = new Uint8Array(32);
        
        var messages = [bytesFromString('Twas brillig, and the slithy toves'), 
                        bytesFromString('Did gyre and gimble in the wabe:'), 
                        bytesFromString('All mimsy were the borogoves,'),
                        bytesFromString('And the mome raths outgrabe.'),
                        bytesFromString('Beware the Jabberwock, my son!'),
                    ];
        const context = bytesFromString("context");

        const batch = new protos.SignatureBatch();
        var pks = [];
        var sigs = [];

        for (let i = 0; i < messages.length; i++) {
            generate_private_key(private_key);
            sign(
                signature,
                public_key,
                private_key,
                messages[i],
                context,
                context.length,
            );
            pks.push(new Uint8Array(public_key));
            sigs.push(new Uint8Array(signature));
        }
        messages[messages.length - 1] = bytesFromString('changing a single message');
        
        batch.setContext(context);
        batch.setMessagesList(messages);
        batch.setPublicKeysList(pks);
        batch.setSignaturesList(sigs);
        
        const verified = verify_batch(batch.serializeBinary());

        assert(verified==protos.ErrorCode.BATCH_VERIFICATION_FAILURE, "batch verification should have failed");
    });

    it('batch verify fails on single incorrect public key', function() {
        var signature = new Uint8Array(64);
        var public_key = new Uint8Array(32);
        var private_key = new Uint8Array(32);
        
        var messages = [bytesFromString('Twas brillig, and the slithy toves'), 
                        bytesFromString('Did gyre and gimble in the wabe:'), 
                        bytesFromString('All mimsy were the borogoves,'),
                        bytesFromString('And the mome raths outgrabe.'),
                        bytesFromString('Beware the Jabberwock, my son!'),
                    ];
        const context = bytesFromString("context");

        const batch = new protos.SignatureBatch();
        var pks = [];
        var sigs = [];

        for (let i = 0; i < messages.length; i++) {
            generate_private_key(private_key);
            sign(
                signature,
                public_key,
                private_key,
                messages[i],
                context,
                context.length,
            );
            pks.push(new Uint8Array(public_key));
            sigs.push(new Uint8Array(signature));
        }
        pks[pks.length - 1] = new Uint8Array(pks[pks.length - 2]);

        batch.setContext(context);
        batch.setMessagesList(messages);
        batch.setPublicKeysList(pks);
        batch.setSignaturesList(sigs);
        
        const verified = verify_batch(batch.serializeBinary());

        assert(verified==protos.ErrorCode.BATCH_VERIFICATION_FAILURE, "failed to batch verify");
    });

    it('batch verify fails on single incorrect signature', function() {
        var signature = new Uint8Array(64);
        var public_key = new Uint8Array(32);
        var private_key = new Uint8Array(32);
        
        var messages = [bytesFromString('Twas brillig, and the slithy toves'), 
                        bytesFromString('Did gyre and gimble in the wabe:'), 
                        bytesFromString('All mimsy were the borogoves,'),
                        bytesFromString('And the mome raths outgrabe.'),
                        bytesFromString('Beware the Jabberwock, my son!'),
                    ];
        const context = bytesFromString("context");

        const batch = new protos.SignatureBatch();
        var pks = [];
        var sigs = [];

        for (let i = 0; i < messages.length; i++) {
            generate_private_key(private_key);
            sign(
                signature,
                public_key,
                private_key,
                messages[i],
                context,
                context.length,
            );
            pks.push(new Uint8Array(public_key));
            sigs.push(new Uint8Array(signature));
        }
        sigs[sigs.length - 1] = new Uint8Array(sigs[sigs.length - 2]);

        batch.setContext(context);
        batch.setMessagesList(messages);
        batch.setPublicKeysList(pks);
        batch.setSignaturesList(sigs);
        
        const verified = verify_batch(batch.serializeBinary());

        assert(verified==protos.ErrorCode.BATCH_VERIFICATION_FAILURE, "failed to batch verify");
    });

    it('batch verify fails on incorrect context', function() {
        var signature = new Uint8Array(64);
        var public_key = new Uint8Array(32);
        var private_key = new Uint8Array(32);
        
        var messages = [bytesFromString('Twas brillig, and the slithy toves'), 
                        bytesFromString('Did gyre and gimble in the wabe:'), 
                        bytesFromString('All mimsy were the borogoves,'),
                        bytesFromString('And the mome raths outgrabe.'),
                        bytesFromString('Beware the Jabberwock, my son!'),
                    ];
        const context = bytesFromString("context");

        const batch = new protos.SignatureBatch();
        var pks = [];
        var sigs = [];

        for (let i = 0; i < messages.length; i++) {
            generate_private_key(private_key);
            sign(
                signature,
                public_key,
                private_key,
                messages[i],
                context,
                context.length,
            );
            pks.push(new Uint8Array(public_key));
            sigs.push(new Uint8Array(signature));
        }
        

        batch.setContext(bytesFromString("a change of context"));
        batch.setMessagesList(messages);
        batch.setPublicKeysList(pks);
        batch.setSignaturesList(sigs);
        
        const verified = verify_batch(batch.serializeBinary());

        assert(verified==protos.ErrorCode.BATCH_VERIFICATION_FAILURE, "failed to batch verify");
    });
});
