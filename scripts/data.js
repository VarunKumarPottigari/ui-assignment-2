// load json data from file for tabs
"use strict";

(function () {

    loadJSON(function (response) {
        const actual_JSON = JSON.parse(response);
        buildHTML(actual_JSON);
    });

    function loadJSON(callback) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', './../data/fitness.json', true);
        xhr.onload = function () {
            if (xhr.status == "200") {
                callback(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    function buildHTML(jsonData) {
        // send data and ids
        buildTabs(jsonData.fitness, 'tab-data-1');
        buildTabs(jsonData.running, 'tab-data-2');
        buildTabs(jsonData.dance, 'tab-data-3');
        buildTabs(jsonData.pilates, 'tab-data-4');
    }

    function buildTabs(fitnessData, elementId) {

        // the element to which data is to be attached (tab)
        const tabPane = document.getElementById(elementId);

        // for the number of cards
        for (let i = 0; i < fitnessData.length; i++) {
            const fitness = fitnessData[i];

            // card element
            const card = document.createElement('div');
            card.classList.add('card');

            const trainerImageContainer = addImageOfTrainer(fitness);
            const cardInfoDetails = getCardInfoDetails(fitness);
            const cardSubInfo = getCardSubInfo(fitness);
            const cardRating = getCardRating(fitness, elementId, i);
            const cardUsers = getCardUsers(fitness);
            const cardschedulers = getScheduleButton(elementId, i);

            // add all the elements to card
            card.appendChild(trainerImageContainer);
            card.appendChild(cardInfoDetails);
            card.appendChild(cardSubInfo);
            card.appendChild(cardRating);
            card.appendChild(cardUsers);
            card.appendChild(cardschedulers);
            tabPane.appendChild(card);

            checkStarRating(fitness, elementId, i);
        }
    }

    function checkStarRating(fitness, elementId, i) {
        const rating = 6 - Math.ceil(fitness.rating);
        let star = document.getElementById(`star${rating}-${elementId}-${i}`);
        if (star) {
            star.checked = true;
        }
    }


    function addImageOfTrainer(fitness) {
        // add image of trainer

        const trainerImageContainer = document.createElement('div');
        trainerImageContainer.classList.add('card-trainer-image-container');
        trainerImageContainer.innerHTML = `<img class="card-trainer-image" src="${fitness.trainerImage}"/>`;
        return trainerImageContainer;

        // the same node can be created in the below way

        // const trainerImageElement = document.createElement('img');
        // trainerImageElement.classList.add('card-trainer-image');
        // trainerImageElement.setAttribute('src', fitness.trainerImage);
        // trainerImageContainer.appendChild(trainerImageElement);
        // return trainerImageContainer;
    }

    function getCardInfoDetails(fitness) {

        // add details of the fitness program

        const cardInfoDetails = document.createElement('div');
        cardInfoDetails.classList.add('card-info-details');
        let fitnessInfo = '';
        if (fitness.info.length > 250) {
            fitnessInfo = fitness.info.substring(0, 250) + "...";
        } else {
            fitnessInfo = fitness.info;
        }

        cardInfoDetails.innerHTML = `<h3 class="card-info-header">
                                    ${fitness.program}
                                    </h3>
                                    <span class="card-info-by">by </span>
                                    <span class="card-info-trainer">
                                    ${fitness.trainer}
                                    </span>
                                    <p class="card-info-para">
                                    ${fitnessInfo}
                                    </p>`;
        return cardInfoDetails;

        // the same node can be created in the below way

        // const cardInfoDetails = document.createElement('div');
        // const cardInfoHeader = document.createElement('div');
        // const cardInfoBy = document.createElement('span');
        // const cardInfoTrainer = document.createElement('span');
        // const cardInfoPara = document.createElement('div');
        // cardInfoDetails.classList.add('card-info-details');
        // cardInfoHeader.classList.add('card-info-header');
        // cardInfoBy.classList.add('card-info-by');
        // cardInfoTrainer.classList.add('card-info-trainer');
        // cardInfoPara.classList.add('card-info-para');
        // cardInfoHeader.innerText = fitness.program;
        // cardInfoBy.innerText = 'by ';
        // cardInfoTrainer.innerText = fitness.trainer;
        // if (fitness.info.length > 250) {
        //     cardInfoPara.innerText = fitness.info.substring(0, 250) + "...";
        // } else {
        //     cardInfoPara.innerText = fitness.info;
        // }
        // cardInfoDetails.appendChild(cardInfoHeader);
        // cardInfoDetails.appendChild(cardInfoBy);
        // cardInfoDetails.appendChild(cardInfoTrainer);
        // cardInfoDetails.appendChild(cardInfoPara);
        // return cardInfoDetails;
    }

    function getCardSubInfo(fitness) {

        // add details of club, partners and members

        const cardSubInfo = document.createElement('div');
        cardSubInfo.classList.add('card-info')
        cardSubInfo.innerHTML = `<div class="card-info-row">
                                    <span class="card-sub">club: </span>
                                    <span class="card-sub-info">${fitness.club}</span>
                                </div>
                                <div class="card-info-row">
                                    <span class="card-sub">partners: </span>
                                    <span class="card-sub-info">${fitness.partners}</span>
                                </div>
                                <div class="card-info-row">
                                    <span class="card-sub">members: </span>
                                    <span class="card-sub-info">${fitness.members}/${fitness.totalMembers}</span>
                                </div>`;
        return cardSubInfo;

        // the same node can be created in the below way

        // let cardInfoClub = document.createElement('div');
        // cardInfoClub.classList.add('card-info-row');
        // let cardInfoClubSub = document.createElement('span');
        // cardInfoClubSub.classList.add('card-sub');
        // cardInfoClubSub.innerText = 'club: ';
        // let cardInfoSubInfo = document.createElement('span');
        // cardInfoSubInfo.classList.add('card-sub-info');
        // cardInfoSubInfo.innerText = fitness.club;
        // cardInfoClub.appendChild(cardInfoClubSub);
        // cardInfoClub.appendChild(cardInfoSubInfo);

        // // partners
        // let cardInfoPartners = document.createElement('div');
        // cardInfoPartners.classList.add('card-info-row');
        // let cardInfoPartnerSub = document.createElement('span');
        // cardInfoPartnerSub.classList.add('card-sub');
        // cardInfoPartnerSub.innerText = 'partners: ';
        // let cardInfoPartnerInfo = document.createElement('span');
        // cardInfoPartnerInfo.classList.add('card-sub-info');
        // cardInfoPartnerInfo.innerText = fitness.partners;
        // cardInfoPartners.appendChild(cardInfoPartnerSub);
        // cardInfoPartners.appendChild(cardInfoPartnerInfo);

        // members
        // let cardInfoMembers = document.createElement('div');
        // cardInfoMembers.classList.add('card-info-row');
        // let cardInfoMembersSub = document.createElement('span');
        // cardInfoMembersSub.classList.add('card-sub');
        // cardInfoMembersSub.innerText = 'members: ';
        // let cardInfoMemberInfo = document.createElement('span');
        // cardInfoMemberInfo.classList.add('card-sub-info');
        // cardInfoMemberInfo.innerText = `${fitness.members}/${fitness.totalMembers}`;
        // cardInfoMembers.appendChild(cardInfoMembersSub);
        // cardInfoMembers.appendChild(cardInfoMemberInfo);
        // // append club, partners and members parent
        // cardSubInfo.appendChild(cardInfoClub);
        // cardSubInfo.appendChild(cardInfoPartners);
        // cardSubInfo.appendChild(cardInfoMembers);
        // <div class="stars-inner" style="width: ${fitness.rating * 20}%">
        // </div>
    }

    function getCardRating(fitness, elementId, i) {

        // rating stars
        const cardRating = document.createElement('div');
        cardRating.classList.add('card-info-rating');
        cardRating.innerHTML = `<div class="stars" >
                                        <div class="stars-outer" id="stars-${elementId}-${i}">
                                           <input type="radio" name="star-${elementId}-${i}" id="star1-${elementId}-${i}"><label for="star1-${elementId}-${i}"></label>
                                           <input type="radio" name="star-${elementId}-${i}" id="star2-${elementId}-${i}"><label for="star2-${elementId}-${i}"></label>
                                           <input type="radio" name="star-${elementId}-${i}" id="star3-${elementId}-${i}"><label for="star3-${elementId}-${i}"></label>
                                           <input type="radio" name="star-${elementId}-${i}" id="star4-${elementId}-${i}"><label for="star4-${elementId}-${i}"></label>
                                           <input type="radio" name="star-${elementId}-${i}" id="star5-${elementId}-${i}"><label for="star5-${elementId}-${i}"></label>
                                        </div>
                                </div>
                                <div class="card-reviews">
                                    (${fitness.reviews}) Reviews
                                </div>`;
        return cardRating;
    }

    function getCardUsers(fitness) {
        // members circles
        let cardUsers = document.createElement('div');
        cardUsers.classList.add('card-info-users');

        let cardusersInnerHTML = '';
        for (let j = 0; j < fitness.members && j < 4; j++) {
            cardusersInnerHTML += `<div class="outer-circle circle-${j}">
                                        <div class="inner-circle inner-circle-${j}">
                                        </div>
                                    </div>`;

            // the same node can be created in the below way

            // let outerCircle = document.createElement('div');
            // outerCircle.classList.add('outer-circle');
            // outerCircle.classList.add(`circle-${j}`);
            // let innerCircle = document.createElement('div');
            // innerCircle.classList.add('inner-circle', `inner-circle-${j}`);
            // outerCircle.appendChild(innerCircle);
            // cardUsers.appendChild(outerCircle);
        }

        // if count exceeds four, display the count - 4 in the last circle
        if (fitness.members > 4) {
            cardusersInnerHTML += `<div class="outer-circle circle-4">
                                        <div class="inner-circle inner-circle-4">
                                            <span class="inner-circle-4-text">
                                                +${fitness.members - 4}
                                            </span>
                                        </div>
                                    </div>`;

            // the same node can be created in the below way

            // let outerCircle = document.createElement('div');
            // outerCircle.classList.add('outer-circle', `circle-4`);
            // let innerCircle = document.createElement('div');
            // innerCircle.classList.add('inner-circle', 'inner-circle-4');
            // let innerCircleText = document.createElement('span');
            // innerCircleText.innerText = `+${fitness.members - 4}`;
            // innerCircleText.classList.add('inner-circle-4-text');
            // innerCircle.appendChild(innerCircleText);
            // outerCircle.appendChild(innerCircle);
            // cardUsers.appendChild(outerCircle);
        }

        cardUsers.innerHTML = cardusersInnerHTML;
        return cardUsers;
    }

    function getScheduleButton(elementId, i) {

        // schedule button
        const cardSchedulers = document.createElement('div');
        cardSchedulers.classList.add('card-info-scheduler');
        let scheduleButton = document.createElement('button');
        scheduleButton.classList.add('button-primary');
        scheduleButton.classList.add('button-schedule');
        scheduleButton.innerText = 'schedule';
        cardSchedulers.appendChild(scheduleButton);
        scheduleButton.setAttribute('id', elementId + i + "schedule");
        scheduleButton.addEventListener('click', schedule);
        return cardSchedulers;
    }


    // event listener for schedule button click
    function schedule(event) {
        // local constants
        const scheduleText = 'schedule';
        const scheduledText = 'scheduled';

        const targetElementId = event.target.id;
        const targetElement = document.getElementById(targetElementId);
        const parentElement = targetElement.parentElement;
        const newElement = targetElement.cloneNode(true);
        newElement.classList.toggle('button-schedule-active');
        if (targetElement.innerHTML === scheduleText) {
            newElement.innerText = scheduledText;
        } else {
            newElement.innerText = scheduleText;
        }
        newElement.addEventListener('click', schedule);
        parentElement.removeChild(targetElement);
        parentElement.appendChild(newElement);
    }
})()