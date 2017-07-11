

const { spawn } = require('child_process');

if (process.argv.length !== 3) {
    throw ('expect command: npm run review-pr -- 2')
}

const pr_id = process.argv[2]

const commands = {
    'Get PR branch': `git fetch origin pull/${pr_id}/head:pr-${pr_id}`,
    'Checkout PR': `git checkout pr-${pr_id}`,
    'Run Unit Tests': "npm run test:no-report"
}

let resultKeys = Object.keys(commands);
let results = []


const start = () => {
    return new Promise((resolve, reject) => {
        console.log(`🤖  Loading PR ${pr_id}`)
        resolve((true))
    });
}

const run_command = (cmd) => {
    return new Promise((resolve, reject) => {

        let splitCmd = cmd.split(' ');

        const ls = spawn(splitCmd[0], splitCmd.splice(1));

        ls.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        ls.on('close', (code) => {
            // console.log(`child process exited with code ${code}`);
            results.push(code === 0);
            resolve(code);
        });
    });
}

const run_all = (cmds) => {
    let promises = [];
    resultKeys.forEach((key) => {
        promises.push(run_command(cmds[key]))
    })
    return Promise.all(promises)
}

start()
    .then(() => {
        return run_all(commands)
    })
    .then(() => {
        console.log('👾  Done.')
        resultKeys.forEach( (k, i) => {
            console.log(results[i] ? '💚' : '💔', '\t', k)
        });
        console.log('\n');
    })