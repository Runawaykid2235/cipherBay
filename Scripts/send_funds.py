import sys
from bit import Key
from bit.exceptions import InsufficientFunds
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def send_funds(sender_private_key, recipient_address, amount):
    try:
        # Load the sender's wallet using the private key
        key = Key(sender_private_key)

        # Check balance
        balance = key.get_balance('btc')
        logging.info(f"Sender's balance: {balance} BTC")

        if float(balance) < float(amount):
            raise InsufficientFunds("Insufficient funds to complete the transaction.")

        # Create and send the transaction
        tx_hash = key.send([(recipient_address, amount, 'btc')])
        logging.info(f"Transaction successful. Tx hash: {tx_hash}")
        return tx_hash

    except InsufficientFunds as e:
        logging.error(f"Insufficient funds: {e}")
        return None
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return None

if __name__ == '__main__':
    # Ensure correct number of arguments
    if len(sys.argv) != 5:
        logging.error("Usage: python3 send_funds.py <sender_public_key> <sender_private_key> <recipient_address> <amount>")
        sys.exit(1)

    # Parse arguments
    sender_public_key = sys.argv[1]  # Public key (not used in this example, but could be used for validation)
    sender_private_key = sys.argv[2]
    recipient_address = sys.argv[3]
    amount = sys.argv[4]  # Amount in BTC

    # Call send_funds function
    tx_hash = send_funds(sender_private_key, recipient_address, amount)
    if tx_hash:
        logging.info(f"Transaction completed successfully. Tx hash: {tx_hash}")
    else:
        logging.error("Transaction failed.")
