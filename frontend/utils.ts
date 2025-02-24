export const getRandomImage = (imageArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  }
  
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
  
export const capitalize = (str: string): string => {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}