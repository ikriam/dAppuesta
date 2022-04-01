import { context ,ContractPromiseBatch, PersistentUnorderedMap,RNG, u128} from 'near-sdk-as'

@nearBindgen
class Game {
  public id: u32;
  public jugador1: string;
  public jugador2: string;
  public apuesta1:u128;
  public apuesta2:u128;
  public estado: string;
  public ganador:string;

  constructor() {

   
    const rnd = new RNG<u32>(1, u32.MAX_VALUE);
    const rndNum = rnd.next();
    this.id = rndNum;
    this.apuesta1 = context.attachedDeposit;
    this.apuesta2 = u128.Zero;
    this.jugador1 = context.sender;
    this.estado = "Creado";
}
}

//const games = new PersistentMap<u32, Game>("g");
export const games = new PersistentUnorderedMap<u32, Game>("g");

export function createGame(): void {
  const game = new Game();
  games.set(game.id, game);
  
}

export function setEstatus(gameId: u32,status:string): void {

  
  const game = getGame(gameId)

  if(game!=null){
    game.estado=status;
    games.set(gameId, game);
  }
  

}



export function getGame(gameId: u32): Game | null {
  return games.get(gameId);
}

export function startGame(gameId:u32):string{

  const game = getGame(gameId)

  if(game!=null){
    if(game.estado!=="Finalizado"){
      game.jugador2=context.sender;
      game.apuesta2=context.attachedDeposit;

      const random = new RNG<u32>(1, 10);
      const rndNum = random.next();

      if(rndNum %3 == 0){
        game.ganador=game.jugador1;
      
      }else{
        game.ganador=game.jugador2
       
      }

      const transaction = ContractPromiseBatch.create(game.ganador);
      
      transaction.transfer(u128.add(game.apuesta1, game.apuesta2));

      game.estado="Finalizado";

      games.set(gameId, game);

      return "El ganador es "+game.ganador;
    }else
      return "Este juego ya ha finalizado"
    
  }return "El juego no existe"

}

export function getGames():Game[]{
  const result = new Array<Game>(10);
  //games.entries().forEach((v)->result.push(v));

  
//*/
  
return games.values();
 
}