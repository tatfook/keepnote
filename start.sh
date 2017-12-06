#!/bin/bash
# author : onedou@126.com
# date   : 2017.12.5
# desc   : start keepnote

device=$1

if [ -z $device ]; then
    device="web"
fi

if [ "$device" == "ios" ]; then
    ionic cordova emulate ios -lc --target iPhone-8
elif [ "$device" == "android" ]; then
    #ionic cordova emulate android -lc --target iPhone-8
    echo "android"
elif [ "$device" == "web" ]; then
    ionic serve
elif [ "$device" == "list" ]; then
    ionic cordova emulate --list
fi

exit 0;