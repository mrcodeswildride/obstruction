let rows = document.getElementsByClassName(`row`)
let squares = document.getElementsByClassName(`square`)
let messageParagraph = document.getElementById(`messageParagraph`)

let turn = `O`

for (let square of squares) {
  square.addEventListener(`click`, clickSquare)
}

function clickSquare() {
  if (this.innerHTML == `` && !this.classList.contains(`touching`)) {
    selectSquare(this)

    if (boardIsFull()) {
      messageParagraph.innerHTML = `${turn} wins!`
    }
    else {
      turn = turn == `O` ? `X` : `O`
    }
  }
}

function selectSquare(square) {
  square.innerHTML = turn

  for (let yDiff = -1; yDiff <= 1; yDiff++) {
    for (let xDiff = -1; xDiff <= 1; xDiff++) {
      if (xDiff != 0 || yDiff != 0) {
        let neighbor = getNeighbor(square, xDiff, yDiff)

        if (neighbor != null) {
          neighbor.classList.add(`touching`)
        }
      }
    }
  }
}

function getNeighbor(square, xDiff, yDiff) {
  let row = square.parentElement // row of square
  let y // y coordinate of square, set below
  let x // x coordinate of square, set below

  // loop through rows to determine y
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == row) {
      y = i // found matching row, so set y
    }
  }

  // loop through squares in row to determine x
  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i] == square) {
      x = i // found matching square, so set x
    }
  }

  // row of neighbor square
  let neighborRow = rows[y + yDiff]

  if (neighborRow == null) {
    // row is beyond edge, so no neighbor square
    return null
  }
  else {
    // if x + xDiff is beyond edge, will be null
    return neighborRow.children[x + xDiff]
  }
}

function boardIsFull() {
  for (let square of squares) {
    if (square.innerHTML == `` && !square.classList.contains(`touching`)) {
      return false
    }
  }

  return true
}