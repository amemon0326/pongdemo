const slides = document.querySelectorAll('div.slides');
slides.forEach((slide) => {
	const images = slide.querySelectorAll('img');

	let current = 0;
	let z = 1000000;

	// This is setting the z index of the images at a higher value so we can start counting down
	images.forEach((image) => {
		z--;
		console.log(image.style.zIndex);
		image.style.zIndex = z;
		console.log(image.style.zIndex);
	});

	gsap.set(images, { opacity: 0 });

	imagesLoaded(images, () => {
		const timeline = gsap.timeline();

		timeline
			.set(images, {
				x: () => {
					return 500 * Math.random() - 250
				},
				y: "500%",
				rotation: () => {
					return 90 * Math.random() - 45
				},
				opacity: 1
			})
			.to(images, { x: 0, y: 0, stagger: -0.25, duration: .5 })
			.to(images, {
				rotation: () => {
					return 16 * Math.random() - 8
				}
			})
	})





	// This is out click function, which subtracts a z-indx (pushes image down), and adds value to image current to push it down
	slide.addEventListener('click', function () {
		z--;

		let direction = "150%";
		let midAngle = 15;

		if (Math.random() > 0.5) {
			direction = "-150%"
			midAngle = "-15"
		};

		const currentImage = images[current]

		const flipTimeline = gsap.timeline();
		flipTimeline
			.set(currentImage, { x: 0 })
			.to(currentImage, {
				x: direction,
				rotation: midAngle
			})
			.set(currentImage, { zIndex: z })
			.to(currentImage, {
				x: 0,
				rotation: () => {
					return 15 * Math.random() - 8
				}
			})

		current = current + 1;
		current = current % images.length;
	});
});
