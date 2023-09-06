function stringLimiter(str, limit = 100) {
  if (str.length <= limit) return str;
  const res = str.slice(0, limit).split(" ");
  res.pop();
  return `${res.join(" ")}...`;
}

export default { stringLimiter };
