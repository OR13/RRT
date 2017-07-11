

const { spawn } = require('child_process');

if (process.argv.length !== 3) {
    throw ('expect command: npm run review-pr -- 2')
}

const pr_id = process.argv[2]


const required_commands = {
    'Get PR branch': `git fetch origin pull/${pr_id}/head:pr-${pr_id}`,
    'Checkout PR': `git checkout pr-${pr_id}`,
}
const commands = {
    'Run Unit Tests': "npm run test",
    'Run Integration Tests': "npm run int-test",
    // 'Run Linter': "ruby ./tools/tslint_changed.rb pr-${pr_id} #{branch_compare}"
}


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
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
        });
    });
}


start()
    .then(() => {
        return run_command(required_commands['Get PR branch'])
    })
    .then(() => {
        return run_command(required_commands['Checkout PR'])
    })
    .then((data) => {
        console.log('👾  Done.')
    })