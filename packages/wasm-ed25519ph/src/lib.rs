extern crate catalyst_protocol_sdk_rust;
extern crate console_error_panic_hook;
extern crate web_sys;

use catalyst_protocol_sdk_rust::prelude::*;
use catalyst_protocol_sdk_rust::Cryptography::ErrorCode;

use ed25519_dalek::{Digest, Sha512};
use ed25519_dalek::{Keypair, PublicKey, SecretKey, Signature};

use std::slice;
use wasm_bindgen::prelude::*;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn public_key_from_private(private_key: &[u8]) -> Vec<u8> {
    let secret = SecretKey::from_bytes(private_key).unwrap();
    let public: PublicKey = (&secret).into();
    public.to_bytes().to_vec()
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn sign(
    signature: &mut [u8],
    private_key: &[u8],
    message: &[u8],
    context: &[u8],
    context_length: usize,
) -> i32 {
    let private_key = match SecretKey::from_bytes(private_key) {
        Ok(private_key) => private_key,
        Err(_) => return ErrorCode::INVALID_PRIVATE_KEY.value(),
    };
    let public_key = PublicKey::from(&private_key);
    let keypair: Keypair = Keypair {
        secret: private_key,
        public: public_key,
    };
    let context = unsafe { slice::from_raw_parts(context.as_ptr(), context_length) };

    if context.len() > 255 || context.len() != context_length {
        return ErrorCode::INVALID_CONTEXT_LENGTH.value();
    }
    let mut prehashed: Sha512 = Sha512::new();
    prehashed.input(message);
    let sig = keypair.sign_prehashed(prehashed, Some(context)).to_bytes(); //need to handle errors here
    signature.copy_from_slice(&sig);
    ErrorCode::NO_ERROR.value()
}

#[wasm_bindgen]
pub fn verify(
    signature: &[u8],
    public_key: &[u8],
    message: &[u8],
    context: &[u8],
    context_length: usize,
) -> i32 {
    let public_key = match PublicKey::from_bytes(public_key) {
        Ok(public_key) => public_key,
        Err(_) => return ErrorCode::INVALID_PUBLIC_KEY.value(),
    };
    let signature = match Signature::from_bytes(signature) {
        Ok(signature) => signature,
        Err(_) => return ErrorCode::INVALID_SIGNATURE.value(),
    };
    let mut prehashed: Sha512 = Sha512::new();
    let context = unsafe { slice::from_raw_parts(context.as_ptr(), context_length) };
    prehashed.input(message);

    match public_key.verify_prehashed(prehashed, Some(context), &signature) {
        Ok(_) => ErrorCode::NO_ERROR.value(),
        Err(_) => ErrorCode::SIGNATURE_VERIFICATION_FAILURE.value(),
    }
}

#[wasm_bindgen]
pub fn sign_sig_and_public_key(
    pair: &mut [u8],
    private_key: &[u8],
    message: &[u8],
    context: &[u8],
    context_length: usize,
) -> i32 {
    let private_key = match SecretKey::from_bytes(private_key) {
        Ok(private_key) => private_key,
        Err(_) => return ErrorCode::INVALID_PRIVATE_KEY.value(),
    };
    let public = PublicKey::from(&private_key);
    let keypair: Keypair = Keypair {
        secret: private_key,
        public,
    };
    let mut prehashed: Sha512 = Sha512::new();
    let context = unsafe { slice::from_raw_parts(context.as_ptr(), context_length) };
    if context.len() > 255 || context.len() != context_length {
        return ErrorCode::INVALID_CONTEXT_LENGTH.value();
    }
    prehashed.input(message);
    let sig = keypair
        .sign_prehashed(prehashed, Some(context))
        .to_bytes()
        .to_vec();

    //pair.clone_from_slice(&sig);						fix this!
    //pair.extend_from_slice(&public.to_bytes());

    ErrorCode::NO_ERROR.value()
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    #[wasm_bindgen_test]
    fn can_access_signature_error_value() {
        ErrorCode::INVALID_SIGNATURE.value();
    }

    #[wasm_bindgen_test]
    fn can_create_signature() {
        let private: [u8; 32] = [0; 32];
        let message = b"message";
        let context = b"context";
        let mut sig: [u8; 64] = [0; 64];
        let result = sign(&mut sig, &private, message, context, context.len());
        assert_eq!(result, ErrorCode::NO_ERROR.value());
	}
	
	#[wasm_bindgen_test]
    fn can_validate_signature() {
		let private: [u8; 32] = [0; 32];
		let public : PublicKey = (&(SecretKey::from_bytes(&private).unwrap())).into();
		let public_bytes = public.to_bytes();
        let message = b"message";
        let context = b"context";
        let mut sig: [u8; 64] = [0; 64];
		sign(&mut sig, &private, message, context, context.len());
		let result = verify(&sig, &public_bytes, message, context, context.len());
        assert_eq!(result, ErrorCode::NO_ERROR.value());
	}
	
	#[wasm_bindgen_test]
    fn signature_does_not_validate_with_incorrect() {
		let private: [u8; 32] = [0; 32];
		let public : PublicKey = (&(SecretKey::from_bytes(&private).unwrap())).into();
		let public_bytes = public.to_bytes();
        let message = b"message";
		let context = b"context";
		let context2 = b"context2";
        let mut sig: [u8; 64] = [0; 64];
		sign(&mut sig, &private, message, context, context.len());
		let result = verify(&sig, &public_bytes, message, context2, context2.len());
        assert_eq!(result, ErrorCode::SIGNATURE_VERIFICATION_FAILURE.value());
    }
}
