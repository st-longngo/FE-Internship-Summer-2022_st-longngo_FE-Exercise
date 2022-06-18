const btns = document.querySelectorAll(".dropdown-btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
      for(let btn of btns){
        if(btn.classList.contains('active') && this !== btn){
            btn.classList.remove('active')
        }
      }
      this.classList.toggle("active");
  };
}
