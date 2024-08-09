const buttons = document.querySelectorAll('[data-button-id]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('clickEfect')
    button.addEventListener('animationend', () =>{
        button.classList.remove('clickEfect')
    });
  });
});