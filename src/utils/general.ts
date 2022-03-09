const minutesToSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remaingSeconds = Math.floor(seconds % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    remaingSeconds < 10 ? `0${remaingSeconds}` : remaingSeconds
  }`;
};

export { minutesToSeconds };
