extern crate web_sys;
extern crate console_error_panic_hook;

use ed25519_dalek::{Keypair, PublicKey, SecretKey, Signature};
use ed25519_dalek::{Sha512, Digest};
#[path = "../submodules/protocol-sdk-rust/src/Cryptography.rs"]
mod Cryptography;
#[path = "../submodules/protocol-sdk-rust/src/Network.rs"]
mod Network;
use Cryptography::ErrorCode;
use wasm_bindgen::prelude::*;
use std::slice;
use protobuf::ProtobufEnum;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
pub fn public_key_from_private(private_key: &[u8]) -> Vec<u8> {
  let secret = SecretKey::from_bytes(private_key).unwrap();
  let public : PublicKey = (&secret).into();
  public
    .to_bytes()
    .to_vec()
}

#[wasm_bindgen]
pub fn init_panic_hook() {
  console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn sign(signature: &mut [u8], private_key: &[u8], message: &[u8], context: &[u8], context_length: usize) -> i32 {
  let private_key = match SecretKey::from_bytes(private_key) {
    Ok(private_key) => private_key,
    Err(_) => return ErrorCode::INVALID_PRIVATE_KEY.value()
  };
  let public_key = PublicKey::from(&private_key);
  let keypair : Keypair = Keypair { secret: private_key, public: public_key };
  let context = unsafe {
    slice::from_raw_parts(context.as_ptr(), context_length)
  };

  if context.len() > 255 || context.len() != context_length {
    return ErrorCode::INVALID_CONTEXT_LENGTH.value()
  }
  let mut prehashed: Sha512 = Sha512::new();
  prehashed.input(message);
  let sig = keypair.sign_prehashed(prehashed, Some(context)).to_bytes(); //need to handle errors here
  signature.copy_from_slice(&sig);
  ErrorCode::NO_ERROR.value()

}

#[wasm_bindgen]
pub fn verify(signature: &[u8], public_key: &[u8], message: &[u8], context: &[u8], context_length: usize) -> i32 {
  let public_key = match PublicKey::from_bytes(public_key) {
    Ok(public_key) => public_key,
    Err(_) => return ErrorCode::INVALID_PUBLIC_KEY.value()
  };
  let signature = match Signature::from_bytes(signature) {
    Ok(signature) => signature,
    Err(_) => return ErrorCode::INVALID_SIGNATURE.value()
  };
  let mut prehashed: Sha512 = Sha512::new();
  let context = unsafe {
    slice::from_raw_parts(context.as_ptr(), context_length)
  };
  prehashed.input(message);

  match public_key.verify_prehashed(prehashed, Some(context), &signature) {
    Ok(_) => ErrorCode::NO_ERROR.value(),
    Err(_) => ErrorCode::SIGNATURE_VERIFICATION_FAILURE.value()
  }

}

#[wasm_bindgen]
pub fn sign_sig_and_public_key(private_key: &[u8], message: &[u8], context: &[u8], context_length: usize) -> Vec<u8> {
  let private_key = match SecretKey::from_bytes(private_key) {
    Ok(private_key) => private_key,
    Err(_) => panic!("Provided private key is invalid.")
  };
  let public = PublicKey::from(&private_key);
  let keypair : Keypair = Keypair { secret: private_key, public };
  let mut prehashed: Sha512 = Sha512::new();
  let context = unsafe {
    slice::from_raw_parts(context.as_ptr(), context_length)
  };
  prehashed.input(message);
  let sig = keypair
    .sign_prehashed(prehashed, Some(context))
    .to_bytes()
    .to_vec();
  let mut pair = vec![];
  pair.extend_from_slice(&sig);
  pair.extend_from_slice(&public.to_bytes());
  pair
}

#[wasm_bindgen]
pub fn return_errorcode() -> i32 {
  ErrorCode::INVALID_SIGNATURE.value()
}

#[wasm_bindgen]
pub fn try_mutate_array(signature: &mut [u8]) {
  signature[0] = 1;
}
