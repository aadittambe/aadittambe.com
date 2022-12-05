import TypeIt from "typeit-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons'


const Home = props => {
    const { data } = props

    const intro = data.intro



    return <>
        <h1><span className='wave'>👋🏽</span> Hi, I am Aadit!</h1>
        <p><span style={{ display: "none" }}>👨🏽‍💻</span>I tell stories — but with<span className='mob-jump'><br /></span> <span className="typeit">
            <TypeIt
                options={{
                    loop: true,
                    speed: 200,
                    waitUntilVisible: true,
                    lifeLike: true,
                }}
                getBeforeInit={(instance) => {
                    instance
                        .pause(1500)
                        .type("code. 🖥")
                        .pause(2000)
                        .delete(7)
                        .type("graphics. 📊")
                        .pause(2500)
                        .delete(11)
                        .type("design. 🎨")
                        .pause(2700)
                        .delete(9)
                        .type("data. 📈")
                        .pause(2100);

                    return instance;
                }}
            /></span></p>

        {intro.map((text, index) => (
            index === 1 ? <p key={index}>{text}.</p> :
                <p key={index}>{text}</p>
        ))}
        <div></div>
    </>
}

export default Home