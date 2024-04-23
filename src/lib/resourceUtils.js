import resources from './resources';

// Returns an array of strings containing resource labels.
const getResourceList = () =>
  Object.keys(resources[0]).filter((label) =>
    Array.isArray(resources[0][label]),
  );

// Returns a colour string to be displayed in a range.
const getResourceColour = (step = 0, steps = 0) =>
  `oklch(${60 + (step % 2 ? 0 : 30)}% ${
    0.15 + (step % 2 ? 0.05 : 0)
  } ${(360 / steps) * step})`;

export { getResourceList, getResourceColour };
