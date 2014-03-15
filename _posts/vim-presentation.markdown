---
layout: default
title: Vim Presentation
---


{{ page.title }}
================

What is Vim?
------------
* History
* Modal Nature
Why would I want to use Vim?
----------------------------
* List of killer features
How to survive in Vim without freaking out and mashing Ctrl-C
-------------------------------------------------------------
* Entering insert mode
* Write some text
* Exiting insert mode
* Saving
* Quitting
Discussion on Modes (demonstrate with sample text)
--------------------------------------------------
* Start in Normal mode
* Enter Insert mode to write text
* Use normal mode for editing
* Visual mode to select text (also Visual Line and Visual Block)
* Command line mode (and Command History)
* Ex mode (Q to enter, :visual to exit)
* Overwrite mode (R) 
* Normal Mode
Why on earth do you need or want normal mode?
----------------------------------------------
* Normal mode is where Vim’s power is
* Quick, fluent movement throughout the file
* Small set of operators that, when combined with movements turn in to super powers
Movement (open up file to follow along)
---------------------------------------
* h, j, k, l (might be beneficial to cover gj and gk as well)
* w, e, b, ge (W, E, B, gE)
* f, t (F, T), ; ,
* gg, G
* ^, $
* %
Operators
---------
* d, dd, dw, x
* p, P
* y, yy, y$
* c, s
* r, R
* gu, gU, ~
Text Objects (open pantry app for demo)
---------------------------------------
* i vs. a
* () {} [] <>
* “” ‘’ ``
* t
Searching
---------
* / ?
* n N
* * #
Regex capabilities
------------------
* :s/re/gex/{gci}
* Your .vimrc (open up new .vimrc)
* set nocompatible
* syntax on
* tab width stuff
Extensions
----------
* tpope/vim-surround
* tpope/vim-fugitive
* kien/ctrlp.vim
* Plugin management with Vundle
* NERDTree
Further Resources
-----------------
* vimcasts.org
* Practical Vim by Drew Neil
* vim-adventures.com (first level free)
* Vimium
* Vim emulation for many editors and IDEs


