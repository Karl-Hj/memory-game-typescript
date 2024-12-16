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

    const timeouts: number[] = [];

    const waitForCellRender = setTimeout(() => {
      cellElements.forEach((element) => {
        element.classList.add("disable-click");
      });
      //Delay added to make sure cells render at mount before check of data attribute
      numberOrderArray.forEach((cellNumber, index) => {
        const cellElement = document.querySelector(
          //Fetches the cell with the data attribut of numberOrderArray.current value
          `.cell.active[data-number="${cellNumber}"]`
        ) as HTMLDivElement;

        if (cellElement) {
          // If it exists add single-cell-glow class with 1.5 sec delay.
          const addGlowTimeOut = setTimeout(() => {
            cellElement.classList.add("single-cell-glow");
          }, 1500 * index);
          timeouts.push(addGlowTimeOut);

          const removeGlowTimeOut = setTimeout(() => {
            cellElement.classList.remove("single-cell-glow");
          }, 1500 * index + 1500);
          timeouts.push(removeGlowTimeOut);
        }
      });

      const totalDelayTime = 1500 * numberOrderArray.length + 100;
      const removeClickTimeout = setTimeout(() => {
        cellElements.forEach((element) => {
          element.classList.remove("disable-click");
        });
      }, totalDelayTime);
      timeouts.push(removeClickTimeout);
    }, 100);
    timeouts.push(waitForCellRender);
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [numberOrderArray]);

  return (
    <div className="grid-container">
      {cells.map((cell, index) => {
        const glow = numberOrderArray.some((element) => element === cell.id); //Itterades through array. If element is equal to cell, return true.

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
