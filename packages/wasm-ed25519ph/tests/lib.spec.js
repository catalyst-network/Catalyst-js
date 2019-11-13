import {
    sign,
    sign_sig_and_public_key,
    verify,
    public_key_from_private,
} from '../pkg/index';
import { bytesFromHexString, bytesFromString } from './utils.js';

describe('the library can produce and validate signatures', function() {
    it('should produce a valid signature when signing a message', function() {
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const context1_length = context1.length;
        const signature = new Uint8Array(64);
        const result = sign(
            signature,
            private_key,
            message,
            context1,
            context1_length,
        );
        console.log('sucessful result should be 418: ', result);
    });

    it('should be able to validate a valid signature', function() {
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const public_key = public_key_from_private(private_key);
        const context1_length = context1.length;
        const signature = new Uint8Array(64);
        const signature_result = sign(
            signature,
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
        console.log('sucessful verification indicated by 418:', verified);
    });

    it('should not be able to validate an invalid signature', async function() {
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context2 = bytesFromString('different context');
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const public_key = await public_key_from_private(private_key);
        const context1_length = context1.length;
        const context2_length = context2.length;
        const signature = new Uint8Array(64);
        const signature_result = sign(
            signature,
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
        console.log(
            'verification should not succeed with error code 4:',
            verified,
        );
    });

    it('should not be able to validate an with the incorrect public key', function() {
        const public_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f',
        );
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context1_length = context1.length;
        const signature = new Uint8Array(64);
        const sign_result = sign(
            signature,
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
        console.log(
            'verification should not succeed with error code 2: ',
            verified,
        );
    });

    it('should not be able to validate an with the incorrect private key', function() {
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f',
        );
        const message = bytesFromString('hello');
        const context1 = bytesFromString('context');
        const context1_length = context1.length;
        const signature = new Uint8Array(64);
        const sign_result = sign(
            signature,
            private_key,
            message,
            context1,
            context1_length,
        );
        console.log(
            'signature should not succeed with error code 3: ',
            sign_result,
        );
    });

    it('should not be able to validate an with the incorrect context', function() {
        const message = bytesFromString('hello');
        const context1 = bytesFromString(
            'context context context context context context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context contextcontext context context context',
        );
        const private_key = bytesFromHexString(
            '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
        );
        const context1_length = context1.length;
        const signature = new Uint8Array(64);
        const result = sign(
            signature,
            private_key,
            message,
            context1,
            context1_length,
        );
        console.log('context length error should give 5: ', result);
    });

    it('should be able to pass a known test vector', function() {
        const signature = bytesFromHexString(
            '98a70222f0b8121aa9d30f813d683f809e462b469c7ff87639499bb94e6dae4131f85042463c2a355a2003d062adf5aaa10b8c61e636062aaad11c2a26083406',
        );
        const message = bytesFromHexString('616263');
        const public_key = bytesFromHexString(
            'ec172b93ad5e563bf4932c70e1245034c35467ef2efd4d64ebf819683467e2bf',
        );
        const context1 = bytesFromString('');
        const context1_length = context1.length;
        const verified = verify(
            signature,
            public_key,
            message,
            context1,
            context1_length,
        );
        console.log('test vector working indicated by 418: ', verified);
    });
});
