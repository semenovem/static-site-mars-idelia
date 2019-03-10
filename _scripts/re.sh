#!/bin/bash

# usage
# bash ../../_scripts/re.sh 001.jpg xs sm md lg xl

if [ ! -n "$1" ]
then
  echo "No parameters found. "
  exit 1
fi

FILE=$1
FILE_EXT=${FILE##*.}
FILE_NAME=${FILE%.*}

if [ ! -f ${FILE} ]
then
  echo "The $FILE file does not exist"
  exit 1
fi

shift

for param in "$@"
do
  SUFFIX="w$param"

  if [ ${param} = "xxs" ]; then param=100; SUFFIX=xxs; fi
  if [ ${param} = "xs" ]; then param=300; SUFFIX=xs; fi

  if [ ${param} = "sm" ]; then param=600; SUFFIX=sm; fi
  if [ ${param} = "md" ]; then param=800; SUFFIX=md; fi
  if [ ${param} = "lg" ]; then param=1000; SUFFIX=lg; fi
  if [ ${param} = "xl" ]; then param=1300; SUFFIX=xl; fi

  if [ ${param} = "xxl" ]; then param=1600; SUFFIX=xl; fi

  NEW_FILE="$FILE_NAME--$SUFFIX.$FILE_EXT"

  echo ${FILE}
  echo ${NEW_FILE}
  magick ${FILE} -resize ${param} ${NEW_FILE}

  count=$(( $count + 1 ))
done
