//se alla cells !KLAR
// Gå igenom invidiva cells.
// se till att varje cell klickas i rätt ordning.
// start om och öka med en cell.

import { useEffect } from "react";
import { CellInterface } from "../interface/interface";

export function Cells({
  cells,
  setClickedCell,
  numberOrderArray,
}: CellInterface) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const activeCell = e.currentTarget.textContent;
    return setClickedCell(parseInt(activeCell!));
  }

  useEffect(() => {
    const waitForCellRender = setTimeout(() => {
      //Delay added to make sure cells render at mount before check of data attribute
      numberOrderArray.forEach((cellNumber, index) => {
        const cellElement = document.querySelector(
          //Fetches the cell with the data attribut of numberOrderArray.current value
          `.cell.active[data-number="${cellNumber}"]`
        ) as HTMLDivElement;

        if (cellElement) {
          // If it exists add single-cell-glow class with 1.5 sec delay.
          setTimeout(() => {
            cellElement.classList.add("single-cell-glow");
          }, 1500 * index);
        }
      });
    }, 100);
    return () => clearTimeout(waitForCellRender);
  }, [numberOrderArray]);

  return (
    <div className="grid-container">
      {cells.map((cell, index) => {
        const glow = numberOrderArray.some((element) => element === cell); //Itterades through array. If element is equal to cell, return true.

        return (
          <div
            key={index}
            data-number={cell}
            onClick={handleClick}
            className={`cell ${glow ? "active" : ""}`}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
}
