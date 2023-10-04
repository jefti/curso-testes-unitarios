import { faker } from "@faker-js/faker";
import {jest} from '@jest/globals';
import { createOrder, getOrderByProtocol } from "../../src/order-service";
import { OrderInput } from "../../src/validator";
import * as orderRepository from "../../src/order-repository";

const createOrderSpy = jest.spyOn(orderRepository, "create");
const getOrderSpy = jest.spyOn(orderRepository, "getByProtocol");

createOrderSpy.mockImplementation((): any => {
  return {
     id: 1, 
      protocol: '12345', 
      status: 'IN_PREPARATION' }
  }
);

getOrderSpy.mockImplementation((protocol): any => {
  if(protocol === "invalid"){
    return {
      protocol,
      status: "INVALID"
    }
  }else{
    return {
      id: 1, 
      protocol: '12345', 
      status: 'IN_PREPARATION' 
    }
  }
});

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const orderInput: OrderInput = {client: 'teste', description: 'description'};
    const order = await createOrder(orderInput);
    expect(order).toBeDefined();
  });

  it("should return an order based on the protocol", async () => {
    const protocol = "12345";
    const order = await getOrderByProtocol(protocol);
    expect(order).toEqual(expect.objectContaining(
      {
        id: expect.any(Number),
        protocol: protocol,
        status: 'IN_PREPARATION'
      }
    ));
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    const protocol = "invalid";
    const order = await getOrderByProtocol(protocol);
    expect(order).toEqual(expect.objectContaining(
      {
        protocol: protocol,
        status:  "INVALID"
      }
    ));
  });
});