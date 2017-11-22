'use strict';

// Import lib
const fs = require('fs');
const arch = require('arch');
const path = require('path');
const spawn = require('child_process').spawn;

// Variable declaration
const x64 = arch() === 'x64';
const adodb = path.join(__dirname, 'ado.js');
const sysroot = process.env['systemroot'] || process.env['windir'];
const cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// Exec commond
const stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', '//U', '//B'], { windowsHide: true });

// Stdout
stdio.stdout.on('data', data => {
  console.log(data.toString('utf16le'));
});

// Stderr
stdio.stderr.on('data', data => {
  console.error(data.toString('utf16le'));
});

// Exec error
stdio.on('error', error => {
  console.error(data.toString());
});
