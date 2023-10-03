import { boolean, string } from "joi";
import { generateProtocolForPacient } from "protocols-generator";


jest.mock("uuid",()=>{
  return {
    v4: () => {return "voucher gerado pelo mock"}
  }
})
describe("protocol generator test", () => {
  it("should generate a protocol for pacient", async () => {
    const object = generateProtocolForPacient('joão','pessoa',false);
    expect(object.priority).toEqual(expect.any(Boolean));
    expect(object.date).toEqual(expect.any(Date));
    expect(object.pacient).toEqual(expect.any(String));
    expect(object.protocol).toEqual(expect.any(String));
  });
});