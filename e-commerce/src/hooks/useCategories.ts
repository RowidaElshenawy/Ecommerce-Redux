import { useEffect } from 'react';
import { actGetCategories, categoriesRecordsCleanup } from 'src/redux/categories/CategoriesSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';

const useCategories = () => {
     const dispatch = useAppDispatch()
  const {loading , error , records} = useAppSelector((state)=>state.categories)
 
   useEffect(() => {
    
      dispatch(actGetCategories());
      return ()=>{
        dispatch(categoriesRecordsCleanup())
      }
  }, [dispatch]);
  return {loading,error,records}
}

export default useCategories
