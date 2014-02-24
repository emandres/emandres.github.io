---
layout: default
title: Creating documents in RavenDB with Collection Specific IDs
---

Creating Documents in RavenDB with Collection Specifc IDs
================================================

<strong>TL;DR</strong>: When dealing with RavenDB's HTTP API, you can create a new document under a specific collection using `PUT`, rather than `POST`.

I was bashing my head against a wall this morning trying to figure out how to make RavenDB's HTTP API create a document with a collection specific ID (e.g. pages/1). I kept trying to do something along the lines of 

    curl -X POST http://localhost:4567/databases/books/docs/pages

However, this fails with "Could not figure out what to do". So that didn't work. I tried all sort of permutations on this, such as adding the ID in the document JSON like you can do in the .Net API. Nothing.

Finally, I decided to try a `PUT` instead of a `POST`.

    curl -X PUT http://localhost:4567/databases/boks/docs/pages/

Success! Note that the trailing slash is necessary. Otherwise, you'll get a document named pages.
