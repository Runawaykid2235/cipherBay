import sys
import json
import requests

def get_wallet_balance(wallet_address):
    # API URL
    url = f"https://api.blockcypher.com/v1/btc/main/addrs/{wallet_address}/balance"

    # Requesting the balance
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()  # Parse the JSON response correctly

        # Extracting the final_balance (balance in satoshis)
        balance_in_satoshi = data['final_balance']  # Use 'final_balance' for the confirmed balance
        balance_btc = balance_in_satoshi / 1e8  # Convert from satoshis to BTC
    else:
        return None

    return {"walletAmount": balance_btc}  # Return balance in BTC

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No wallet address provided"}))
        sys.exit(1)

    wallet_address = sys.argv[1]
    try:
        result = get_wallet_balance(wallet_address)
        if result is not None:
            print(json.dumps(result))  # Output the result as JSON
        else:
            print(json.dumps({"error": "Failed to retrieve wallet balance"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
