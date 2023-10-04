import * as usersRepositories from "../../src/users-repository";
import * as infractionsRepository from "../../src/infractions-repository";
import { getInfractionsFrom } from "infractions-service";

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    jest.spyOn(usersRepositories, "getUserByDocument").mockImplementationOnce((licenseId: string):any=>{
      return {
        id: 0,
        firstName: 'john',
        lastName: 'Doe',
        licenseId 
      }
    });
    jest.spyOn(infractionsRepository, "getInfractionsFrom").mockImplementationOnce((userId: number):any=>{
      return [];
    });
    const licenseId = 'teste';
    const resp = await getInfractionsFrom(licenseId);
    expect(resp).toBe(expect.objectContaining({
      id: 0,
      firstName: 'john',
      lastName: 'Doe',
      licenseId,
      infractions: []
      })
    );
  });

  it("should throw an error when driver license does not exists", () => {
    jest.spyOn(usersRepositories, "getUserByDocument").mockImplementationOnce((licenseId: string):any=>{
      return {}
    });
    const licenseId = 'teste';
    const resp =  getInfractionsFrom(licenseId);
    expect(resp).toBe(expect.objectContaining(
      {type: "NOT_FOUND", message: "Driver not found."}
    ));
  })
});