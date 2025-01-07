import { StartGame } from "../interface/interface";

export function WelcomeText({ startGameButton }: StartGame) {
  return (
    <div className="level-text-container">
      <div className="level-text">
        Welcome to the sequence game! Press the buttons in the correct order to
        win!
      </div>
      <button className="level-button" onClick={startGameButton}>
        Start!
      </button>
    </div>
  );
}
