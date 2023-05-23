import React, { useState } from "react";
import slide1 from "../../../assets/slider/slide1.jpg";
import slide2 from "../../../assets/slider/slide2.jpg";
import slide3 from "../../../assets/slider/slide3.png";
import banner1 from "../../../assets/slider/banner1.jpg";
import banner2 from "../../../assets/slider/banner2.jpg";
import { Carousel } from "react-carousel-minimal";
import { useEffect } from "react";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";

// data phải có chứa trường image
const dataSlide = [
	{ id_slide: 1, image: slide1 },
	{ id_slide: 2, image: slide2 },
	{ id_slide: 3, image: slide3 },
];

const SliderGroup = () => {
	const [slides, setSlides] = useState(dataSlide);
	useEffect(() => {
		axios
			.get(`${ApiConfig}slide`)
			.then((res) => {
				// console.log(res.data);
				setSlides(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<section className="mb-20 slider-group">
			<div className="grid grid-cols-4 gap-x-[10px] h-[400px]">
				<Carousel
					data={slides}
					time={2000}
					captionPosition="bottom"
					automatic={true}
					dots={true}
					pauseIconColor="white"
					pauseIconSize="40px"
					slideBackgroundColor="darkgrey"
					slideImageFit="cover"
				/>
				<div className="flex flex-col max-h-[392px]">
					<img src={banner1} alt="" className="mb-2 max-h-[50%]" />
					<img src={banner2} alt="" className="h-1/2 max-h-[50%]" />
				</div>
			</div>
		</section>
	);
};

export default SliderGroup;
