const otpMap = new Map();

function setOtp(email, otp, ttlSeconds = 300, purpose = "auth", basicInfo = {}) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  otpMap.set(email, { otp, expiresAt, purpose, basicInfo });
}

function getOtp(email) {
  const entry = otpMap.get(email);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    otpMap.delete(email);
    return null;
  }
  return entry;
}

function deleteOtp(email) {
  otpMap.delete(email);
}

module.exports = { setOtp, getOtp, deleteOtp };
