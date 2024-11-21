const addNumbers =  (num1, num2 ) =>{
    return num1 + num2;
}

describe('is equal', () => {
    it('should return true', () => {
        expect(1).toBe(1);
    })
    it('should return false', () => {
        expect(false).toBe(false);
    })
    it('should return false', () => {
        expect(addNumbers(5,50)).toEqual(55);
    })
})
