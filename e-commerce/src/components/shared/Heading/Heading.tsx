import { memo } from "react"

const Heading = memo(({title}:{title:string}) => {
  return (
    <h3 className="mb-3" style={{fontSize:"26px"}}>
      {title}
    </h3>
  )
})

export default Heading
