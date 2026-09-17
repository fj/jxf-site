---
title: "Blocklayer"
description: "An isometric pixel-art level editor: lay tiles on a grid, raise and lower them, add ramps and stairs, and mark them with objects and icons, all in the browser."
date: "2026-09-17"
summary: "Lay out a small 3D level as pixel-art blocks seen from an isometric corner — raise columns with the scroll wheel, join levels with ramps and stairs, drop in chests and crystals, mark routes with arrows — then turn it, zoom it, and peel back its layers."
experiment: "blocklayer"
---

A level in a tile-based game is a grid of columns. Each column has a height, and a few of them carry something: a chest, a rock, a marker that tells the game what happens when you step there. This is a small editor for laying such a level out by hand and looking at it from all four corners.

The view is isometric pixel art. Every tile is a stack of blocks rising from the floor to its elevation, which runs from -3 to +3. Height is also colour: low tiles are blue, ground is green, and the highest are orange, so a level reads at a glance without its labels. A ramp or a flight of stairs joins a tile to the next level up on one of its sides. Objects stand on top &mdash; a chest, a rock, and three crystal pillars of different heights &mdash; and any tile can carry marks: arrows for the eight compass directions, and icons for a teleport, a rope, and a jump. The arrows point in world directions, so they turn with the view.

Editing is done with the mouse on the picture itself. Move over empty space and a `+` shows where a tile would go; click to place it, or drag to lay a run of them. Click a tile to select it, then use the scroll wheel to raise or lower it one step at a time. Hold the right button on a tile to remove it; the top fills red while you hold, and letting go early cancels. The buttons beside the picture do the rest for the selected tile: block, ramp, or stairs; which way the slope faces; one object; any number of marks.

The toolbar also drives the view: pan in the four compass directions, turn the level a quarter turn either way, zoom between one and four pixels per pixel, hide or show the elevation labels, the marks, and the objects, and make the tiles see-through so a tall column stops hiding what is behind it. The arrow keys, `[` and `]`, and `-` and `=` do the same from the keyboard once the picture has focus.

Everything is drawn on a canvas at the sprites' own scale and then scaled up by a whole number, so the pixels stay square at every zoom. The level saves itself to your browser's local storage after every change, so it is still there when you come back. Nothing leaves the page.
