from bitcoinlib.keys import Key
import json

# Function to generate keys
def generate_keys():
    # Create a new Bitcoin key
    key = Key()
    
    # Ensure you're using the correct attributes: 
    private_key = key.wif()  # WIF is a method, so we call it like a function
    public_key = key.address()  # address is also a method
    
    # Return the private and public keys
    return {
        "private_key": private_key,
        "public_key": public_key
    }

# If the script is executed directly
if __name__ == "__main__":
    keys = generate_keys()  # Generate the keys
    
    # Print the keys in JSON format for easy parsing in PHP
    print(json.dumps(keys))
