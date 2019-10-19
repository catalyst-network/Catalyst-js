use ed25519_dalek::{Keypair, PublicKey, SecretKey};
use ed25519_dalek::{Sha512, Digest};
use wasm_bindgen::prelude::*;

fn keypair_from_seed(seed: &[u8]) -> Keypair {
	let secret = SecretKey::from_bytes(seed).unwrap();
	let public: PublicKey = (&secret).into();
	let keypair: Keypair = Keypair { secret, public };
	keypair
}

#[wasm_bindgen]
pub fn sign_with_no_params() -> Vec<u8> {
	 let message = b"message";
    let context = b"context";
	let seed: [u8;32] = [0;32];
	let keypair = keypair_from_seed(&seed);
    let mut prehashed: Sha512 = Sha512::new();
    prehashed.input(message);
    keypair
	.sign_prehashed(prehashed, Some(context))
	.to_bytes()
	.to_vec()
}




