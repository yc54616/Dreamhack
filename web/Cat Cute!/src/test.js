import { dlopen } from 'node:process';
import { constants } from 'node:os';
import { fileURLToPath } from 'node:url';

const module = { exports: {} };
dlopen(module, "/home/yc54616/workspace/Dreamhack/web/Cat Cute!/src/test.c",
       constants.dlopen.RTLD_LAZY);
module.exports.foo();