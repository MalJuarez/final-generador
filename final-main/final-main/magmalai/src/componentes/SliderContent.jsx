import PropTypes from "prop-types";

function SliderContent({ activeIndex, Slider }) {
    return (
        <section>
            {Slider.map((slide, index) => (
                <div 
                key={index} 
                className={index === activeIndex ? "slides active" : "inactive"}> 
                <img className="slide-image" src={slide.urls} alt=""/>
                <h2 className="slide-title">{slide.title}</h2>
                <h3 className="slide-text">{slide.description}</h3>
                </div>
            ))}
        </section>
    );
}

SliderContent.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    Slider: PropTypes.arrayOf(PropTypes.shape({
        urls: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
};

export default SliderContent;