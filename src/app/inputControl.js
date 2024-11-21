const robot = require("robotjs");

function handleMouseInput(data) {
  robot.moveMouse(data.x, data.y);
}

function handleKeyboardInput(data) {
  robot.keyTap(data.key);
}

module.exports = { handleMouseInput, handleKeyboardInput };
