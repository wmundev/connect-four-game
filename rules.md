# Connect Four Rules

1. **Board Setup**
   - The game board consists of a 6x7 grid (6 rows and 7 columns)
   - The board starts empty
   - Players take turns dropping their pieces into any column that isn't full

2. **Game Flow**
   - Two players alternate turns
   - On their turn, a player must drop one piece into any non-full column
   - The piece falls to the lowest available position in that column
   - A player cannot place a piece in a column that is already full

3. **Winning Conditions**
   A player wins when they achieve one of the following:
   - Four pieces in a horizontal row
   - Four pieces in a vertical column
   - Four pieces in a diagonal line (either direction)

4. **Game End Conditions**
   The game ends when either:
   - A player wins by connecting four pieces
   - The board becomes completely full (draw)

5. **Game State Tracking**
   The game must keep track of:
   - Current player's turn
   - Board state (empty, player1, or player2 for each cell)
   - Whether the game has ended
   - The winner (if any)

6. **Move Validation Rules**
   - A move is only valid if the chosen column is not full
   - Pieces must always fall to the lowest available position
   - Players cannot place pieces outside of their turn
   - No moves can be made after the game has ended

7. **Technical Implementation Requirements**
   - Board should be represented as a 2D array/matrix
   - Need functions to:
     - Check for valid moves
     - Update board state
     - Check for win conditions
     - Switch player turns
     - Reset the game