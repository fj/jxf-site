---
title: "Quote Card"
description: "A client-side PNG quote generator: write a quote in Markdown, style the card, download the image."
date: "2026-07-03"
summary: "Turn a snippet of Markdown into a downloadable PNG quote card — font, borders, shadows, and colors tuned live on a canvas, rendered entirely in your browser."
weight: 2
experiment: "quote-card"
---

Sometimes a quote deserves better than a screenshot of a text file. This tool
turns a few lines of **Markdown** &mdash; bold, italics, inline `code` &mdash;
into a finished PNG: pick a font, wrap it in a border (solid, dashed, dotted,
double, or wavy), style the attribution separately, tune the colors and shadow,
and download the result. If sliders feel indirect, every styling group has an
advanced mode (the &#129489;&#8205;&#128187; button) that lets you edit that
part of the card as plain CSS &mdash; including things the sliders can't
express, like any font on your system or a `transform`.

Everything happens in your browser. The preview canvas *is* the output bitmap
at the resolution you choose &mdash; sized for a Bluesky feed image by default,
or anything up to 4096&thinsp;&times;&thinsp;4096 &mdash; so what you see is
pixel-for-pixel what you download. Nothing you type ever leaves the page.
