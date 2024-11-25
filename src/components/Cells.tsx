//se alla cells !KLAR
// Gå igenom invidiva cells.
// se till att varje cell klickas i rätt ordning.
// start om och öka med en cell.

import { CellInterface } from "../interface/interface";

export function Cells({ cells, setClickedCell }: CellInterface) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const activeCell = e.currentTarget.textContent;
    return setClickedCell(parseInt(activeCell!));
  }

  return (
    <div className="grid-container">
      {cells.map((cell, index) => {
        return (
          <div className="cell" key={index} onClick={handleClick}>
            {cell}
          </div>
        );
      })}
    </div>
  );
}
