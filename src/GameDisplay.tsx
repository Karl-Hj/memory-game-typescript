import { useCallback, useEffect, useRef, useState } from "react";
import { Cells } from "./components/Cells";
import "../src/css/game.css";
import { LevelText } from "./components/LevelText";

const InitalValue: { id: number; value: string }[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: index + 1,
    value: "",
  })
);

export function GameDisplay() {
  const [cells, setCells] =
    useState<{ id: number; value: string }[]>(InitalValue); //Cells on the board
  const checkCellNumberRef = useRef<number>(1); //Represents the value of the cell number that should be clicked
  const [numberOrderArray, setNumberOrderArray] = useState<number[]>([1, 2, 3]); //Sorted array as refrence to check if correct cell number is actived.
  const arrayLength = useRef<number>(3); //Controls how many numbers should be displayed at each level.
  const [clickedCell, setClickedCell] = useState<number | undefined>(undefined); //Holds the number of the cell that the player clicked on.
  const [textPromt, setTextPromt] = useState<boolean>(false);
  const [failLevelText, setFailLevelText] = useState<boolean>(false);
  const [activeLevel, setActiveLevel] = useState<number>(1);

  //Implementation of Fisher-Yets Algoritm to shuffle array
  const shuffleArray = useCallback(() => {
    setCells((prevCells) => {
      const shuffleCells = [...prevCells];
      for (let i = shuffleCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleCells[i], shuffleCells[j]] = [shuffleCells[j], shuffleCells[i]];
      }
      return shuffleCells;
    });
  }, []);

  //Resets and updates varibales for next level
  function nextLevel() {
    arrayLength.current += 2; //Control number of cells should be added each level.
    checkCellNumberRef.current = 1;
    const newArray = Array.from(
      { length: arrayLength.current },
      (_, index) => index + 1
    );
    setNumberOrderArray(newArray);
    shuffleArray();
  }

  //Checks if the clicked cell is the same value as in the checkArray list
  useEffect(() => {
    if (clickedCell !== undefined) {
      if (clickedCell === numberOrderArray[checkCellNumberRef.current - 1]) {
        //Adds animation to cell
        const correctCell = document.querySelector(
          `.cell[data-number="${
            numberOrderArray[checkCellNumberRef.current - 1]
          }"]`
        );
        correctCell!.classList.add("single-cell-glow");

        checkCellNumberRef.current += 1;
      } else if (
        clickedCell !== numberOrderArray[checkCellNumberRef.current - 1]
      ) {
        setFailLevelText(false);
        setTextPromt(true);
        // console.log("You clicked the wrong cell!");
      }
      if (checkCellNumberRef.current > numberOrderArray.length) {
        console.log("Time for next Level");
        setActiveLevel((preV) => (preV += 1));
        setFailLevelText(true);
        setTextPromt(true);
      }
      if (numberOrderArray.length > 29) {
        console.log("You won");
      }
    }
  }, [clickedCell, numberOrderArray]);

  function nextLevelButton() {
    setTextPromt(false);
    setClickedCell(undefined);
    nextLevel();
  }

  function tryAgainButton() {
    arrayLength.current = 3; //Rest to 3
    checkCellNumberRef.current = 1;
    const newArray = Array.from(
      { length: arrayLength.current },
      (_, index) => index + 1
    );
    setNumberOrderArray(newArray);
    setActiveLevel(1);
    setTextPromt(false);
    setClickedCell(undefined);
    shuffleArray();
  }

  // Shuffle array at mount
  useEffect(() => {
    shuffleArray();
  }, [shuffleArray]);

  return (
    <div className="outer-container">
      <div className="board-container">
        {textPromt ? (
          <LevelText
            failLevelText={failLevelText}
            activeLevel={activeLevel}
            nextLevelButton={nextLevelButton}
            tryAgainButton={tryAgainButton}
          />
        ) : (
          ""
        )}
        <Cells
          cells={cells}
          setClickedCell={setClickedCell}
          numberOrderArray={numberOrderArray}
        />
      </div>
    </div>
  );
}
