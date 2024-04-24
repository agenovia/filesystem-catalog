import { readdir } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import NodeCache from 'node-cache';
import { request, response, application } from 'express';


const cache = NodeCache()



try {
  const tick = performance.now()
  const files = await readdir("K:\\Repository\\Agenovia_TEST", {recursive: true, withFileTypes: true});
  // [Symbol(type)]: 2 - Directory
  // [Symbol(type)]: 1 - File
  // for (const file of files)
  //   console.log(file);
  const tock = performance.now()
  console.log(`${(tock - tick) / 1_000} seconds`)
} catch (err) {
  console.error(err);
} 