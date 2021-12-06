export const testText = function (value, length) {
  if (value.length < length) {
    return false;
  } else {
    return true;
  }
};

export const testEmailAddress = function (emailAddress) {
  const regexString =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexString.test(emailAddress);
};
