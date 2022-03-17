$('.send_btn').on('click', function () {
  let userText = $('#input_txt').val();
  if (userText !== '') createUserMsg('Silky', createTime(), userText, 'right');
  $('#input_txt').val('');
});

function generateRandomMsg () {
  $.get('https://cw-quotes.herokuapp.com/api/quotes/random', (data) => {
    createUserMsg (data.result.author, createTime(), data.result.text, 'left');
  });
}

let i = 0;
while (i < 5) {
  var randNo = Math.floor(Math.random() * (25000 - 5000 + 1) + 5000);
  setInterval(generateRandomMsg, randNo);
  i++;
}

const createTime = () => {
  const timeNow = new Date(Date.now());
  const hour = timeNow.getHours();
  const minute = timeNow.getMinutes();
  const time = `${hour}:${minute}`;
  return time;
};

function createUserMsg (author, time, message, side) {
  $('.chat_messages_box').append(`
    <div class="chat_message ${side}">
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
