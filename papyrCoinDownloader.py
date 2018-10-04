from web3 import Web3
import json
import sys
import ipfsapi
from web3.providers.rpc import HTTPProvider

api = ipfsapi.connect('127.0.0.1', 5001)
contractAddress = '0x1B76Ee1946dD680a5E53a8D3C483DA96500583fa'
web3 = Web3(HTTPProvider('https://kovan.infura.io/'))

if web3.eth.blockNumber == 0:
	print('error')
	sys.exit()
else:
	print(web3.eth.blockNumber)

with open('papyrABI.json', 'r') as abi_definition:
    abi = json.load(abi_definition)

gContract = web3.eth.contract(contractAddress, abi=abi)
i = 0
while 0==0:
	fileName = "content/" + gContract.call().getHash(i)[1] + " " + gContract.call().getHash(i)[2] + ".txt"
	fileContent = api.cat(gContract.call().getHash(i)[0])
	f = open(fileName,'w')
	f.write(str(fileContent))
	f.close()
	i += 1
