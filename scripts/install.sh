#!/bin/bash
set -e

echoerr() { echo -e "\n$@\n" 1>&2; }

if [ -z ${HOME+x} ]; then
  echoerr "\$HOME is unset, you need to have this variable to use this installer.";
  exit 1
fi

if [ "$(uname)" == "Darwin" ]; then
  OS=macos
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
cd $HOME/.local/bin


VER=$(curl --silent -qI https://github.com/atalent-labs/human-web-token/releases/latest | awk -F '/' '/^location/ {print  substr($NF, 1, length($NF)-1)}');
URL="https://github.com/atalent-labs/human-web-token/releases/download/$VER/hwt.tar.gz"
TAR_ARGS="xz"

echo "Installing CLI from $URL"
if [ $(command -v curl) ]; then
  curl -L --silent  "$URL" | tar "$TAR_ARGS"
else
  wget -O- "$URL" | tar "$TAR_ARGS"
fi


# delete old hwt bin if exists
rm -f $(command -v hwt) || true
rm -f $HOME/.local/bin/hwt

cp ./dist/hwt-$OS hwt

rm -rf ./dist

if [[ ! ":$PATH:" == *":$HOME/.local/bin:"* ]]; then
  echoerr "HWT has been installed but your path is missing $HOME/.local/bin, you need to add this to use HWT CLI."
else
  # test the CLI
  LOCATION=$(command -v hwt)
  echo "hwt installed to $LOCATION"
  hwt -v
fi
