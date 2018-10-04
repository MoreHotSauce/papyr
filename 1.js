'use strict'

var IPFS = require('ipfs')

const node = new IPFS({ repo: 'ipfs-' + Math.random() })

node.once('ready', () => console.log('IPFS node is ready'))

function store () {

  var toStore = "meme";
  var fileFinput = document.getElementById('fileinput').files[0];
  if (fileFinput) {
    var reader = new FileReader();
    reader.readAsText(fileFinput, "UTF-8");
    reader.onload = function (evt) {
      toStore = evt.target.result;
      console.log(toStore);
      var buf = Buffer.from(toStore, 'utf8');
  node.files.add(buf, (err, res) => {
    if (err || !res) {
      return console.error('ipfs add error', err, res)
    }

    res.forEach((file) => {
      if (file && file.hash) {
        console.log('successfully stored', file.hash);
        console.log(file.hash);
        web3storeData(file.hash, $("#jsTitle").val(), $("#aName").val());
      }
    })
  });
    }
    reader.onerror = function (evt) {
      console.log("error reading");
    }
  }

  /*
  var buf = Buffer.from(toStore, 'utf8');
  node.files.add(buf, (err, res) => {
    if (err || !res) {
      return console.error('ipfs add error', err, res)
    }

    res.forEach((file) => {
      if (file && file.hash) {
        console.log('successfully stored', file.hash)
        console.log(file.hash)
      }
    })
  })*/
}

function getDocI(){
  console.log("newest");
  console.log(web3getData($("#getDocHash").val()));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addButton').onclick = store
})
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getDocbtn').onclick = getDocI
})