
import { TLoading } from '@types';



interface LoadingProps {
    loading:TLoading;
    error:null|string;
    children:React.ReactNode
}


const Loading = ({error,loading,children }:LoadingProps) => {
    console.log(children,"hhhhhhhhhhhhhhhhhh");
    
    if(loading === "pending"){
         return <p>loading please wait</p>
    }
    if(loading === "failed"){
        return<p>{error}</p>
    }
  return (
    <>
      {children}
    </>
  )
}

export default Loading
