import "./EarthAndMoon.css"

export default function EarthAndMoon() {
    return <div className="earth-moon">
        <div className="earth">
            <img className="earthImg"
                 src="https://raw.githubusercontent.com/alanmiste/SpaceGeeksCorner/main/frontend/src/materials/earth.png"
                 alt="Earth"/>
        </div>
        <div className="moon-container">
            <div className="moon">
                <img className="moonImg"
                     src="https://raw.githubusercontent.com/alanmiste/SpaceGeeksCorner/main/frontend/src/materials/moon.png"
                     alt="Moon"/>
            </div>
        </div>
    </div>;
}
