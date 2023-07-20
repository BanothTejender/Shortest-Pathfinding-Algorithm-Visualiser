
  const GRID_SIZE = 20;
  let startNode = null;
  let endNode = null;
  let grid = [];

  function createGrid() {
    const gridElement = document.getElementById("grid");
    for (let row = 0; row < GRID_SIZE; row++) {
      grid[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        const node = document.createElement("div");
        node.id = `node-${row}-${col}`;
        node.classList.add("node");
        gridElement.appendChild(node);
        grid[row][col] = {
          element: node,
          distance: Infinity,
          visited: false,
          previous: null,
        };

        // Add click event listener to each node
        node.addEventListener("click", () => {
          handleNodeClick(row, col);
        });
      }
    }
  }

  function handleNodeClick(row, col) {
    const clickedNode = grid[row][col];

    // Check if source node is selected
    if (startNode === null) {
      startNode = clickedNode;
      startNode.element.classList.add("start-node");
      return;
    }

    // Check if destination node is selected
    if (endNode === null) {
      endNode = clickedNode;
      endNode.element.classList.add("end-node");
      return;
    }
  }

  function runAlgorithm() {
    if (startNode === null || endNode === null) {
      alert("Please select both source and destination nodes.");
      return;
    }

    clearGrid();

    const queue = [];
    startNode.distance = 0;
    queue.push(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      currentNode.visited = true;
      currentNode.element.classList.add("visited");

      if (currentNode === endNode) {
        reconstructPath(endNode);
        return;
      }

      const neighbors = getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        const distance = currentNode.distance + 1;
        if (distance < neighbor.distance) {
          neighbor.distance = distance;
          neighbor.previous = currentNode;
          queue.push(neighbor);
        }
      }
    }
  }

  function getNeighbors(node) {
    const { row, col } = getNodeCoordinates(node);

    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < GRID_SIZE - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < GRID_SIZE - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter((neighbor) => !neighbor.visited);
  }

  function getNodeCoordinates(node) {
    const idParts = node.element.id.split("-");
    const row = parseInt(idParts[1]);
    const col = parseInt(idParts[2]);
    return { row, col };
  }

  function reconstructPath(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previous;
    }

    for (let i = 1; i < path.length - 1; i++) {
      const node = path[i];
      node.element.classList.add("shortest-path");
    }
  }

  function clearGrid() {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const node = grid[row][col];
        node.distance = Infinity;
        node.visited = false;
        node.previous = null;
        node.element.classList.remove("visited");
        node.element.classList.remove("shortest-path");
      }
    }
  }

  function initializeGrid() {
    for (let row = 0; row < GRID_SIZE; row++) {
      grid[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        grid[row][col] = null;
      }
    }
  }

  // Initialize the grid and create the visual representation
  initializeGrid();
  createGrid();
