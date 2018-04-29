#!/usr/bin/env bash

NODE_ENV=production yarn build
git add -A && git commit -m "Deploy - `date`"
git push production master