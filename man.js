const express = require('express');
const port = 5001;
const app = express();
const {readJson, writeJson} = require('fs-extra');
const dataLocation = './data.json';
const path = require('path');
const { qnStore, categoriesNames } = require('./categories');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let correctAnswer ="";
let index = 0;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Game routes
app.get('/', (req, res) => {
    res.render('index');
});

// Render category selection page
app.get('/categories', (req, res) => {
    if (index !=1) {
        res.render('category', { categoriesNames: categoriesNames });
    } else {
        index = 0;
        res.redirect('/scoreboard');
    }
    res.render('category', { categoriesNames: categoriesNames });
});

// Handle POST request from category page and redirect to quiz
app.post('/select-category', (req, res) => {
    const selectedCategory = req.body.category;
    
    // Get the questions for the selected category
    const selectedQuestions = qnStore.get(selectedCategory);
 

 if (selectedQuestions) {
        // Pass the first question of the category to the quiz page
        // res.json(selectedQuestions);
        correctAnswer = selectedQuestions[index].answer;
        res.render('quiz', {
          question: selectedQuestions[index].question,
          choices: selectedQuestions[0].choices
        });
    } else {
        res.status(400).send('Invalid category selected');
    }
});

// Handle POST request from quiz page and redirect to next quiz / scoreboard / category selection page
app.post('/submit-answer', (req, res) => {
    const answer = req.body.answer;

    // If selected answer is correct return select category
    if (answer === correctAnswer) {
        res.render('category', { categoriesNames: categoriesNames });
    } else {
        res.redirect('/scoreboard')
    }
});

// Get 
app.get('/scoreboard', (req, res) => {

    async function readJsonData() {
        try {
            const users = await readJson(dataLocation);
            res.render('scoreboard', {scores : users});
        } catch (error) {
            console.log(error);
        }
    }
    readJsonData();
    
});

//*****user fns
app.get('/users', (req, res) => {

    async function readJsonData() {
        try {
            const users = await readJson(dataLocation);
            res.send(users);
        } catch (error) {
            console.log(error);
        }
    }
    readJsonData();

})

app.get('/users/:id', (req, res) => {
    const playerId = req.params.id;

    async function readJsonData() {
        try {
            const allPlayerData = await readJson(dataLocation);

            // select specific player
            const selection = allPlayerData.filter(({id}) => id === playerId);

            if (selection.length <= 0) {
                res.send(`Player : ${playerId} not in db`)
            }

            res.send(selection); 

            } catch (error) {
            console.log(error);
        }
    }
    readJsonData();
})

app.get('/data/reset', (req, res) => {
    const users = [
        {
            "username": "GamerAlice",
            "password": "G05zEZb=",
            "level": 2,
            "highScore": 1191
        },
        {
            "username": "ProBob",
            "password": "rHzmmwRC",
            "level": 37,
            "highScore": 1398
        },
        {
            "username": "EliteCharlie",
            "password": "5\"QS?J#B",
            "level": 25,
            "highScore": 544
        },
        {
            "username": "MasterDavid",
            "password": "A4U!ohQd",
            "level": 17,
            "highScore": 1488
        },
        {
            "username": "ChampionEve",
            "password": "t\"[*.3qm",
            "level": 29,
            "highScore": 1098
        },
        {
            "username": "WarriorFrank",
            "password": "D@J,dD_R",
            "level": 14,
            "highScore": 788
        },
        {
            "username": "LegendGrace",
            "password": "@]TeIKZW",
            "level": 48,
            "highScore": 717
        },
        {
            "username": "HeroHannah",
            "password": ",Zao4Zm=",
            "level": 29,
            "highScore": 1013
        },
        {
            "username": "KnightIvy",
            "password": ")[du{iE4",
            "level": 37,
            "highScore": 757
        },
        {
            "username": "KingJack",
            "password": "(VZppkU;",
            "level": 20,
            "highScore": 691
        }
      ];
      const newUsers = users.map( (user) => ({...user, id: `${Math.floor(Math.random() * 1000)}` }) );
      
      async function writeJsonData() {
        try {
          await writeJson(dataLocation, newUsers);
          res.redirect('/')
        } catch (error) {
          console.log(error);
        }
      }
      
      writeJsonData();
})

//   Body expects a user object with 5 properties : "username","password","level", "highScore","id" 

app.post('/login', (req, res) => {

    if (req.body.username && req.body.password) {
        async function writeJsonData() {
            // create new user
            let newUser = {
                id: `${Math.floor(Math.random() * 1000)+100}`,
                username: req.body.username,
                password: req.body.password,
                level: 0,
                highScore: 0,
            }

            try {
                let oldData = await readJson(dataLocation);
                // oldData.push(newUser);
                await writeJson(dataLocation, [...oldData, newUser])
                //   console.log(`User : ${request.body.user.name} added to player base`);

                res.render('category', { categoriesNames: categoriesNames });
            } catch (error) {
                console.log(error);
            }
        }

        writeJsonData();
        
    } else {
        res.status(400);
        throw new Error("Please add all required fields");
    }


})

//   update scores
app.put('/users/:id', (req, res) => {
    const playerId = req.params.id;

    async function updateData(){
        try {
           const allPlayerData = await readJson(dataLocation);
           
        // select specific player
           const selection = allPlayerData.filter(({id}) => id === playerId);

           const iterator = selection.values();
           
           let player;

           for (const value of iterator) {
             player = value;
           }
        
        // Remove element to be updated
           const elementRemovedArr = allPlayerData.filter(({id}) => id !== playerId);

        // Update scores
           ++player.highScore;

        // Write back data
        await writeJson(dataLocation, [...elementRemovedArr, player])

        res.send(`Player : ${player.username} updated score to ${player.highScore}`);
        } catch (error) {
            console.log(error);
        }
    };

    updateData();
    // res.send(`Got a PUT request at /${req.params.id}`)
})

// Delete player
app.delete('/users/:id', (req, res) => {
    // Get the player ID 
    const playerId = req.params.id;

    async function deleteData(){
        try {
           const allPlayerData = await readJson(dataLocation);
           
        // Remove specific player
           const playerRemovedArr = allPlayerData.filter(({id}) => id !== playerId);

        // Write back data
        await writeJson(dataLocation, [...playerRemovedArr])

        res.send(`Player : ${playerId} removed.`);
        } catch (error) {
            console.log(error);
        }
    };

    deleteData();
})

app.listen(port, () => console.log(`Server listening on port ${port}`));