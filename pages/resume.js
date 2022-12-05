import React from "react";
import Resume from '../src/components/Resume.js'

const ResumePage = props => {
    const { data } = props



    return <Resume data={data} />
}

export default ResumePage