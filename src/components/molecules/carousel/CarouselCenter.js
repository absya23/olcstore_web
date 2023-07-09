import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React from "react";
import Slider from "react-slick";
import { ProductItemImage } from "../productItem/ProductItem";
import "./CarouselCenter.scss";
import "@splidejs/react-splide/css";

const data = [
	{
		id: "C01",
		image: "https://pos.nvncdn.net/cba2a3-7534/bn/20230622_YtVIb1ZM.jpeg",
		name: "Biển xanh",
	},
	{
		id: "C02",
		image: "https://pos.nvncdn.net/cba2a3-7534/bn/20230504_cIMFqB14.jpeg",
		name: "Astronaut",
	},
	{
		id: "C03",
		image: "https://pos.nvncdn.net/cba2a3-7534/bn/20230615_fNFa1Lex.jpeg",
		name: "Team Tulip",
	},
	{
		id: "C04",
		image: "https://pos.nvncdn.net/cba2a3-7534/bn/20230518_kTrbG1nN.jpeg",
		name: "Ly cốc",
	},
	{
		id: "C05",
		image: "https://pos.nvncdn.net/cba2a3-7534/bn/20230511_nRsdnNQF.jpeg",
		name: "Gấu bông",
	},
	{
		id: "C06",
		image: "https://pos.nvncdn.net/cba2a3-7534/bn/20230504_vlcteEsC.jpeg",
		name: "Sổ vở",
	},
	{
		id: "C07",
		image:
			"https://pos.nvncdn.net/cba2a3-7534/bn/20220701_E2xo01jXjOG65tVpOA8nRE3Z.png",
		name: "Cinnamoroll đáng iu",
	},
];

const CarouselCenter = () => {
	return (
		<div className="w-full product-slide h-[300px]">
			<Splide
				hasTrack={false}
				options={{
					// fixedWidth: "30%",
					// fixedHeight: "160px",
					type: "loop",
					perPage: 3,
					focus: "center",
					omitEnd: true,
					gap: "10px",
					autoScroll: {
						speed: 2,
					},
					classes: {},
				}}
			>
				<SplideTrack>
					{data.length > 0 &&
						data.map((item, index) => (
							<SplideSlide key={index}>
								<ProductItemImage
									name={item?.name}
									image={item?.image}
								></ProductItemImage>
							</SplideSlide>
						))}
				</SplideTrack>
				<div className="splide__arrows">
					<button className="splide__arrow splide__arrow--prev">
						<i className="fa-solid fa-chevron-left"></i>
					</button>
					<button className="splide__arrow splide__arrow--next">
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</Splide>
		</div>
	);
};

export default CarouselCenter;
