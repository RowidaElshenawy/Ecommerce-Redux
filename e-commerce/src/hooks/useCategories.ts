import { useEffect } from 'react';
import { actGetCategories, categoriesRecordsCleanup } from '@redux/categories/CategoriesSlice';
import { useAppDispatch, useAppSelector } from '@redux/hook';

const useCategories = () => {
     const dispatch = useAppDispatch()
  const {loading , error , records} = useAppSelector((state)=>state.categories)
 
   useEffect(() => {
    
      const promise =dispatch(actGetCategories());
      return ()=>{
        dispatch(categoriesRecordsCleanup());
        promise.abort();
      }
  }, [dispatch]);
  return {loading,error,records}
}

export default useCategories
