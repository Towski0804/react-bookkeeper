#!/usr/bin/env bash
rm -rf dist
pnpm run build
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:Towski0804/react-mangosteen-1.git
git push -f origin master:master
cd -
