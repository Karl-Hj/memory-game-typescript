import { TextLevel } from "../interface/interface";

export function LevelText({
  activeLevel,
  nextLevelButton,
  failLevelText,
  tryAgainButton,
}: TextLevel) {
  return (
    <div className="level-text-container">
      {failLevelText ? (
        <>
          <div className="level-text">
            You completed level {activeLevel}! Ready for next level?
          </div>
          <button className="level-button" onClick={nextLevelButton}>
            Next Level!
          </button>
        </>
      ) : (
        <>
          <div className="level-text">You failed on level {activeLevel}!</div>
          <button className="level-button" onClick={tryAgainButton}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
}
