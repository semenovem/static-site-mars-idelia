#!/bin/bash

# chmod ug+x scripts/deploy.sh
# запускать из корня проекта todo приделать проверку места запуска

BRANCH='gh-pages'
COMMIT=$(git rev-parse HEAD)
SMALL_HASH_COMMIT=${COMMIT:0:6}
FILE='_config.yml'

# добавить hash коммита в переменные
find $FILE -type f -exec sed -i "" "s/short_hash_commit:.*/short_hash_commit: $SMALL_HASH_COMMIT/" {} \;

### сборка проекта
npm run-script build

git checkout -- _config.yml

cp .gitignore _dist/

### переключиться на ветку gh-pages
if git checkout ${BRANCH} ; then
  echo ok
else
  echo "Не удалось переключиться на ветку: $BRANCH"
  exit 1;
fi


### сбросить изменения к состоянию удаленной ветки, что бы не было конфликтов
git reset --hard origin/${BRANCH}

cp _dist/.gitignore ./


### отчистить директорию, кроме скрытых и _dist
find * -not -path "_dist/*" -not -path "_site/*" -not -path "node_modules/*" -delete


### перенести  файлы из _dist в корень проекта ./
mv -f ./_dist/* ./


git add .
git commit -m ${COMMIT}
git push
git checkout -
