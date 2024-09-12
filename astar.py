

from web3 import Web3

# URL 
astar_rpc_url = 'https://evm.shibuya.astar.network'

# Conexión blockchain
web3 = Web3(Web3.HTTPProvider(astar_rpc_url))

# Verificación 
if web3.is_connected():
    print("Conectado exitosamente a la blockchain de Astar")
else:
    print("Error al conectar con la blockchain")
