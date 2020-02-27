extern crate console_error_panic_hook;
extern crate web_sys;

use catalyst_common::*;
use std::convert::TryInto;

use std::slice;
use wasm_bindgen::prelude::*;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn generate_private_key(private_key: &mut [u8]) -> i32 {
    let private_key = match private_key.try_into(){
        Ok(private_key) => private_key,
        Err(_) => return ErrorCode::INVALID_PRIVATE_KEY.value()
    };
    keys::generate_private_key(private_key, &mut rand::thread_rng())
}

#[wasm_bindgen]
pub fn public_key_from_private(public_key: &mut [u8], private_key: &[u8]) -> i32 {
    let private_key = match private_key.try_into(){
        Ok(private_key) => private_key,
        Err(_) => return ErrorCode::INVALID_PRIVATE_KEY.value()
    };
    let public_key = match public_key.try_into(){
        Ok(public_key) => public_key,
        Err(_) => return ErrorCode::INVALID_PUBLIC_KEY.value()
    };
    keys::publickey_from_private(public_key, private_key)
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn sign(
    signature: &mut [u8],
    public_key: &mut [u8],
    private_key: &[u8],
    message: &[u8],
    context: &[u8],
    context_length: usize,
) -> i32 {
    let private_key = match private_key.try_into(){
        Ok(private_key) => private_key,
        Err(_) => return ErrorCode::INVALID_PRIVATE_KEY.value()
    };
    let public_key = match public_key.try_into(){
        Ok(public_key) => public_key,
        Err(_) => return ErrorCode::INVALID_PUBLIC_KEY.value()
    };
    let signature = match try_from_sig_slice_mut(signature){
        Ok(signature) => signature,
        Err(_) => return ErrorCode::INVALID_SIGNATURE.value()
    };
    let context = unsafe { slice::from_raw_parts(context.as_ptr(), context_length) };
    std_signature::sign(signature, public_key, private_key, message, context)
}

#[wasm_bindgen]
#[allow(unused_must_use)]
pub fn verify_batch(bytes: &[u8]) -> i32{
    let mut batch_sigs = SignatureBatch::new();
    batch_sigs.merge_from_bytes(bytes);
    batch::verify_batch(&mut batch_sigs, &mut rand::thread_rng())
}

#[wasm_bindgen]
pub fn verify(
    signature: &[u8],
    public_key: &[u8],
    message: &[u8],
    context: &[u8],
    context_length: usize,
) -> i32 {
    let public_key = match public_key.try_into(){
        Ok(public_key) => public_key,
        Err(_) => return ErrorCode::INVALID_PUBLIC_KEY.value()
    };
    let signature = match try_from_sig_slice(signature){
        Ok(signature) => signature,
        Err(_) => return ErrorCode::INVALID_SIGNATURE.value()
    };
    let context = unsafe { slice::from_raw_parts(context.as_ptr(), context_length) };
    std_signature::verify(signature, public_key, message, context)
}

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;
    use protobuf::RepeatedField;

    #[wasm_bindgen_test]
    fn can_access_signature_error_value() {
        ErrorCode::INVALID_SIGNATURE.value();
    }

    #[wasm_bindgen_test]
    fn can_generate_random_private_key() {
        let mut private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
        log!("{:?}",private_key);
        generate_private_key(&mut private_key);
        log!("{:?}",private_key);
    }

    #[wasm_bindgen_test]
    fn can_create_signature() {
        let mut sig = [0u8; constants::SIGNATURE_LENGTH];
        let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];
        let private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
        let message = b"message";
        let context = b"context";

        let result = sign(&mut sig, &mut public_key, &private_key, message, context, context.len());
        assert_eq!(result, ErrorCode::NO_ERROR.value());
	}
	
	#[wasm_bindgen_test]
    fn can_validate_signature() {
        let mut sig = [0u8; constants::SIGNATURE_LENGTH];
        let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];
        let private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
        let message = b"message";
        let context = b"context";

		sign(&mut sig, &mut public_key, &private_key, message, context, context.len());
		let result = verify(&sig, &public_key, message, context, context.len());
        assert_eq!(result, ErrorCode::NO_ERROR.value());
	}
	
	#[wasm_bindgen_test]
    fn signature_does_not_validate_with_incorrect() {
        let mut sig = [0u8; constants::SIGNATURE_LENGTH];
        let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];
        let private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
        let message = b"message";
		let context = b"context";
        let context2 = b"context2";
        
		sign(&mut sig, &mut public_key, &private_key, message, context, context.len());
		let result = verify(&sig, &mut public_key,message, context2, context2.len());
        assert_eq!(result, ErrorCode::SIGNATURE_VERIFICATION_FAILURE.value());
    }

    #[wasm_bindgen_test]
    fn batch_verify_validates_multiple_correct_signatures() {
        let mut sigs : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut public_keys : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut messages = Vec::new();
        
        messages.push(b"'Twas brillig, and the slithy toves".to_vec());
        messages.push(b"Did gyre and gimble in the wabe:".to_vec());
        messages.push(b"All mimsy were the borogoves,".to_vec());
        messages.push(b"And the mome raths outgrabe.".to_vec());
        messages.push(b"'Beware the Jabberwock, my son!".to_vec());
        let context = b"context";

        for i in 0..messages.len() {
            let mut sig = [0u8; constants::SIGNATURE_LENGTH];
            let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];           
            let mut private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
            generate_private_key(&mut private_key);

            sign(&mut sig, &mut public_key, &private_key, &messages[i], context, context.len());
            sigs.push(sig.to_vec());
            public_keys.push(public_key.to_vec());
        }

        let mut batch_sigs = SignatureBatch::new();       
        batch_sigs.set_context(b"context".to_vec());
        batch_sigs.set_messages(RepeatedField::from_vec(messages));  
        batch_sigs.set_signatures(RepeatedField::from_vec(sigs));
        batch_sigs.set_public_keys(RepeatedField::from_vec(public_keys));
        let mut batch = batch_sigs.write_to_bytes().unwrap();

        let result = verify_batch(&mut batch);

        assert_eq!(result, ErrorCode::NO_ERROR.value());
    }

    #[wasm_bindgen_test]
    fn batch_verify_fails_on_single_incorrect_message() {
        let mut sigs : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut public_keys : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut messages = Vec::new();
        
        messages.push(b"'Twas brillig, and the slithy toves".to_vec());
        messages.push(b"Did gyre and gimble in the wabe:".to_vec());
        messages.push(b"All mimsy were the borogoves,".to_vec());
        messages.push(b"And the mome raths outgrabe.".to_vec());
        messages.push(b"'Beware the Jabberwock, my son!".to_vec());
        let context = b"context";

        for i in 0..messages.len() {
            let mut sig = [0u8; constants::SIGNATURE_LENGTH];
            let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];           
            let mut private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
            generate_private_key(&mut private_key);

            sign(&mut sig, &mut public_key, &private_key, &messages[i], context, context.len());
            sigs.push(sig.to_vec());
            public_keys.push(public_key.to_vec());
        }
        //alter a message before batch verification
        messages[4] = b"The jaws that bite, the claws that catch!".to_vec();

        let mut batch_sigs = SignatureBatch::new();       
        batch_sigs.set_context(b"context".to_vec());
        batch_sigs.set_messages(RepeatedField::from_vec(messages));  
        batch_sigs.set_signatures(RepeatedField::from_vec(sigs));
        batch_sigs.set_public_keys(RepeatedField::from_vec(public_keys));
        let mut batch = batch_sigs.write_to_bytes().unwrap();

        let result = verify_batch(&mut batch);

        assert_eq!(result, ErrorCode::BATCH_VERIFICATION_FAILURE.value());
    }

    #[wasm_bindgen_test]
    fn batch_verify_fails_on_single_incorrect_public_key() {
        let mut sigs : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut public_keys : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut messages = Vec::new();
        
        messages.push(b"'Twas brillig, and the slithy toves".to_vec());
        messages.push(b"Did gyre and gimble in the wabe:".to_vec());
        messages.push(b"All mimsy were the borogoves,".to_vec());
        messages.push(b"And the mome raths outgrabe.".to_vec());
        messages.push(b"'Beware the Jabberwock, my son!".to_vec());
        let context = b"context";

        for i in 0..messages.len() {
            let mut sig = [0u8; constants::SIGNATURE_LENGTH];
            let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];           
            let mut private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
            generate_private_key(&mut private_key);

            sign(&mut sig, &mut public_key, &private_key, &messages[i], context, context.len());
            sigs.push(sig.to_vec());
            public_keys.push(public_key.to_vec());
        }
        //alter a message before batch verification
        public_keys[4] = public_keys[3].to_owned();

        let mut batch_sigs = SignatureBatch::new();       
        batch_sigs.set_context(b"context".to_vec());
        batch_sigs.set_messages(RepeatedField::from_vec(messages));  
        batch_sigs.set_signatures(RepeatedField::from_vec(sigs));
        batch_sigs.set_public_keys(RepeatedField::from_vec(public_keys));
        let mut batch = batch_sigs.write_to_bytes().unwrap();

        let result = verify_batch(&mut batch);

        assert_eq!(result, ErrorCode::BATCH_VERIFICATION_FAILURE.value());
    }

    #[wasm_bindgen_test]
    fn batch_verify_fails_on_single_incorrect_signature() {
        let mut sigs : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut public_keys : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut messages = Vec::new();
        
        messages.push(b"'Twas brillig, and the slithy toves".to_vec());
        messages.push(b"Did gyre and gimble in the wabe:".to_vec());
        messages.push(b"All mimsy were the borogoves,".to_vec());
        messages.push(b"And the mome raths outgrabe.".to_vec());
        messages.push(b"'Beware the Jabberwock, my son!".to_vec());
        let context = b"context";

        for i in 0..messages.len() {
            let mut sig = [0u8; constants::SIGNATURE_LENGTH];
            let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];           
            let mut private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
            generate_private_key(&mut private_key);

            sign(&mut sig, &mut public_key, &private_key, &messages[i], context, context.len());
            sigs.push(sig.to_vec());
            public_keys.push(public_key.to_vec());
        }
        //alter a signature before batch verification
        sigs[3] = sigs[4].to_owned();

        let mut batch_sigs = SignatureBatch::new();       
        batch_sigs.set_context(b"context".to_vec());
        batch_sigs.set_messages(RepeatedField::from_vec(messages));  
        batch_sigs.set_signatures(RepeatedField::from_vec(sigs));
        batch_sigs.set_public_keys(RepeatedField::from_vec(public_keys));
        let mut batch = batch_sigs.write_to_bytes().unwrap();

        let result = verify_batch(&mut batch);

        assert_eq!(result, ErrorCode::BATCH_VERIFICATION_FAILURE.value());
    }

    #[wasm_bindgen_test]
    fn batch_verify_fails_on_incorrect_context() {
        let mut sigs : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut public_keys : std::vec::Vec<Vec<u8>> = Vec::new();
        let mut messages = Vec::new();
        
        messages.push(b"'Twas brillig, and the slithy toves".to_vec());
        messages.push(b"Did gyre and gimble in the wabe:".to_vec());
        messages.push(b"All mimsy were the borogoves,".to_vec());
        messages.push(b"And the mome raths outgrabe.".to_vec());
        messages.push(b"'Beware the Jabberwock, my son!".to_vec());
        let context = b"context";

        for i in 0..messages.len() {
            let mut sig = [0u8; constants::SIGNATURE_LENGTH];
            let mut public_key = [0u8; constants::PUBLIC_KEY_LENGTH];           
            let mut private_key = [0u8; constants::PRIVATE_KEY_LENGTH];
            generate_private_key(&mut private_key);

            sign(&mut sig, &mut public_key, &private_key, &messages[i], context, context.len());
            sigs.push(sig.to_vec());
            public_keys.push(public_key.to_vec());
        }

        let mut batch_sigs = SignatureBatch::new();       
        batch_sigs.set_context(b"context2".to_vec());
        batch_sigs.set_messages(RepeatedField::from_vec(messages));  
        batch_sigs.set_signatures(RepeatedField::from_vec(sigs));
        batch_sigs.set_public_keys(RepeatedField::from_vec(public_keys));
        let mut batch = batch_sigs.write_to_bytes().unwrap();

        let result = verify_batch(&mut batch);

        assert_eq!(result, ErrorCode::BATCH_VERIFICATION_FAILURE.value());
    }
    
}

fn try_from_sig_slice_mut(slice: &mut [u8]) -> Result<&mut [u8; constants::SIGNATURE_LENGTH], ErrorCode> {
    if slice.len() == constants::SIGNATURE_LENGTH {
        let ptr = slice.as_mut_ptr() as *mut [u8; constants::SIGNATURE_LENGTH];
        // SAFETY: ok because we just checked that the length fits
        unsafe { Ok(&mut *ptr) }
    } else {
        Err(ErrorCode::INVALID_SIGNATURE)
    }
}

fn try_from_sig_slice(slice: &[u8]) -> Result<&[u8; constants::SIGNATURE_LENGTH], ErrorCode> {
    if slice.len() == constants::SIGNATURE_LENGTH {
        let ptr = slice.as_ptr() as *const [u8; constants::SIGNATURE_LENGTH];
        // SAFETY: ok because we just checked that the length fits
        unsafe { Ok(& *ptr) }
    } else {
        Err(ErrorCode::INVALID_SIGNATURE)
    }
}