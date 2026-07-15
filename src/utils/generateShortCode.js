const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateShortCode = (length = 7) => {
  let shortCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(
      Math.random() * characters.length
    );

    shortCode += characters[randomIndex];
  }

  return shortCode;
};