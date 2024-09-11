from web3 import Web3

# URL del nodo RPC de Astar
astar_rpc_url = 'https://evm.shibuya.astar.network'

# Conectar a la blockchain de Astar
web3 = Web3(Web3.HTTPProvider(astar_rpc_url))

# Verificar la conexión
if web3.isConnected():
    print("Conectado exitosamente a la blockchain de Astar")
else:
    print("Error al conectar con la blockchain")
