#!/bin/bash
rm dist_$1.zip
cd dist_$1
zip -r dist_$1.zip *
cd ..
mv dist_$1/dist_$1.zip dist_$1.zip