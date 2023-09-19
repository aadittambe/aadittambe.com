import React, { useState } from "react";
import Image from 'next/image'
import { useInView } from 'react-intersection-observer';


const Story = props => {
    const { storyType, url, tools, img, org, alt, project } = props

    const { ref, inView, entry } = useInView({
        threshold: 0,
        rootMargin: '50% 0% -10% 0%'
    });

    return (<div className={`story ${storyType} ${inView ? 'reveal' : 'no-reveal'}`} ref={ref}>
        <a href={url} rel="noreferrer" target="_blank">
            <p className="story-tools">🧰 {tools}</p>
            <Image
                src={img.startsWith("https") ? img : `/images/${img}?.jpeg`}
                alt={alt}
                className="story-img"
                width={200}
                height={200}
            />
            <p className="story-org">📍<span className="ital"> {org}</span></p>
            <p>🔗 <span className="story-name">{project}</span></p>

        </a>
    </div>)
}

const Projects = props => {
    const { data } = props
    const stories = data.stories

    const categories = [{ topic: "Dev", class: "development", emoji: "🖥️" }, { topic: "Graphics", class: "graphics", emoji: "📊" }, { topic: "Data-driven", class: "data", emoji: "📈" }, { topic: "Docs", class: "docs", emoji: "📖" }, { topic: "Written", class: "reporting", emoji: "✍️" }]

    const [clicked, setClicked] = useState("all")
    return (
        <main className="experience">
            <div className="intro">
                <h1>🖥 Projects</h1>
                <p>I specialize in telling data-driven stories visually, and my work helps people understand the news and make sense of the policies that impact them.</p>
                <p>This page includes projects I have worked on for <a href="https://www.washingtonpost.com/">The Washington Post</a>, <a href="https://merrill.umd.edu/howard-center-for-investigative-journalism">the Howard Center for Investigative Journalism</a>, <a href="https://cnsmaryland.org/">Capital News Service</a>, <a href="https://www.nbcnews.com/datagraphics">NBC News</a>, <a href="https://dailyiowan.com/">The Daily Iowan</a>, as well as personal practice projects. My work demonstrates my commitment to figuring out programming concepts I may not know.</p>
            </div>
            <fieldset className="btn-row">
                <legend>
                    <p> 👀 Looking for a particular type of project? </p>
                </legend>
                <p className="filters">
                    <label className={`btn reset`}>
                        <input type="radio" name="" value="" id="all" onClick={e => { setClicked("all") }} />
                        <span style={{ backgroundColor: clicked === "all" ? "#F6C90E" : '#F7F7F7' }}>🌎<br></br>All</span>
                    </label>
                    {categories.map((cat, ind) =>
                    (<label className={`btn ${cat.class}`} key={ind}>
                        <input type="radio" name="" value="" id={cat.class} onClick={e => { setClicked(cat.class) }} />
                        <span style={{ backgroundColor: cat.class === clicked ? "#F6C90E" : '#F7F7F7' }}>{cat.emoji}<br></br>{cat.topic}</span>
                    </label>))}
                </p>
            </fieldset>
            <div className="layout">
                {stories
                    .filter(d => d.show !== "false")
                    .filter(d => (clicked === "all" ? d : d.storyType.includes(clicked))).map((d, ind) => {
                        return (<Story key={ind} storyType={d.storyType} url={d.url} tools={d.tools} img={d.img} org={d.org} alt={d.alt} project={d.project} />)

                    }
                    )}
            </div>
            <div className="source ital"><p>I am a supporter of open-source code — the source code for this website is available on <a href="https://github.com/aadittambe/aadittambe.com">GitHub</a>.</p></div>
        </main >
    )
}

export default Projects