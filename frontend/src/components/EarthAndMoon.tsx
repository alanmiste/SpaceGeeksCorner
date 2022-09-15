import "./EarthAndMoon.css"

export default function EarthAndMoon() {
    return <div className="earth-moon">
        <div className="earth">
            <img className="earthImg" src="https://raw.githubusercontent.com/alanmiste/plants/master/earth.png"
                 alt="Earth"/>
        </div>
        <div className="moon-container">
            <div className="moon">
                <img className="moonImg" src="https://raw.githubusercontent.com/alanmiste/plants/master/moon.png"
                     alt="Moon"/>
            </div>
        </div>
    </div>;
}
