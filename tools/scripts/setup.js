const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');
const addCheckMark = require('./helpers/checkmark');
const animateProgress = require('./helpers/progress');
const addXMark = require('./helpers/xmark');
const packageFile = 'package.json';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval = -1;

// remove file
function deleteFileInCurrentDir(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, file), err => reject(new Error(err)));
    resolve();
  });
}

// remove git
function cleanCurrentRepository() {
  return new Promise((resolve, reject) => {
    try {
      shell.rm('-rf', '.git/');
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

// git init
function initGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git init', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

// git add
function addToGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git add .', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

// git commit
function commitToGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git commit -am "init commit"', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

// end process
function endProcess() {
  clearInterval(interval);
  process.stdout.write(chalk.blue('\n\nDone!\n'));
  process.exit(0);
}

// yarn install
function installPackages() {
  return new Promise((resolve, reject) => {
    process.stdout.write('\n   Installing dependencies..');

    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress('  Installing dependencies');
    }, 500);

    exec('yarn', err => {
      if (err) {
        reportError(err);
        reject(new Error(err));
      }

      clearInterval(interval);
      addCheckMark();
      resolve('Packages installed');
    });
  });
}

// report error and exit
function reportError(error) {
  clearInterval(interval);
  if (error) {
    process.stdout.write('\n\n');
    addXMark(() => process.stderr.write(chalk.red(` ${error}\n`)));
    process.exit(1);
  }
}

// change package project name
function changePackageName() {
  return new Promise(resolve => {
    process.stdout.write('\nProject Name:');
    process.stdin.resume();
    process.stdin.on('data', pData => {
      const answer =
        pData
          .toString()
          .trim()
          .toLowerCase() || 'new_project';
      resolve(answer);
    });
  });
}

// rewrite name
function rewriteName(answer) {
  process.stdout.write('\n');
  shell.sed('-i', 'web-boilerplate', answer, packageFile);
}

/**
 * Run
 */
(async () => {
  // 1, remove
  const repoRemoved = await cleanCurrentRepository().catch(reason =>
    reportError(reason),
  );
  // 2, install package
  await installPackages().catch(reason => reportError(reason));

  // 3. changed package name
  const newProjectName = await changePackageName();

  // 4, run git init
  if (repoRemoved && newProjectName) {
    process.stdout.write('\n');
    interval = animateProgress('Init new repository');
    process.stdout.write('Init new repository');

    try {
      await rewriteName(newProjectName);
      await deleteFileInCurrentDir('setup.js').catch(reason =>
        reportError(reason),
      );
      await initGitRepository();
      await addToGitRepository();
      await commitToGitRepository();
    } catch (err) {
      reportError(err);
    }
    clearInterval(interval);
  }

  endProcess();
})();
