document.addEventListener("DOMContentLoaded",function(){


        const searchButton = document.getElementById("search-btn");
        const usernameInput = document.getElementById("user-name");
        const statsContainer = document.querySelector('.stats-container');
        
        const easyProgressCircle = document.querySelector('.easy-progress');
        const mediumProgressCircle = document.querySelector('.medium-progress');
        const hardProgressCircle = document.querySelector('.hard-progress');
        
        const easyLabel = document.getElementById('easy-lable');
        const mediumLabel = document.getElementById('medium-lable');
        const hardLabel = document.getElementById('hard-lable');

        const cardStatsContainer = document.querySelector(".stats-cards");


        function validateUsername(username)
        {
            if(username.trim()===""){
                alert("Username should not be empty!");
                return false;
            }

            const regex = /^[a-zA-Z0-9_-]{1,15}$/;
            const isMatching = regex.test(username);

            if(!isMatching)
            {
                alert("Invalid username!");
            }
            return isMatching;
        }




        function updateProgress(solved,total,lable,circle){
            const progress = (solved/total)*100;

            circle.style.setProperty('--progress-degree',`${progress}%`);
            lable.textContent = `${solved}/${total}`;
        }

       function displayUserData(data)
        {
            const totalQues = data.totalQuestions;
            const totaleasy = data.totalEasy;
            const totalmed = data.totalMedium;
            const totalhard = data.totalHard;

            const solvedTotalQues = data.totalSolved;
            const solvedEasy = data.easySolved;
            const solvedMed = data.mediumSolved;
            const solvedHard = data.hardSolved;

             // Printing all the values
             console.log('Total Questions:', totalQues);
             console.log('Total Easy Questions:', totaleasy);
             console.log('Total Medium Questions:', totalmed);
             console.log('Total Hard Questions:', totalhard);
 
             console.log('Total Solved Questions:', solvedTotalQues);
             console.log('Solved Easy Questions:', solvedEasy);
             console.log('Solved Medium Questions:', solvedMed);
             console.log('Solved Hard Questions:', solvedHard);
 


            updateProgress(solvedEasy,totaleasy,easyLabel,easyProgressCircle);
            updateProgress(solvedMed,totalmed,mediumLabel,mediumProgressCircle);
            updateProgress(solvedHard,totalhard,hardLabel,hardProgressCircle);



            // acceptanceRate
            // contributionPoints
            // ranking
            // reputation


            const cardsData = [
                {lable:"acceptanceRate",value:data.acceptanceRate},
                {lable:"contributionPoints",value:data.contributionPoints},
                {lable:"ranking",value:data.ranking},
                {lable:"reputation",value:data.reputation},
            ];


            console.log(cardsData);

            // stats-cards.innerHTML = cardsData.map(
            cardsData.forEach(card =>{
                const cardDiv = document.createElement('div');
                cardDiv.className = "card";
                cardDiv.innerHTML = `
                <h3>${card.lable}</h3>
                <p> ${card.value}</p>`;

                cardStatsContainer.appendChild(cardDiv);
            });
           
        }

        async function fetchuserDetails(username){
            const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
            statsContainer.style.display = 'none';
            try{
                searchButton.textContent = "Searching...";
                searchButton.disabled = true; 


                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Unable to fatch the user details");
                }
                const data =await response.json();

                if(data.status === "success")
                {
                    console.log("Data:\n",data);
                    if (window.getComputedStyle(statsContainer).display === 'none') {
                        // Update styles
                        statsContainer.style.display = 'flex';
                        statsContainer.style.flexDirection = 'column';
                        
                      }
                    displayUserData(data);
                }
                else{
                    if (window.getComputedStyle(statsContainer).display === 'none') {
                        // Update styles
                        statsContainer.style.display = 'flex';
                        statsContainer.style.flexDirection = 'column';
                        
                      }
                    statsContainer.innerHTML = "<p> No data found </p>";
                }

                
            }
            catch(error){
                if (window.getComputedStyle(statsContainer).display === 'none') {
                    // Update styles
                    statsContainer.style.display = 'flex';
                    statsContainer.style.flexDirection = 'column';
                    
                  }
                statsContainer.innerHTML =`<p> ${error.massage}</p>`;
            }
            finally{
                searchButton.textContent = "Search";
                searchButton.disabled = false; 
            }
        }


        

        searchButton.addEventListener('click',()=>{
            const username = usernameInput.value;
            console.log(username);

            if(validateUsername(username)){
                fetchuserDetails(username);
            }
        })





}); 