import { Path ,FieldValues, UseFormRegister} from "react-hook-form"
import Form from 'react-bootstrap/Form';

type TInputType<TFieldValue extends FieldValues>={
    name:Path<TFieldValue>;
    label:string;
    type?:string;
    error?:string;
    register:UseFormRegister<TFieldValue>;
    onBlur?:(e:React.FocusEvent<HTMLInputElement>)=>void;
    formText?:string;
    success?:string;
    disabled?:boolean
}


const Input =<TFieldValue extends FieldValues>({type="text",register,error,label,name,onBlur,formText,success,disabled}:TInputType<TFieldValue>) => {
  const onblurHandler=(e:React.FocusEvent<HTMLInputElement>)=>{
    if(onBlur){
      onBlur(e)
      register(name).onBlur(e)
    }else{
      register(name).onBlur(e)
    }
  }
  return (
    <Form.Group className="mb-3" >
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} {...register(name)} isInvalid={error?true:false} onBlur={onblurHandler} disabled={disabled}/>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
        {formText&& <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  )
}

export default Input
