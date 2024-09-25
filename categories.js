const categories = [
  {
    name: "Geography",
    questions: [
      {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
      },
      {
        question: "Which is the largest continent?",
        choices: ["Africa", "Asia", "Europe", "South America"],
        answer: "Asia"
      }
    ]
  },
  {
    name: "History",
    questions: [
      {
        question: "Who was the first President of the United States?",
        choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        answer: "George Washington"
      },
      {
        question: "In which year did World War II end?",
        choices: ["1945", "1939", "1918", "1965"],
        answer: "1945"
      }
    ]
  },
  {
    name: "Science",
    questions: [
      {
        question: "What is the chemical symbol for water?",
        choices: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
      }
    ]
  },
  {
    name: "Literature",
    questions: [
      {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Charles Dickens", "J.K. Rowling", "Mark Twain"],
        answer: "William Shakespeare"
      },
      {
        question: "Which novel begins with the line: 'Call me Ishmael'?",
        choices: ["Moby Dick", "The Great Gatsby", "1984", "To Kill a Mockingbird"],
        answer: "Moby Dick"
      }
    ]
  },
  {
    name: "Sports",
    questions: [
      {
        question: "Which sport is known as 'The Beautiful Game'?",
        choices: ["Basketball", "Soccer", "Tennis", "Cricket"],
        answer: "Soccer"
      },
      {
        question: "How many players are there on a basketball team?",
        choices: ["5", "6", "7", "11"],
        answer: "5"
      }
    ]
  },
  {
    name: "Movies",
    questions: [
      {
        question: "Which movie features the quote: 'I'll be back'?",
        choices: ["Terminator", "Die Hard", "Rocky", "Rambo"],
        answer: "Terminator"
      },
      {
        question: "Who directed the movie 'Inception'?",
        choices: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "James Cameron"],
        answer: "Christopher Nolan"
      }
    ]
  },
  {
    name: "Music",
    questions: [
      {
        question: "Which band released the album 'Abbey Road'?",
        choices: ["The Beatles", "The Rolling Stones", "Pink Floyd", "Led Zeppelin"],
        answer: "The Beatles"
      },
      {
        question: "Who is known as the 'King of Pop'?",
        choices: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
        answer: "Michael Jackson"
      }
    ]
  },
  {
    name: "Technology",
    questions: [
      {
        question: "What does 'CPU' stand for?",
        choices: [
          "Central Processing Unit",
          "Control Processing Unit",
          "Computer Personal Unit",
          "Central Programming Unit"
        ],
        answer: "Central Processing Unit"
      },
      {
        question: "Which company created the iPhone?",
        choices: ["Google", "Apple", "Microsoft", "Samsung"],
        answer: "Apple"
      }
    ]
  },
  {
    name: "Mathematics",
    questions: [
      {
        question: "What is the value of Pi (π) rounded to two decimal places?",
        choices: ["3.12", "3.14", "3.16", "3.18"],
        answer: "3.14"
      },
      {
        question: "What is the square root of 64?",
        choices: ["6", "7", "8", "9"],
        answer: "8"
      }
    ]
  },
  {
    name: "Art",
    questions: [
      {
        question: "Who painted the 'Mona Lisa'?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
      },
      {
        question: "Which art movement was Salvador Dalí associated with?",
        choices: ["Surrealism", "Impressionism", "Cubism", "Realism"],
        answer: "Surrealism"
      }
    ]
  }
];

const qnStore =  new Map();

categories.map( ({name, questions}) => {
    qnStore.set(name, questions)
});

const categoriesNames = categories.map(({name}) => (name));

module.exports = { qnStore, categoriesNames };