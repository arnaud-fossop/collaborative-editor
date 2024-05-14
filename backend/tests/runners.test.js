const runner = require('../src/runners').runner


const VALID_PYTHON_CODE = 'print("Hello")'
const INVALID_PYTHON_CODE = 'for i in'
test('Valid python code should be executed and provide valid output', async () => {
    let valid_output = null

    promise = runner("python", VALID_PYTHON_CODE, (output) => { valid_output = output })
    await promise;
    expect(valid_output).toEqual(expect.stringContaining("Hello"));
});

test('invalid python code should be executed and return an error', async () => {
    let valid_output = null

    promise = runner("python", INVALID_PYTHON_CODE, (output) => { valid_output = output })
    await promise;
    expect(valid_output).toEqual(expect.stringContaining("SyntaxError: invalid syntax"));
});

const VALID_NODE_CODE = 'console.log("Hello")'
const INVALID_NODE_CODE = 'for i in'
test('Valid Javascript code should be executed and provide valid output', async () => {
    let valid_output = null

    promise = runner("javascript", VALID_NODE_CODE, (output) => { valid_output = output })
    await promise;
    expect(valid_output).toEqual(expect.stringContaining("Hello"));
});

test('Invalid Javascript code should be executed and return an error', async () => {
    let valid_output = null

    promise = runner("javascript", INVALID_NODE_CODE, (output) => { valid_output = output })
    await promise;
    expect(valid_output).toEqual(expect.stringContaining("SyntaxError: Unexpected identifier"));
});

test('Invalid language should generate an error', async () => {
    expect(() => {
        runner("unknownlanguage", "My Code", (output) => { console.log(output) })
    }
    ).toThrow();
})