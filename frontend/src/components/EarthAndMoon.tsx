import "./EarthAndMoon.css"

export default function EarthAndMoon() {
    return <article className="earth-moon">
        <div className="earth">
            <img className="earthImg" src="https://raw.githubusercontent.com/alanmiste/plants/master/earth.png"/>
        </div>
        <div className="moon-container">
            <div className="moon">
                <img className="moonImg" src="https://raw.githubusercontent.com/alanmiste/plants/master/moon.png"/>
            </div>
        </div>
    </article>;
}
