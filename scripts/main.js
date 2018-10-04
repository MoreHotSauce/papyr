if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  //web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/MGb05nymXluRaB7138hk"));
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/MGb05nymXluRaB7138hk"));
}
web3.eth.getBlock(48, function(error, result){
    if(!error)
        console.log(result)
    else
        console.error(error);
})
web3.eth.getAccounts(function (error, accounts) {
  if (error) return console.error(error)
  web3.eth.defaultAccount = accounts[0]
})
console.log(web3.eth.defaultAccount);
//web3.eth.defaultAccount = web3.eth.accounts[0];

var papyr = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nonApprovedHash","outputs":[{"name":"active","type":"bool"},{"name":"info","type":"string"},{"name":"title","type":"string"},{"name":"author","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"email","type":"string"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"removeAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"emails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getHash","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pin","type":"address"}],"name":"approveData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"testOwnership","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"payload","type":"string"},{"name":"title","type":"string"},{"name":"author","type":"string"}],"name":"storeData","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"accessbyonlyusers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"approvedHashes","outputs":[{"name":"active","type":"bool"},{"name":"info","type":"string"},{"name":"title","type":"string"},{"name":"author","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowedUsers","outputs":[{"name":"active","type":"bool"},{"name":"pUser","type":"address"},{"name":"email","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"xi","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
  , '0x2B0Fd69Dc759010600307F5D97ad5b0055a8DAae');


//var papyr = new web3.eth.Contract(papyrContract, '0x7D451fe1bFDeD139EEfAF6b13C5f5796EF3FC273', {
//    from: '0x92165D2B80974733B7115E3cBf8285e70132d9E9', // default from address
//    gasPrice: '1000000000' // default gas price in wei, 1 gwei in this case
//});


function web3storeData(hash, title, author){
	papyr.methods.storeData(hash, title, author).send({from:web3.eth.defaultAccount, value:10100000000000000});
}

function web3getData(address){
	var res;
	papyr.methods.nonApprovedHash(address).call({from: address}, function(error, result){
		//console.log(result);
		res = result[1];
		console.log(res);
	});
	setTimeout(function(){
    	console.log(res+"00100");
    	window.location.href = 'https://ipfs.io/ipfs/' + res;
		return res;
	}, 1000);   
}

var final = "";
function web3getEmails(){
  var xi;
  papyr.methods.xi().call(function(error, result){
    console.log(result);
    xi = result;
  });
  console.log(xi);
}
//-------------------------------------------------------------

function web3getEmailStart(){
  var index;
  getXi(function(xi){
    index = xi - 1;
    web3getEmailsRecurse(index,function(result){
      alert(result);
      index--;
    });
  });
}
function web3getEmailsRecurse(y,callback){
  papyr.methods.emails(y).call(function(error, result){
    callback(result);
  });
}
function getXi(callback){
  papyr.methods.xi().call(function(error, result){
    console.log(result);
    callback(result);
  });
}

