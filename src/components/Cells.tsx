import { useEffect } from "react";
import { CellInterface } from "../interface/interface";

export function Cells({
  cells,
  setClickedCell,
  numberOrderArray,
}: CellInterface) {
  //Handles click
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const activeCell = e.currentTarget.getAttribute("data-number");
    return setClickedCell(parseInt(activeCell!));
  }

  useEffect(() => {
    const cellElements = document.querySelectorAll(
      ".cell"
    ) as NodeListOf<HTMLDivElement>;

    //Makes sure animation class is removed before next round
    cellElements.forEach((cellElement) => {
      cellElement.classList.remove("single-cell-glow");
    });

    async function runCellAnimation() {
      await new Promise((resolve) => setTimeout(resolve, 100));
      cellElements.forEach((element) => {
        element.classList.add("disable-click");
      });

      // Delay added to make sure cells render at mount before check of data attribute
      for (const cellNumber of numberOrderArray) {
        const cellElement = document.querySelector(
          `.cell.active[data-number="${cellNumber}"]`
        ) as HTMLDivElement;

        if (cellElement) {
          requestAnimationFrame(() => {
            cellElement.classList.add("single-cell-glow");
          });
          await new Promise((resolve) => setTimeout(resolve, 1500));

          cellElement.classList.remove("single-cell-glow");
        }
      }

      // Återaktivera klick efter animationerna
      cellElements.forEach((element) => {
        element.classList.remove("disable-click");
      });
    }

    runCellAnimation();
  }, [numberOrderArray]);

  return (
    <div className="grid-container">
      {cells.map((cell, index) => {
        const glow = numberOrderArray.some((element) => element === cell.id); //Itterades through array . If element is equal to cell, return true.
        console.log(numberOrderArray);
        return (
          <div
            key={index}
            data-number={cell.id}
            onClick={handleClick}
            className={`cell ${glow ? "active" : ""}`}
          >
            {cell.value}
          </div>
        );
      })}
    </div>
  );
}
