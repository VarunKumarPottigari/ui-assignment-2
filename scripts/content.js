// setting up tabs with data and listener
"use strict";

(function () {
    let myTabs = document.querySelectorAll(".content-tab");
    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("current-tab");
        }
        let clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("current-tab");
        tabClickEvent.preventDefault();
        let myContentPanes = document.querySelectorAll(".tab-pane");
        for (let i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("active");
        }
        let activePaneId = this.children[0].getAttribute("href");
        let activePane = document.getElementById(activePaneId);
        activePane.classList.add("active");
    }
    for (let i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks, true);
    }
})();