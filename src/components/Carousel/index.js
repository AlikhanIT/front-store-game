import { Carousel } from 'react-carousel-minimal';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchSlider} from "../../redux/slices/sliderSlice";

function MyCarousel() {
    const {data} = useSelector(state => state.sliderReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSlider());
    }, [])

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }

    return (
        <div className="App" style={{overflow: "hidden"}}>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    margin: "0 20px"
                }}>
                    <Carousel
                        data={data || []}
                        time={4000}
                        width="100%"
                        height="300px"
                        captionStyle={captionStyle}
                        radius="10px"
                        captionPosition="bottom"
                        automatic={true}
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        style={{
                            textAlign: "center",
                            maxWidth: "1300",
                            maxHeight: "300px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyCarousel;
