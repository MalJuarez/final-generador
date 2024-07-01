import PropTypes from "prop-types";

function Dots({ activeIndex, onClick, Slider }) {
    return <div className="all-dots">
        {Slider.map((slide, index) => (
            <span key={index} className= {`${activeIndex === index ? "dot active-dot" : "dot"}`}
            onClick={() => onClick(index)}
            ></span>
    ))}
    </div>;
}

Dots.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    Slider: PropTypes.array.isRequired,
};

export default Dots;