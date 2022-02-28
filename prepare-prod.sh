#! /bin/bash

# Скрипт для сборки продакшн версии сайта

# Название директории, в которую будет помещена сборка
dir="build-prod"

rm -rf $dir
mkdir $dir
cp -r __sapper__/build/* $dir
cp -r static/* $dir
cp package*.json $dir
sed -i -e 's/__sapper__\/build/./g' $dir/server/server.js
rm $dir/server/server.js-e
echo "Production version is ready in $dir directory"