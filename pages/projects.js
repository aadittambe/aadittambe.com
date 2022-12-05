import React from "react"
import Projects from '../src/components/Projects'


const ProjectsPage = props => {
    const { data } = props
    return <Projects data={data} />
}

export default ProjectsPage