const isEmptyObject = (obj) =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export default isEmptyObject;
