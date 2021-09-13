//creates the profile sidebar functionality
let profileSidebar = document.getElementById('profile-sidebar');

function openProfileSideBar() {
    if(profileSidebar.hidden === true) {
        profileSidebar.hidden = false;
    } 
    else profileSidebar.hidden = true;
}

let categoryRow = document.getElementById('category-list');
let seeAllButton = document.getElementById('see-all-button');
let allCategoriesVisible = true;

function seeAllCategories () {
    if(allCategoriesVisible == true) {
        seeAllButton.style.color = '#FC575E'
        allCategoriesVisible = false;
        categoryRow.style.flexWrap = 'wrap';
    } else {
        seeAllButton.style.color = '#888080'
        allCategoriesVisible = true;
        categoryRow.style.flexWrap = 'nowrap';
    }
}