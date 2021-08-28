@echo off

set arg1=%1.

node deploy.js release

if %arg1% == release. goto deploy

firebase hosting:channel:deploy preview

:deploy
firebase deploy

:end