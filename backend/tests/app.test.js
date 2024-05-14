const request = require('supertest')
const app = require('../src/app')
test('Current login implementation should always succeed', async () => {
    const res = await request(app)
        .post('/login')
        .send({
            username: "admin",
            password: 'test is cool',
        })
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBe('mytoken');
});

const VALID_PYTHON_CODE = 'print("Hello")'
test('Valid python code should be executed and provide valid output', async () => {
    const res = await request(app)
        .post('/run')
        .send({
            language: "python",
            code: VALID_PYTHON_CODE,
        })
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('output');
    expect(res.body.output).toEqual(expect.stringContaining("Hello"));
});

test('Invalid language should generate an error', async () => {
    const res = await request(app)
        .post('/run')
        .send({
            language: "unknownlanguage",
            code: VALID_PYTHON_CODE,
        })
    expect(res.statusCode).toEqual(422);
});