$('.send_btn').on('click', getInputAndCreate);
$('#input_txt').on('keypress', function (e) {
  if (e.key == 'Enter') {
    getInputAndCreate();
  }
});

function getInputAndCreate() {
  let userText = $('#input_txt').val();
  if (userText !== '') createUserMsg('Silky', createTime(), userText, 'right');
  $('#input_txt').val('');
}

function generateRandomMsg() {
  $.get('https://cw-quotes.herokuapp.com/api/quotes/random', (data) => {
    createUserMsg(
      data.result.author,
      createTime(),
      data.result.text,
      'left',
      generateRandomColor()
    );
  });
}

function generateRandomColor () {
  const colors = [
    '#cb997e',
    '#ddbea9',
    '#ffe8d6',
    '#b7b7a4',
    '#a5a58d',
    '#ababab',
    '#ffcb69',
    '#d9ae94',
    '#edd892',
    '#d9e0a3',
    '#dce0d9',
    '#9dc183',
    '#ffcb69',
    '#fad8ab',
    '#f2efbb',
    '#bde0fe',
    '#ffc8dd',
    '#cbc0d3',
    '#d0d1ff',
    '#d4e09b',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

let i = 0;
while (i < 3) {
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

function createUserMsg(author, time, message, side, color = '#adc178') {
  $('.chat_messages_box').append(`
    <div class="chat_message ${side}" style="background-color: ${color}">
      <div class="chat_message_top">
        <div class="chat_message_message">
          ${message}
        </div>
      </div>
      <div class="chat_message_bottom">
        <div class="chat_message_author">${author}</div>
        <div class="chat_message_time">${time}</div>
      </div>
    </div>
  `);
  scrollDown();
}

// scroll to bottom of the page
const scrollDown = () => {
  $('.chat_messages_box').animate(
    { scrollTop: $('.chat_messages_box').prop('scrollHeight') },
    1000
  );
};

class Message {
  constructor(authorId, content, timeStamp) {
    this.authorId = authorId;
    this.content = content;
    this.timeStamp = timeStamp;
  }
}
