$('.send-btn').on('click', getInputAndCreate);
$('#input-txt').on('keypress', function (e) {
  if (e.key == 'Enter') {
    getInputAndCreate();
  }
});

function getInputAndCreate () {
  let userText = $('#input-txt').val();
  if (userText !== '') createUserMsg('Busayo', createTime(), userText, 'right');
  $('#input-txt').val('');
}

function generateRandomMsg() {
  $.get('https://cw-quotes.herokuapp.com/api/quotes/random', (data) => {
    createUserMsg(
      data.result.author,
      createTime(),
      data.result.text,
      'left'
    );
  });
}

// function generateRandomColor () {
//   const colors = [
//     '#cb997e',
//     '#ddbea9',
//     '#ffe8d6',
//     '#b7b7a4',
//     '#a5a58d',
//     '#ababab',
//     '#ffcb69',
//     '#d9ae94',
//     '#edd892',
//     '#d9e0a3',
//     '#dce0d9',
//     '#9dc183',
//     '#ffcb69',
//     '#fad8ab',
//     '#f2efbb',
//     '#bde0fe',
//     '#ffc8dd',
//     '#cbc0d3',
//     '#d0d1ff',
//     '#d4e09b',
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// }

let i = 0;
while (i < 1) {
  var randNo = Math.floor(Math.random() * (25000 - 5000 + 1) + 5000);
  setInterval(generateRandomMsg, randNo);
  i++;
}

const createTime = () => {
  const timeNow = new Date(Date.now());
  const hour = timeNow.getHours();
  let minute = timeNow.getMinutes();
  if (minute < 10) minute = '0' + minute;
  const time = `${hour}:${minute}`;
  return time;
};

function createUserMsg (author, time, message, side) {
  $('.chat-messages-box').append(`
    <div class="chat-message ${side}">
      <div class="chat-message-top">
        <div class="chat-message-message">
          ${message}
        </div>
      </div>
      <div class="chat-message-bottom">
        <div class="chat-message-author">${author}</div>
        <div class="chat-message-time">${time}</div>
      </div>
    </div>
  `);
  scrollDown();
}

// scroll to bottom of the page
const scrollDown = () => {
  $('.chat-messages-box').animate({ scrollTop: $('.chat-messages-box').prop('scrollHeight') }, 1000);
};

class Message {
  constructor (authorId, content, timeStamp) {
    this.authorId = authorId;
    this.content = content;
    this.timeStamp = timeStamp;
  }
}
