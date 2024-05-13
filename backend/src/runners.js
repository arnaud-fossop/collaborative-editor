const temp = require('temp').track();
const path = require('path');
const { spawn } = require("child_process");
const fs = require('fs');

const extensions = {
    "python": "py",
    "javascript": "js"
}

/**
 * Save code in a temporary file
 * @param code: code provided by the user
 * @returns: Promise allowing to manipulate the created temporary file
 */
function saveCodeTempFile(code, language) {
    return new Promise((resolve, reject) => {
        temp.mkdir('code-editor', (err, dirPath) => {
            var codeFilePath = path.join(dirPath, `code.${extensions[language]}`)
            if (err) {
                reject(err);
                return;
            }
            fs.writeFile(codeFilePath, code, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(codeFilePath);
                }
            });
        });
    });
}

/**
 * Promisify a child process
 * 
 * @param child process
 * @returns Promise resolving when the child process terminates
 */
function promiseFromChildProcess(child) {
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);
        child.addListener("exit", resolve);
    });
}

module.exports = {
    /**
     * Python Runner
     * @param {string} code - Python code to execute
     * @param {function} setOutput - Call back to retrieve the output
     * @returns 
     */
    pythonRunner: (language, code, setOutput) => {
        resolve = async (codeFilePath) => {
            console.log(codeFilePath);
            dirPath = path.dirname(codeFilePath)
            output = "";
            var runnerProcess = null;
            switch (language) {
                case "python":
                    runnerProcess = spawn("python", [codeFilePath]);
                    break;
                case "javascript":
                    runnerProcess = spawn("node", [codeFilePath]);
                    break;
            }

            promise = promiseFromChildProcess(runnerProcess).then(function (result) {
                console.log('promise complete: ' + result);
                setOutput(output.replace(dirPath, ""));
                temp.cleanup();
            }, function (err) {
                console.log('promise rejected: ' + err);
                setOutput(output.replace(dirPath, ""));
                temp.cleanup();
            });

            runnerProcess.stdout.setEncoding("utf8");
            runnerProcess.stdout.on("data", data => {
                output += data;
            });
            runnerProcess.stderr.on("data", data => {
                output += data;
            });

            runnerProcess.stdout.on("end", data => {
                console.log("Closing connection.");
            });
            await promise;
        }

        promise = new saveCodeTempFile(code, language).then(resolve, (err) => {
            console.log("An error occured");
            console.log(err)
        })

        return promise;
    }
}