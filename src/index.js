import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'
import { utils } from 'near-api-js'
import Big from 'big.js';
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')


const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const storage = window.localStorage;

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout
document.querySelector('#createGameButton').onclick = createGame

function test() {
  console.log("test")
}
// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })

  // populate links in the notification box
  const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
  accountLink.href = accountLink.href + window.accountId
  accountLink.innerText = '@' + window.accountId
  const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  contractLink.href = contractLink.href + window.contract.contractId
  contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  accountLink.href = accountLink.href.replace('testnet', networkId)
  contractLink.href = contractLink.href.replace('testnet', networkId)

  init();
}


// update global currentGreeting variable; update DOM with it
async function init() {

  let lastGame = storage.getItem('ultimoJuego');


  if(lastGame!=null){
    let res=await window.contract.getGame({
      gameId:parseInt(lastGame)
    });

    document.getElementById("ganador").textContent=res.ganador;
    let total1=parseFloat(utils.format.formatNearAmount(res.apuesta1));
    let total2=parseFloat(utils.format.formatNearAmount(res.apuesta2));
    document.getElementById("total").textContent=total1+total2;

    document.querySelector('[data-behavior=notificationJuego]').style.display = 'block'

  // remove notification again after css animation completes
  // this allows it to be shown again next time the form is submitted
    setTimeout(() => {
      document.querySelector('[data-behavior=notificationJuego]').style.display = 'none'
      storage.removeItem('ultimoJuego');
    }, 11000)

    console.log(res)
  }

  console.log(lastGame);
  let response;
  try {
    
    response = await window.contract.getGames()
    console.log(response);

    var table = document.getElementById('tableLast');
    response.forEach(function (object) {
      let tr = document.createElement('tr');
      tr.style = 'text-align: center';
      tr.innerHTML =
        '<td  style="padding-left: 10px;">' + object.id + '</td>' +
        '<td>' + object.jugador1 + '</td>' +
        '<td style="text-align: start; padding-left: 8px;">' + (object.jugador2 != null ? object.jugador2 : '') + '</td>' +
        '<td>' + utils.format.formatNearAmount(object.apuesta1) + '</td>' +
        '<td>' + object.estado + '</td>' +
        '<td>' + (object.ganador != null ? object.ganador : '-') + '</td>' +
        '<td>' + (object.estado == "Creado" ? '<button id="' + object.id + '" >Jugar</button>' : '<button id="' + object.id + '" disabled >Jugar</button>') + '</td>'
        ;
      table.appendChild(tr);
      document.getElementById(object.id).onclick = async function () {

        try {


          storage.setItem('ultimoJuego', object.id);
          await window.contract.startGame(

            { gameId: object.id },
            BOATLOAD_OF_GAS,
            object.apuesta1
          );
          
        } catch (e) {
          console.log(e)
          alert(
            'Something went wrong! ' +
            'Maybe you need to sign out and back in? ' +
            'Check your browser console for more info.'
          )
          throw e
        } 
        
        }
    });

  } catch (e) {
    console.log(e)
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } 

  
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) signedInFlow()
    else signedOutFlow()
  })
  .catch(console.error)


async function createGame() {
  try {
    let apuesta = document.getElementById("apuesta").value;
    await window.contract.createGame(

      {},
      BOATLOAD_OF_GAS,
      Big(apuesta || '5').times(10 ** 24).toFixed()
    );

  } catch (e) {
    console.log(e)
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } finally {
    

  }
  
}

