#/bin/bash

cd ./notes
npm run build
cd ..
cd main_site
rm -rf build
mv ../notes/build .
python3 app.py
