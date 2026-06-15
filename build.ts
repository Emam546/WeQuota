/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra'
import childProcess from 'child_process'

/**
 * Start
 */
;(async () => {
  try {
    // Remove current build
    console.log('Removing ./dist')
    await remove('./dist/')
    // Copy back-end files
    console.log('Building server with tsconfig.prod.json')
    await exec('tsc --build tsconfig.prod.json', './')
    console.log('Finished building server into ./dist')
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
})()

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
  return fs.remove(loc)
}

/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (stdout) {
        console.log(stdout)
      }
      if (stderr) {
        console.warn(stderr)
      }
      return err ? rej(err) : res()
    })
  })
}
