function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute top-60 right-1/2 transform translate-y-1/2 -translate-x-1/2 mb-5 bg-gray-300 p-2 rounded-md cursor-pointer shadow z-10 hover:bg-gray-400"
            onClick={onClick}
            style={{ width: '25px', height: '8px' }}
        >
        </div>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute top-64 left-1/2 transform -translate-y-1/2 translate-x-1/2 mb-5 bg-gray-300 p-2 rounded-md cursor-pointer shadow z-10 hover:bg-gray-400"
            onClick={onClick}
            style={{ width: '25px', height: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
        </div>
    );
}


function MainPrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute top-[365px] right-1/2 transform translate-y-1/2 -translate-x-1/2 mb-5 bg-gray-300 p-2 rounded-md cursor-pointer shadow z-10 hover:bg-gray-400"
            onClick={onClick}
            style={{ width: '25px', height: '8px' }}
        >
        </div>
    );
}

function MainNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute top-[380px] left-1/2 transform -translate-y-1/2 translate-x-1/2 mb-5 bg-gray-300 p-2 rounded-md cursor-pointer shadow z-10 hover:bg-gray-400"
            onClick={onClick}
            style={{ width: '25px', height: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
        </div>
    );
}

export { NextArrow, PrevArrow, MainPrevArrow, MainNextArrow };
