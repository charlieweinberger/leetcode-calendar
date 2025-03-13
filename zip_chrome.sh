#!/bin/bash
rm dist_chrome.zip
cd dist_chrome
zip -r dist_chrome.zip *
cd ..
mv dist_chrome/dist_chrome.zip dist_chrome.zip