#!/bin/bash
set -e

echoerr() { echo -e "\n$@\n" 1>&2; }

if [ -z ${HOME+x} ]; then
  echoerr "\$HOME is unset, you need to have this variable to use this installer.";
  exit 1
fi

if [ "$(uname)" == "Darwin" ]; then
  OS=darwin
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  OS=linux
else
  echoerr "This installer is only supported on Linux and MacOS"
  exit 1
fi

ARCH="$(uname -m)"
if [ "$ARCH" == "x86_64" ]; then
  ARCH=x64
fi

mkdir -p $HOME/.local/bin
mkdir -p $HOME/.local/lib
cd $HOME/.local/lib

# @TODO

