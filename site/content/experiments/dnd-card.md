---
title: "Player Card"
description: "A client-side player card generator for D&D 5.5E: fill in a character, add a picture, download a set of cards that print at 152 × 101 mm."
date: "2026-08-11"
summary: "Turn a character into a hand of cards you can hold — abilities, saves and skills beside a portrait, then what they carry, what they can do and what they can cast, rendered live on a canvas and downloaded print-ready."
experiment: "dnd-card"
---

A character sheet is a reference document. A *card* is a thing you put on the table, hand to a player, and pick up when it's your turn. This makes the second one out of the first: type in a character, frame a picture for the left third, and download a PNG.

One card holds a character's numbers, but a character is more than their numbers &mdash; they carry things, they can do things, and some of them cast. So a character has a *set* of cards. Beside the character card you can add inventory cards, features cards and spell cards, and page between them with a tab strip. Every card repeats the character card's header and puts its own name where that card keeps its badges, so one lying face-up on the table still says whose it is and which it is.

The card is 152&thinsp;&times;&thinsp;101&nbsp;mm printed at 300&nbsp;dpi &mdash; 1795&thinsp;&times;&thinsp;1193 pixels, landscape, near enough a 6&thinsp;&times;&thinsp;4 photo print. The download also carries that resolution inside the file, so print dialogs and photo services size it correctly instead of guessing 72&nbsp;dpi and giving you something four times too big.

Everything on the card that can be worked out is worked out. Type an ability score and its modifier follows; the level sets the proficiency bonus that saves and skills add; initiative is a Dexterity check, so it's whatever Dexterity says it is. Armor Class is the one combat number that isn't arithmetic &mdash; it comes off what you're wearing &mdash; so that one you type. The 2024 Player's Handbook lists &mdash; species, classes, subclasses, backgrounds &mdash; are suggestions on the fields rather than closed menus, so homebrew types straight in.

What *doesn't* get worked out is the half-dozen numbers that change during a session. Hit points, temporary hit points and hit dice are boxes with room to write in, not printed figures; leave one empty and it prints empty. They sit with the death saves and inspiration in a band above the ability scores, because that's the part of the card a hand reaches for mid-combat. The hit die is picked rather than inferred &mdash; multiclass characters have more than one &mdash; and the card draws the solid beside its name, so you can see whether you're reaching for the cube or the octahedron.

The top right corner holds the three numbers you want before anything else happens, each in a shape of its own: the proficiency bonus in a diamond, Armor Class in a shield, initiative in a triangle pointing the way you're about to go. Every other diamond on the card is empty, because it's there to be filled in &mdash; there are forty-two of them, and printing the same bonus inside each one says it forty-two times. Fill one on a saving throw, or one of a skill's two for proficiency and both for expertise. Circles are for tallies you keep during play &mdash; death saves and inspiration &mdash; so the shape alone tells you which kind of box you're looking at.

The other cards keep the same habit of leaving room rather than printing what you already know. An inventory card is ten items: a box to tick when something is equipped, a triangle to tick when it's attuned, a count, and the rest of the line for what the thing is. A features card is up to eight rows you add, remove and drag into the order you want them; a feature with three uses prints three empty boxes to tick off as you spend them, and a spellcasting row prints a level and its slots the same way. A spell card is ten spells, each marked with one of the eight schools of magic &mdash; drawn the way the dice are, once in a unit circle, so the same outline goes on the card and into the panel beside the picker.

The card is set in Fira Sans, with the name in a blackletter, and all three faces &mdash; name, headings, body &mdash; are yours to change. Those apply to every card in the set, which is why they sit above the tabs rather than inside any one card's controls.

When you're done you can take the card you're looking at on its own, every card as a `.tar.gz` holding one PNG each, or every card tiled into a single PNG.

Nothing leaves your browser, including the picture: it's read from the file you choose and drawn onto the canvas locally. The preview canvas *is* the output bitmap, so the download button just serializes what you're already looking at; the archive is packed in the page too, a tar written byte by byte and handed to the browser's own compressor.
