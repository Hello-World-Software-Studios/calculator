import Calculator from "./Calculator";

it("should say you need 7 studs from 98 inches", () => {
  render(<Calculator wallLength="98" isImperialUnit="true" />);
  expect(listOfMeasurements.length).toBe(7);
});
