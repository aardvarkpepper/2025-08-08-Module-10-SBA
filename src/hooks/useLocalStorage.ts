import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedData, setStoredData] = useState<T>(initialValue);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    let initialData = initialValue;
    let hamster = true;
    if (storedData) {
      hamster = false;
      initialData = JSON.parse(storedData); // There are issues with Typescript using JSON.parse if storedData is a number or simple string such as 'ham'.  Though actually it can't be a number as it came from localStorage of course.  But anyways, it throws an error and stops execution, or so it seems.  But in this implementation there's no need to worry about these things, as it's being used with 'Favorites' which is always an array of strings that are re-casted numbers.  Er, object.
    }
    console.log(`uLS invoked, attempting to retrieve.  ${hamster ? 'No stored data.' : 'Stored data retrieved.'}`);
    setStoredData(initialData);
  }, []);

  // uses async so first data loads from localStorage using another useEffect, then this saves the data back to localStorage.
  useEffect(() => {
    setTimeout(() => {
      console.log(`uLS invoked, attempting to save.`);
      localStorage.setItem(key, JSON.stringify(storedData));
    }, 250)
  }, [storedData]);

  // const updateStoredData = (newValue: any) => {
  //   setStoredData(newValue);
  // }

  console.log(storedData);
  console.log(setStoredData);
  return [storedData, setStoredData] as const;
}