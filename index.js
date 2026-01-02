fetch('data.json')
    .then(response => {
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        createCards(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

    function createCards(cardData) {
    const container = document.getElementById('reportCards');

    cardData.forEach(cardInfo => {

        const fullCard = document.createElement('div');
        fullCard.classList.add('reportDataCardContainer')
        const card = document.createElement('div');
        card.classList.add('reportCard', cardInfo.title.replace(/\s+/g, '-'));
        const img = document.createElement('img');
        img.src = './images/icon-' + cardInfo.title.toLowerCase().replace(/\s+/g, '-') + '.svg';
        img.alt = cardInfo.title.toLowerCase().replace(/\s+/g, '-') + '-icon'
        const reportDataCard = document.createElement('div');
        reportDataCard.classList.add('reportData');
        const reportDataCardContainer = document.createElement('div');
        reportDataCard.appendChild(reportDataCardContainer);
        const elypsesImg = document.createElement('img');
        elypsesImg.src = './images/icon-ellipsis.svg';
        elypsesImg.alt = 'elypsesImg'
        const title = document.createElement('p');
        title.textContent = cardInfo.title;

        const reportDataCardContainerHours = document.createElement('div');
        
        var actualData = document.createElement('h1');
        actualData.classList.add('currentData');
        actualData.textContent = cardInfo.timeframes.daily.current + 'hrs';
        var passedData = document.createElement('p');
        passedData.classList.add('previousData');
        passedData.classList.add('previous');
        passedData.textContent = 'Last Day - ' + cardInfo.timeframes.daily.previous + 'hrs'

        reportDataCardContainerHours.appendChild(actualData);
        reportDataCardContainerHours.appendChild(passedData);
        reportDataCard.appendChild(reportDataCardContainerHours);
        reportDataCardContainer.appendChild(title);
        reportDataCardContainer.appendChild(elypsesImg);
        card.appendChild(img);
        fullCard.appendChild(card);
        fullCard.appendChild(reportDataCard);
        container.appendChild(fullCard)

        const dailyBtn = document.getElementById('daily');
        const weeklyBtn = document.getElementById('weekly');
        const monthlyBtn = document.getElementById('monthly');
        dailyBtn.classList.add('active');

        weeklyBtn.addEventListener('click', function() {
            weeklyBtn.classList.add('active');
            dailyBtn.classList.remove('active');
            monthlyBtn.classList.remove('active');
            
            const actualData = document.querySelectorAll('.currentData');
            for (let i = 0; i < actualData.length; i++){
                actualData[i].textContent = cardData[i].timeframes.weekly.current + 'hrs';
            }
            
            const passedData = document.querySelectorAll('.previousData');
            for (let i = 0; i < passedData.length; i++){
                passedData[i].textContent = 'Last Week - ' + cardData[i].timeframes.weekly.previous + 'hrs';
            }
            
        });

        monthlyBtn.addEventListener('click', function() {
            monthlyBtn.classList.add('active');
            weeklyBtn.classList.remove('active');
            dailyBtn.classList.remove('active');

            const actualData = document.querySelectorAll('.currentData');
            for (let i = 0; i < actualData.length; i++){
                actualData[i].textContent = cardData[i].timeframes.monthly.current + 'hrs';
            }
            
            const passedData = document.querySelectorAll('.previousData');
            for (let i = 0; i < passedData.length; i++){
                passedData[i].textContent = 'Last Month - ' + cardData[i].timeframes.monthly.previous + 'hrs';
            }
        });
        
        dailyBtn.addEventListener('click', function() {
            dailyBtn.classList.add('active');
            monthlyBtn.classList.remove('active');
            weeklyBtn.classList.remove('active');

            const actualData = document.querySelectorAll('.currentData');
            for (let i = 0; i < actualData.length; i++){
                actualData[i].textContent = cardData[i].timeframes.daily.current + 'hrs';
            }
            
            const passedData = document.querySelectorAll('.previousData');
            for (let i = 0; i < passedData.length; i++){
                passedData[i].textContent = 'Last Day - ' + cardData[i].timeframes.daily.previous + 'hrs';
            }
        }); 
    });   
}