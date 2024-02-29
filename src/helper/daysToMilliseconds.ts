

export const daysToMilliseconds = ( days: number ) => {
  const daysToHours: number = days * 24;
  const hours: number = 60;
  const seconds: number = 60;
  const milliseconds: number = 1000;
  
  return ( ( daysToHours * hours ) * seconds) * milliseconds;
}