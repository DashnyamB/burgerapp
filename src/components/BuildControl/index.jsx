import React from "react"

import Style from "./style.module.css"

const BuildControl = (props) => (
    <div className={Style.BuildControl}>
        <div className={Style.Label}>{props.orts}</div>
       <button disabled={props.disabled[props.type]} onClick={()=> props.ortsHasah(props.type)} className={Style.Less}>Хасах</button>
        <button onClick={()=> props.ortsNemeh(props.type)} className={Style.More}>Нэмэх</button>
    </div>

)



export default BuildControl;