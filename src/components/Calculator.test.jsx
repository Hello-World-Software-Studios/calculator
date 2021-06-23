import Calculator from "./calculator";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Should say you need 7 studs from 98 inches', () => {
    act(() => {
        render(<Calculator wallLength="98" isImperialUnit="true"/>, container);
      });
    expect(listOfMeasurements.length).toBe(7);
  });