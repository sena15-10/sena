import Rails from '@rails/ujs';
import Turbolinks from "turbolinks";
import "emoji-picker-element"; 
Rails.start();
Turbolinks.start();
import 'channels';


document.addEventListener('turbolinks:load', () => {
  const emojiPickers = document.querySelectorAll('emoji-picker');
  console.log("Number of emoji pickers found:", emojiPickers.length);
  emojiPickers.forEach((picker) => {
    picker.addEventListener('emoji-click', event => {
      const messageId = picker.dataset.messageId;
      const emoji = event.detail.unicode;
      console.log(`Message ID: ${messageId}, Emoji: ${emoji}`);
      fetch(`/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Rails.csrfToken()
        },
        body: JSON.stringify({ reaction: { emoji: emoji } })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          updateReactionDisplay(messageId, data.reaction);
        }else {console.log('Fetch error:');}
      });
    });
  });
});

function updateReactionDisplay(messageId, reaction) {
  const reactionContainer = document.querySelector(`#message-${messageId} .reactions`);
  const reactionElement = document.createElement('span');
  reactionElement.textContent = reaction.emoji;
  reactionElement.dataset.reactionId = reaction.id;
  reactionContainer.appendChild(reactionElement);
  console.log("青fおあｈふぉいｊ")
}
