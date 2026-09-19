---
title: "Blocklayer"
description: "An isometric pixel-art level editor: lay tiles on a grid, raise and lower them, add ramps and stairs, and mark them with objects and icons, all in the browser."
date: "2026-09-17"
summary: "Lay out a small 3D level as pixel-art blocks seen from an isometric corner — raise columns with the scroll wheel, join levels with ramps and stairs, drop in chests and crystals, mark routes with arrows — then turn it, zoom it, and peel back its layers."
experiment: "blocklayer"
---

A level in a tile-based game is a grid of columns. Each column has a height, and a few of them carry something: a chest, a rock, a marker that tells the game what happens when you step there. This is a small editor for laying such a level out by hand and looking at it from all four corners.

The view is isometric pixel art. Every tile is a stack of blocks standing on the floor, as many blocks as its elevation, which runs from 0 to 7. A tile at 0 is flat: no blocks at all, only its top face lying on the floor. Colour is yours to choose, from a palette of ten: the seven of the rainbow, and three shades of grey. The palette is also the paint pot, so the colour you pick is the colour the next tile gets. A ramp or a flight of stairs joins a tile to the next level up on one of its sides. Objects stand on top &mdash; a chest, a rock, and three crystal pillars of different heights &mdash; and any tile can carry marks: arrows for the eight compass directions, and icons for a teleport, a rope, and a jump. The arrows point in world directions, so they turn with the view.

Editing is done with the mouse on the picture itself. A light grey grid rules the floor, so it is clear which cell the next tile goes in. Move over empty space and a `+` shows where a tile would go; click to place it, or drag to lay a run of them. Click a tile to select it, then use the scroll wheel to raise or lower it one step at a time. Hold the right button on a tile to remove it; the top fills red while you hold, and letting go early cancels. The buttons beside the picture do the rest for the selected tile: block, ramp, or stairs; which way the slope faces; its colour; one object; any number of marks.

The toolbar also drives the view: pan in the four compass directions, turn the level a quarter turn either way, zoom between one and four pixels per pixel, hide or show the elevation labels, the marks, and the objects, and make the tiles see-through so a tall column stops hiding what is behind it.

The keyboard does all of it too, once the picture has focus. Every button's tooltip names its key.

- The arrow keys pan, `[` and `]` turn the level, `-` and `=` zoom, and `Escape` drops the selection.
- `W` and `S` raise and lower the selected tile. With nothing selected they set the height that new tiles get, which the ghost and a small badge both show.
- `Shift+W` and `Shift+S` move the whole level a step. If one tile has no room, nothing moves at all, so the level keeps its shape.
- `A` and `D` turn a ramp or a flight of stairs to face the next side.
- `B`, `R` and `T` make the tile a block, a ramp or stairs.
- `1` to `5` put an object on the tile or take it off.
- `C` and `Shift+C` step the colour on and back through the palette, and paint the selected tile as they go.
- `X`, `Delete` and `Backspace` remove the selected tile.
- The marks are a compass rose under the right hand: `Y`, `U` and `I` for north-west, north and north-east, `H` and `K` for west and east, and `N`, `M` and `,` for south-west, south and south-east.
- `P`, `L` and `J` mark a teleport, a rope and a jump.

Everything is drawn on a canvas at the sprites' own scale and then scaled up by a whole number, so the pixels stay square at every zoom. The level saves itself to your browser's local storage after every change, so it is still there when you come back. Nothing leaves the page.
