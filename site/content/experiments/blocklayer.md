---
title: "Blocklayer"
description: "An isometric pixel-art level editor: lay tiles on a grid, raise and lower them, add ramps and stairs, and mark them with objects and icons, all in the browser."
date: "2026-09-17"
summary: "Lay out a small 3D level as pixel-art blocks seen from an isometric corner — raise columns with the scroll wheel, join levels with ramps and stairs, drop in chests and crystals, mark routes with arrows — then turn it, zoom it, and peel back its layers."
experiment: "blocklayer"
---

A level in a tile-based game is a grid of columns. Each column has a height, and a few of them carry something: a chest, a rock, a marker that tells the game what happens when you step there. This is a small editor for laying such a level out by hand and looking at it from all four corners.

The view is isometric pixel art. Every tile is a stack of blocks standing on the floor, as many blocks as its elevation, which runs from 0 to 7. A tile at 0 is flat: no blocks at all, only its top face lying on the floor. Colour is yours to choose, from a palette of ten: the seven of the rainbow, and three shades of grey. The palette is also the paint pot, so the colour you pick is the colour the next tile gets. A ramp or a flight of stairs joins a tile to the next level up on one of its sides. Objects stand on top &mdash; a chest, a rock, three crystal pillars of different heights, and a switch with a lever &mdash; and any tile can carry marks: arrows for the eight compass directions, and icons for a teleport, a rope, and a jump. The arrows point in world directions, so they turn with the view.

The level has edges. The board is so many tiles across and so many down, set in the two boxes under the picture, and a light grey grid rules its floor so it is clear which cell the next tile goes in. Tiles live only on the board, and a board that shrinks under the tiles standing on it asks first: a dialog says how many would go, and it is that or nothing. The view can wander past the edge, but never by more than half of what you are looking through, so some of the board is always in sight.

Editing is done with the mouse on the picture itself. Move over empty space and a `+` shows where a tile would go; click to place it, or drag to lay a run of them. The `+` follows the floor, so a cell walled in on four sides, whose floor no longer shows, can still be filled. Click a tile to select it, then use the scroll wheel to raise or lower it one step at a time. More than one tile can be selected at once: `Ctrl` with a click, or `Cmd` on a Mac, puts a tile in the selection or takes it out again, and `Shift` with a drag sweeps a box over the level and takes in everything under it. Every edit then applies to the whole selection: its colour, its height, its shape, which way its slopes face, its objects, its marks, and its removal. A right click away from the selection drops it. Hold `Alt` and point at a tile to read what it is: its elevation, its colour, its shape, and the object it carries. Hold the right button on a tile to remove it; the top fills red while you hold, and letting go early cancels. Drag with the right button held and the level moves with the pointer instead, which takes the removal back. The buttons beside the picture do the rest for the selected tile: block, ramp, or stairs; which way the slope faces; its colour; one object; any number of marks.

The toolbar also drives the view: pan in the four compass directions, turn the level a quarter turn either way, zoom between one and four pixels per pixel, hide or show the elevation labels, the marks, and the objects, and make the tiles see-through so a tall column stops hiding what is behind it. A see-through level also changes what the pointer means: it reads the floor, so the cell under the pointer answers even when a column stands in front of it, and the tile it finds pulses magenta twice a second.

The keyboard does all of it too, once the picture has focus. Every button's tooltip names its key.

- The arrow keys pan, `[` and `]` turn the level, `-` and `=` zoom, and `Escape` drops the selection.
- `W` and `S` raise and lower the selection, which moves as one body: if a single tile has no room, none of them moves. With nothing selected they set the height that new tiles get, which the ghost and a small badge both show.
- `Shift+W` and `Shift+S` move the whole level a step. If one tile has no room, nothing moves at all, so the level keeps its shape.
- `A` and `D` turn a ramp or a flight of stairs to face the next side.
- `B`, `R` and `T` make the tile a block, a ramp or stairs.
- `1` to `6` put an object on the tile or take it off.
- `C` and `Shift+C` step the colour on and back through the palette, and paint the selected tile as they go.
- `X`, `Delete` and `Backspace` remove every selected tile.
- The marks are a compass rose under the right hand: `Y`, `U` and `I` for north-west, north and north-east, `H` and `K` for west and east, and `N`, `M` and `,` for south-west, south and south-east.
- `P`, `L` and `J` mark a teleport, a rope and a jump.

Everything is drawn on a canvas at the sprites' own scale and then scaled up by a whole number, so the pixels stay square at every zoom. The level saves itself to your browser's local storage after every change, so it is still there when you come back. Nothing leaves the page.
