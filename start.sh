#!/bin/bash
# author : onedou@126.com
# date   : 2017.12.5
# desc   : start keepnote

device=$1

if [ -z $device ]; then
    device="web"
fi

if [ "$device" == "ios" ]; then
    sudo ionic cordova emulate ios -lc --target iPhone-8
elif [ "$device" == "android" ]; then
    dir=`which adb`
    android=${dir/platform-tools\/adb/}tools/android
    emulator=${dir/platform-tools\/adb/}tools/emulator

    device=`$android list avd | grep Name | sed -n 1p`
    device=${device/Name\: /}

    sudo $emulator -avd $device & sleep 15;sudo ionic cordova emulate android -lc
elif [ "$device" == "web" ]; then
    ionic serve
elif [ "$device" == "list" ]; then
    ionic cordova emulate --list
elif [ "$device" == "build" ]; then
    sudo ionic cordova build ios
else
    echo "not found!"
fi

exit 0;