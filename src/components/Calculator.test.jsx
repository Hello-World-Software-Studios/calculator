import Calculator from "./Calculator";

it("should say you need 7 studs from 96 inches", () => {
  render(<Calculator />);
  expect(listOfMeasurements.length).toBe(7);
});
