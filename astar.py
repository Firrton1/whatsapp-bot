from web3 import Web3

# Conectar al nodo de Astar
astar_url = 'https://evm.shibuya.astar.network'  # URL del nodo Astar
web3 = Web3(Web3.HTTPProvider(astar_url))

# Verificar conexión
if web3.is_connected():
    print("Conectado exitosamente a la blockchain de Astar")
else:
    raise Exception("Error al conectar a la blockchain de Astar")

# Clave privada y dirección pública (Asegúrate de que sean correctas)
private_key = 'abff7db99e11fd37a6fe2aedc5266d062fd6ecb312703f8a35f5505d7fabf56d'  # Tu clave privada
address = '0x0d934b5b597c80CD01BbA9C0C596f40E468Da82c'  # Tu dirección pública

# Verifica la clave privada y dirección
print(f"Clave privada: {private_key}")
print(f"Dirección pública: {address}")

# Verificar saldo de la cuenta
balance = web3.eth.get_balance(address)
print(f"Saldo de la cuenta: {web3.from_wei(balance, 'ether')} ASTR")

if balance == 0:
    raise Exception("Saldo insuficiente en la cuenta para realizar la transacción.")

# Obtener el nonce (número de transacciones realizadas por la cuenta)
nonce = web3.eth.getTransactionCount(address)
print(f"Nonce: {nonce}")

# Datos de la transacción
to_address = '0x1234567890abcdef1234567890abcdef12345678'  # Dirección del destinatario (Cámbiala por una válida)
tx = {
    'nonce': nonce,
    'to': to_address,
    'value': web3.toWei(0.01, 'ether'),  # Monto en ASTR (equivalente a 0.01 Ether)
    'gas': 2000000,  # Límite de gas
    'gasPrice': web3.toWei('50', 'gwei'),  # Precio del gas
    'chainId': 592  # ChainId de Astar Mainnet
}

# Mostrar la transacción que se va a firmar
print(f"Transacción a enviar: {tx}")

# Firmar la transacción
signed_tx = web3.eth.account.sign_transaction(tx, private_key)
print(f"Transacción firmada: {signed_tx}")

# Enviar la transacción
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
print(f"Transacción enviada. Hash: {web3.toHex(tx_hash)}")
