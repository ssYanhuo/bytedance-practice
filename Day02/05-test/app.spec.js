const add = require('./add')

test('Should 1 + 1 = 2', () => {
    const a = 1
    const b = 1
    const r = add(a, b)
    expect(r).toBe(2)
})