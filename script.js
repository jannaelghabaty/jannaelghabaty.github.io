document.addEventListener('DOMContentLoaded', function () {
    //--------------NAVBAR-----------------//
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();  // Prevent default link behavior

            // Remove 'active' class from all links
            navItems.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the clicked link
            item.classList.add('active');

            // Smooth scroll to the target section
            const targetId = item.getAttribute('href').substring(1); // Remove '#' from href
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });

        // Remove active effects on hover
        item.addEventListener('mouseover', function () {
            navItems.forEach(link => link.classList.remove('active'));
        });

        // Re-apply active class after hover ends if clicked
        item.addEventListener('mouseout', function () {
            const activeItem = document.querySelector('nav ul li a.active');
            if (activeItem) {
                activeItem.classList.add('active');
            }
        });
    });
    //---------Home Section----------------//
    const homeSection = document.querySelector('#home .content');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                homeSection.classList.add('animate-text');
            } else {
                homeSection.classList.remove('animate-text');
            }
        });
    }, {
        threshold: 0.5 // Triggers when 50% of the home section is visible
    });
    observer.observe(homeSection);
    //--------About Section---------------//
    const aboutText = document.querySelectorAll('.about-text');
    const observera = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-about-text');
            }
            else {
                entry.target.classList.remove('animate-about-text');
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the text/code is visible
    });
    aboutText.forEach(text => observera.observe(text));

    //---------- Experience Section ----------//
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerb = new IntersectionObserver(entries => {
        let visibleItems = 0;
        let firstVisible = null;
        let lastVisible = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                visibleItems++;
                // Track first and last visible items to adjust line height
                if (!firstVisible) firstVisible = entry.target;
                lastVisible = entry.target;
            } else {
                entry.target.classList.remove('visible');
                visibleItems--;
            }
        });

        // Dynamically adjust the line height between the first and last visible items
        if (firstVisible && lastVisible) {
            const firstPosition = firstVisible.getBoundingClientRect().top;
            const lastPosition = lastVisible.getBoundingClientRect().bottom;
            const lineHeight = lastPosition - firstPosition;

            timeline.style.setProperty('--timeline-height', `${lineHeight}px`);
        } else {
            timeline.style.setProperty('--timeline-height', `0px`);
        }
    }, {
        threshold: 0.5 // Trigger when 50% of the item is visible
    });

    timelineItems.forEach(item => observerb.observe(item));

    const firstTimelineItem = timelineItems[0]; // First timeline item
    const lastTimelineItem = timelineItems[timelineItems.length - 1]; // Last timeline item

    // Intersection observer for the first item
    const observerc = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start adjusting the line height when the first item is in view
                window.addEventListener('scroll', adjustLineHeight);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the item is visible
    });

    // Observe the first timeline item
    observerc.observe(firstTimelineItem);

    // Adjust the line height dynamically as the user scrolls
    function adjustLineHeight() {
        const scrollTop = window.scrollY;
        const timelineTop = timeline.getBoundingClientRect().top + window.scrollY;
        const timelineBottom = lastTimelineItem.getBoundingClientRect().bottom + window.scrollY; // Bottom of last item
        const windowHeight = window.innerHeight;
        const scrollBottom = scrollTop + windowHeight;

        // Calculate the height of the line based on scrolling
        let visibleHeight = Math.max(scrollBottom - timelineTop, 0);

        // Limit the line's height to stop at the bottom of the last experience item
        if (scrollBottom > timelineBottom) {
            visibleHeight = timelineBottom - timelineTop;
        }

        // Set the dynamic height of the line
        timeline.style.setProperty('--timeline-height', `${visibleHeight}px`);

        // Ensure the line still adjusts when scrolling back up from the projects section
        if (scrollTop > timelineBottom || scrollTop < timelineTop - windowHeight) {
            // Keep the listener active, but set the height to its max or zero when out of range
            if (scrollTop < timelineTop - windowHeight) {
                timeline.style.setProperty('--timeline-height', '0px');
            }
        }
    }

    //---------- Projects Section ----------//
    const projectCards = document.querySelectorAll('.project-card');
    const observerd = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add visible class when in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the project card is visible
    });

    projectCards.forEach(card => {
        observerd.observe(card); // Observe each project card
    });

    //---------- Contact me Section ----------//
    const contactIcons = document.querySelectorAll('.contact-icon');
    const observere = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactIcons.forEach(icon => icon.classList.add('visible')); // Add the 'visible' class when the section is visible
            }
        });
    });
    observere.observe(document.querySelector('.contact-icons'));

});


