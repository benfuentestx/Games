# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser-based Crossy Road game implementation built as a single HTML file with embedded CSS and JavaScript. The game features a chicken character crossing roads with moving vehicles, using Canvas 2D rendering with 2.5D visual effects.

## Running the Game

Simply open `crossy-road.html` in any modern web browser. No build process or dependencies required.

## Code Architecture

### Single-File Structure
The entire game is contained in [crossy-road.html](crossy-road.html) with three main sections:
- **Styles** (lines 7-101): CSS styling for game container, canvas, score display, and game over screen
- **HTML** (lines 103-126): DOM structure including game canvas, score display, and game over overlay
- **JavaScript** (lines 128-1174): Complete game logic

### Core Game Systems

**Infinite Scrolling World**
- World coordinates system with `player.worldY` tracking absolute position
- Camera system (`cameraY`) that smoothly follows player with lerp interpolation (line 257)
- Dynamic road generation system that creates new roads ahead and cleans up old ones (lines 192-225)
- Roads generated at every 3rd row going into negative coordinates as player progresses

**Player Movement & State**
- Grid-based movement (40px grid size) with smooth rendering interpolation
- Dual coordinate system: discrete grid positions (`player.x`, `player.worldY`) and smooth render positions (`player.renderX`, `player.renderWorldY`)
- Score increases when moving to new forward-most position
- Win condition at score 333 (line 1074)

**Vehicle System**
- 7 vehicle types with varying widths and visual designs (sedan, SUV, sports car, van, pickup, delivery truck, semi truck)
- Each road has random direction and 1-2 vehicles
- Frame-independent movement using delta time normalization (lines 262-273)
- Collision detection based on grid overlap (lines 1047-1059)

**Rendering Pipeline**
1. Sky gradient background
2. Grass/road lanes with 2.5D perspective effects (depth gradients, edge highlights)
3. Vehicles with directional facing and detailed 2.5D rendering
4. Sun decoration in top-right corner
5. Realistic chicken sprite with shading, feathers, comb, beak, eyes

### Key Functions

**Game Loop & Updates**
- `gameLoop(currentTime)` (line 1162): Main loop using requestAnimationFrame with delta time
- `update(deltaTime)` (line 246): Updates player interpolation, camera, road generation, vehicle movement, and collision
- `draw()` (line 280): Renders all game elements with camera offset

**Vehicle Drawing Functions**
- `drawSedan()`, `drawSUV()`, `drawSportsCar()` (lines 410-577): Standard vehicles
- `drawVan()`, `drawPickup()` (lines 580-679): Medium vehicles
- `drawDeliveryTruck()`, `drawSemiTruck()` (lines 682-818): Large vehicles
- All use 3D shading helpers: `shadeColor()` (line 848), `drawWheel()` (line 821)

**Environment Rendering**
- `draw3DRoad()` (line 348): Road with gradient, edge highlights, and dashed center line
- `draw3DGrass()` (line 381): Grass with texture strokes and edge highlights
- `drawChicken()` (line 858): Detailed chicken sprite with body, head, comb, wattle, beak, eye, legs
- `drawSun()` (line 1006): Sun with glow and rays

**Game State Management**
- `init()` (line 161): Creates initial roads and vehicles
- `generateNewRoads()` (line 192): Infinite world generation
- `checkCollision()` (line 1047): Grid-based collision detection
- `endGame()` / `winGame()` / `restartGame()` (lines 1108-1158): Game state transitions
- High score persistence using localStorage

### Game Constants

- `GRID_SIZE = 40`: Base unit for all positioning
- `COLS = 15`, `ROWS = 15`: Canvas grid dimensions
- Canvas size: 600x600 pixels
- Starting position: Row 13 (ROWS - 2)
- Vehicle spawn: Every 3rd row
- Smooth camera lerp factor: 0.15 (line 256)
- Player position lerp factor: 0.25 (line 250)

## Modifying the Game

**Adding New Vehicle Types**
1. Add vehicle definition to `getRandomVehicleType()` (line 232) with type name and width
2. Create draw function following pattern: `drawVehicleType(x, y, width, color, facingRight)`
3. Add case to vehicle rendering switch statement (line 314)
4. Use `shadeColor()` helper for 3D depth effects and `drawWheel()` for wheels

**Adjusting Difficulty**
- Vehicle speed range: lines 182, 212 (currently 0.02-0.05 per frame)
- Vehicle count per road: lines 174, 205 (currently 1-2)
- Road frequency: lines 164, 198 (currently every 3rd row, adjust modulo value)

**Changing Visual Style**
- Road appearance: `draw3DRoad()` line 348
- Grass appearance: `draw3DGrass()` line 381
- Player character: `drawChicken()` line 858
- Sky gradient: lines 282-285
- Color schemes: vehicle colors array line 228

**Camera Behavior**
- Smoothness: adjust `lerpFactor` on line 256 (lower = smoother but slower)
- Camera target offset: adjust `(ROWS - 5)` on line 255 to change player vertical position on screen
