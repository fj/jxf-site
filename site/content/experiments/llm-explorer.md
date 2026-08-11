---
title: "LLM Explorer"
description: "An interactive scatter plot for comparing large language models on cost and speed."
date: "2026-06-27"
summary: "Plot popular language models by blended cost and output speed, then bend the assumptions — workload mix, request size, cache hit rate — to see how the trade-offs shift."
weight: 1
experiment: "llm-explorer"
---

Every language model sits somewhere on a trade-off between **how much it costs**
and how fast it answers &mdash; and where it lands depends entirely on what
you're asking it to do. A model that looks expensive for a chatbot can be a
bargain for summarizing a long document, because the two jobs spend their tokens
very differently.

This explorer plots popular models against each other. Pick a **scenario** to set
sensible defaults, or open **Advanced** to bend the assumptions yourself: the mix
of input vs. output tokens, the size of a request, and how much of the input is
served from cache. The points slide as you go.
