import calculator from "calculator";

describe("calculator tests", () => {
  it("Should return sum", async () => {
    const num1 = generateNumber(1,100);
    const num2 = generateNumber(1,100);
    const resp = calculator.sum(num1,num2);
    expect(resp).toBe(num1+num2);
  });
  it("Should return subtraction", async () => {
    const num1 = generateNumber(10,100);
    const num2 = generateNumber(1,9);
    const resp = calculator.sub(num1,num2);
    expect(resp).toBe(num1-num2);
  });
  it("Should return mutiplication", async () => {
    const num1 = generateNumber(1,100);
    const num2 = generateNumber(1,100);
    const resp = calculator.mul(num1,num2);
    expect(resp).toBe(num1*num2);
  });
  it("Should return division", async () => {
    const num1 = generateNumber(1,100);
    const num2 = generateNumber(1,100);
    const resp = calculator.div(num1,num2);
    expect(resp).toBe(num1/num2);
  });
  it("Should return 0 if num2 is equal to zero", async () => {
    const num1 = generateNumber(1,100);
    const num2 = 0;
    const resp = calculator.div(num1,num2);
    expect(resp).toBe(0);
  });
})

function generateNumber(min:number, max:number):number{
  const resp = Math.floor((Math.random()*(max-min+1)) + min);
  return resp;
}