#!/usr/bin/env node
var arg = process.argv;
var fs =require("fs");
var log = require('../utils/log');
var hashFilesInDir = require('../lib/HashFileInDir');
var logFile = "log.txt";
var mergeFile = require("../lib/mergeFile.js");

var genDeps = require("../dep/genDeps.js");

if(arg.length>2){
    log.setLogConfig({logFileName:logFile});
    var currentPath =  fs.realpathSync('.');
    //分析依赖
    if(arg[2]=="min"){
        if(arg.length>3) {
            hashFilesInDir.hashFilesInDir(arg[3]);
        }else{
            hashFilesInDir.hashFilesInDir(currentPath);
        }

        //代码合并
    }else if(arg[2]=="merge"){

        if(arg.length>3){
            var st = fs.statSync(arg[3]);
            if( st.isFile() &&arg[3] =="merge.properties" ){
                mergeFile.mergeFile(arg[3]);
            }
            // 如果是目录则递归调用自身
            else if(st.isDirectory() ){
                mergeFile.mergeDirectory(arg[3]);
            }else{
                mergeFile.mergeLineConfig(arg[3])
            }
        }else{
            mergeFile.mergeDirectory(currentPath);
        }
    }else if(arg[2]=="dep"){
        if(arg.length>3){
            var dependencyObject = genDeps(arg[3]);
            console.log(dependencyObject.tree);
        }else{
            var dependencyObject = genDeps(currentPath);
            console.log(dependencyObject.tree);
        }
    }else if(arg[2]=="check"){

    }
}else{
    console.log("argments is error");
}