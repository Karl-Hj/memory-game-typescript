import { useCallback, useEffect, useRef, useState } from "react";
import { Cells } from "./components/Cells";
import "../src/css/game.css";
const InitalValue: number[] = Array.from(
  { length: 30 },
  (_, index) => index + 1
);

export function GameDisplay() {
  const [cells, setCells] = useState<number[]>(InitalValue); //Cells on the board
  const checkCellNumberRef = useRef<number>(1); //Represents the value of the cell number that should be clicked
  const numberOrderArray = useRef<number[]>([1, 2, 3]); //Sorted array as refrence to check if correct cell number is actived.
  const arrayLength = useRef<number>(3); //Controls how many numbers should be displayed at each level.
  const [clickedCell, setClickedCell] = useState<number | undefined>(undefined); //Holds the number of the cell that the player clicked on.

  //Implementation of Fisher-Yets Algoritm
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
  const nextLevel = useCallback(() => {
    arrayLength.current += 1;
    checkCellNumberRef.current = 1;
    const newArray = Array.from(
      { length: arrayLength.current },
      (_, index) => index + 1
    );
    numberOrderArray.current = newArray;
    shuffleArray();
    console.log("Next level: ", arrayLength.current);
    console.log("New numberOrderArray:", numberOrderArray.current);
  }, [shuffleArray]);

  useEffect(() => {
    //Checks if the clicked cell is the same value as in the checkArray list
    if (
      clickedCell === numberOrderArray.current[checkCellNumberRef.current - 1]
    ) {
      checkCellNumberRef.current += 1;

      console.log("You clicked the right cell");
      console.log(numberOrderArray.current.length);
      console.log(checkCellNumberRef);
    } else {
      console.log("You clicked the wrong cell!");
    }
    if (checkCellNumberRef.current > numberOrderArray.current.length) {
      console.log("Time for next Level");
      nextLevel();
    }
    if (numberOrderArray.current.length > 30) {
      console.log("You won");
    }
  }, [clickedCell, nextLevel]);

  // Shuffle array at mount
  useEffect(() => {
    shuffleArray();
  }, [shuffleArray]);

  return (
    <div className="outer-container">
      <div className="board-container">
        <Cells cells={cells} setClickedCell={setClickedCell} />
      </div>
    </div>
  );
}
