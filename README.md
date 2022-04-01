dAppuesta
==================

Es un juego de apuestas entre dos participantes, haces un deposito para crear un juego, para iniciarlo, el otro jugador debe hacer un deposito por la misma cantidad de NEAR, de manera aleatoria se selecciona un ganador y recibe el total depositado por ambos jugadores.

Proyecto realizado dentro del NCD de NEAR Hispano


Comandos
==================

Crear un juego nuevo

`near call dappuesta.ikriam.testnet createGame --deposit 5 --accountId p1.ikriam.testnet` 

Iniciar un juego

` near call dappuesta.ikriam.testnet startGame '{"gameId":2613504321}' --accountId ikriam.testnet --deposit 5` 

Obtener un juego

` near call dappuesta.ikriam.testnet getGame '{"gameId":2613504321}' --accountId ikriam.testnet` 

Obtener la lista de juegos

` near call dappuesta.ikriam.testnet getGames '{}' --accountId ikriam.testnet ` 


Uso
==================


### Jugando en un juego activo:

Para participar en un juego, solo es necesario pulsar el boton “jugar”

<img width="425" alt="image" src="https://user-images.githubusercontent.com/25872637/161347948-6de41ded-8756-490e-8204-81804eef1d24.png">


Luego de ello, hay que aprobar la transaccion por el monto a apostar en ese juego

<img width="297" alt="image" src="https://user-images.githubusercontent.com/25872637/161347966-e8f78406-8791-449e-b022-783ae91ed455.png">

Cuando la transaccion es aprobada, podemos visualizar quien gano la apuesta y la cantidad de NEAR que recibio el jugador

<img width="382" alt="image" src="https://user-images.githubusercontent.com/25872637/161347982-ff97fb67-7b95-4eaa-ad2c-55ce44f6a94f.png">



### Crear un juego nuevo:

Para crear un juevo nuevo, basta con ingresar la cantidad de NEAR que queremos apostar y presionar el boton de “Crear Juego”

<img width="425" alt="image" src="https://user-images.githubusercontent.com/25872637/161348004-84ceee35-ff0e-4cbd-80cf-5e978d4b838e.png">

 

Lo siguiente es aprobar la transaccion

<img width="363" alt="image" src="https://user-images.githubusercontent.com/25872637/161348025-537fff3c-69b7-4367-bbf5-1e2db0faf8f4.png">


Una vez aprobada la transaccion, podremos visualizar nuestra apuesta en la lista de juegos.

<img width="425" alt="image" src="https://user-images.githubusercontent.com/25872637/161348035-e4dd3851-83d3-4589-9af5-a0d78b1db105.png">



Quick Start
===========

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `yarn install`
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR TestNet!

Go ahead and play with the app and the code. As you make code changes, the app will automatically reload.

