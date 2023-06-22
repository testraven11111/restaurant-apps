import sourceData from '../data/source';
import CONFIG from '../data/config';

const Home = {
    async render() {
        return `
        <section class="content">
            <div class="latest">
                <h1>Discover Restaurants</h1>
                <div class="restaurant-list" id="restaurantList"></div>
            </div>
        </section>
        `;
    },

    async afterRender() {
        const restaurantData = await sourceData.listResto();
        let restaurantList = '';

        restaurantData.restaurants.forEach((restaurant) => {
            restaurantList += `
            <div class="restaurant-item">
                <!-- Lazy Loading Image -->
                <img class="restaurant-item__thumbnail" loading="lazy" src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" alt="${restaurant.name}" title="${restaurant.name}">
                <div class="restaurant-item__city">${restaurant.city}</div>
                <div class="restaurant-item__content">
                    <p class="restaurant-item__rating">
                        Rating: 
                        <a href="#" class="restaurant-item__rating-value">${restaurant.rating}</a>
                    </p>
                    <h1 class="restaurant-item__title"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h1>
                    <div class="restaurant-item__description">${this.truncateDescription(restaurant.description)}</div>
                </div>
            </div>
            `;
        });

        document.querySelector('#restaurantList').innerHTML = restaurantList;
    },

    truncateDescription(description) {
        const maxLength = 150;
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    },
};

export default Home;
