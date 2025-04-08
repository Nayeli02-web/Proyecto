$(document).ready(function () {
    $('.faq-question').on('click', function () {
      const answer = $(this).next('.faq-answer');
      $('.faq-answer').not(answer).slideUp();
      answer.slideToggle();
    });
  });
  